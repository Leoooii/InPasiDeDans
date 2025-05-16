export default function Head() {
  return (
    <>
      <title>Contul Meu | În Pași de Dans</title>
      <meta
        name="description"
        content="Vizualizează și gestionează informațiile contului tău."
      />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:title" content="Contul Meu | În Pași de Dans" />
      <meta
        property="og:description"
        content="Vizualizează și gestionează informațiile contului tău."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://inpasidedans.ro/cont" />
      <meta
        property="og:image"
        content="https://inpasidedans.ro/images/logo.png"
      />
      <meta property="og:image:alt" content="Logo În Pași de Dans" />

      {/* Social profiles (opțional aici, dar inclus pentru consistență) */}
      <meta
        property="og:see_also"
        content="https://www.instagram.com/inpasidedans/"
      />
      <meta
        property="og:see_also"
        content="https://www.tiktok.com/@in.pasi.de.dans"
      />
      <meta
        property="og:see_also"
        content="https://www.facebook.com/scoaladedansinpasidedans"
      />
    </>
  );
}
