# Gülay Dinçer Hukuk Bürosu

Bağımlılıksız, statik bir hukuk bürosu tanıtım sitesi. Yayın klasörü `site/` dizinidir.

## Yayından önce

`site/index.html` içindeki `SITE_CONFIG` alanında telefon, baro ve sicil numarası için yer tutucular bulunur. Yayına almadan önce `+90 5XX...` ve `XXXX` değerlerini gerçek bilgilerle değiştirin. Alan adı farklı olacaksa canonical, Open Graph ve JSON-LD adreslerini de güncelleyin.

İletişim formu sunucuya veri göndermez; doğrulanan bilgileri ziyaretçinin e-posta uygulamasında taslak olarak açar. Sunucu tarafı form istenirse ayrı bir servis veya Cloudflare Pages Function eklenmelidir.

## Yerel kontrol

```bash
npm run check
```

Yerel önizleme için `site/` dizinini herhangi bir statik dosya sunucusuyla açın. Örneğin:

```bash
npx wrangler pages dev site
```

## Cloudflare Pages

Cloudflare panelinde GitHub deposunu bağlayıp şu ayarları kullanın:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `site`
- Root directory: `/`

Alternatif olarak GitHub Actions içindeki **Cloudflare Pages dağıtımı** iş akışını elle çalıştırabilirsiniz. Bunun için depoya `CLOUDFLARE_API_TOKEN` (Pages Edit yetkili) ve `CLOUDFLARE_ACCOUNT_ID` secret değerlerini ekleyin. Proje adı farklıysa iş akışındaki ve `package.json` içindeki `gulay-dincer` değerini değiştirin.

Özel alan adı bağlandıktan sonra Cloudflare panelinde SSL/TLS modunu `Full (strict)` olarak kullanın ve yönlendirme tercihlerini panelden yapılandırın.
