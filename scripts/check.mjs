import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const htmlPath = resolve(root, 'site', 'index.html');
const html = readFileSync(htmlPath, 'utf8');
const errors = [];

for (const forbidden of ['�', 'file:///', 'index.html.html']) {
  if (html.includes(forbidden)) errors.push(`Yasaklı/bozuk içerik bulundu: ${forbidden}`);
}

for (const match of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
  const value = match[1];
  if (/^(?:#|https?:|mailto:|tel:|data:)/.test(value)) continue;
  const localPath = resolve(root, 'site', value.split(/[?#]/, 1)[0]);
  if (!existsSync(localPath)) errors.push(`Eksik yerel dosya: ${value}`);
}

for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
  try { JSON.parse(match[1]); } catch (error) { errors.push(`Geçersiz JSON-LD: ${error.message}`); }
}

const inlineScripts = [...html.matchAll(/<script(?![^>]*type=)[^>]*>([\s\S]*?)<\/script>/g)];
for (const [, source] of inlineScripts) {
  try { new Function(source); } catch (error) { errors.push(`Geçersiz JavaScript: ${error.message}`); }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Kontrol başarılı: HTML, yerel dosyalar, JSON-LD ve JavaScript doğrulandı.');
