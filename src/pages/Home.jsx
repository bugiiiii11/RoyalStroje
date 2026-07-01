import { Helmet } from 'react-helmet-async';
import HeroSplit from '../components/home/HeroSplit';
import PromoCarousel from '../components/home/PromoCarousel';
import Catalog from '../components/home/Catalog';
// --- OLD HERO (revert: uncomment 2 imports below + the block in JSX, remove <HeroSplit />) ---
// import Hero from '../components/home/Hero';
// import MobileHero from '../components/home/MobileHero';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Royal Stroje - Požičovňa náradia a stavebnej techniky Senec</title>
        <meta
          name="description"
          content="Profesionálna požičovňa stavebného náradia v Senci. Prenájom vŕtačiek, rýpadiel, plošín s dovozom do 24h. 20 rokov skúseností. ☎ 0948 555 551"
        />
        <meta
          name="keywords"
          content="požičovňa náradia, prenájom techniky, stavebné stroje, Senec, Bratislava, minirýpadlo, vibračná doska, vŕtačka"
        />
        <link rel="canonical" href="https://royalstroje.sk/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Royal Stroje - Požičovňa náradia Senec" />
        <meta property="og:description" content="Profesionálna požičovňa stavebného náradia. 20 rokov skúseností. Dovoz do 24h." />
        <meta property="og:image" content="https://royalstroje.sk/hero-main1.webp" />
        <meta property="og:url" content="https://royalstroje.sk/" />
        <meta property="og:locale" content="sk_SK" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://royalstroje.sk/#organization",
            "name": "Royal Stroje",
            "alternateName": "Royal stroje, s.r.o.",
            "description": "Profesionálna požičovňa stavebného náradia a techniky v Senci s 20-ročnými skúsenosťami",
            "url": "https://royalstroje.sk",
            "logo": "https://royalstroje.sk/logoroyal.webp",
            "image": "https://royalstroje.sk/hero-main1.webp",
            "telephone": "+421948555551",
            "email": "info@royalstroje.sk",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Recká cesta 182",
              "addressLocality": "Senec",
              "postalCode": "925 26",
              "addressCountry": "SK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "48.2187",
              "longitude": "17.3994"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "16:00"
            },
            "priceRange": "€€",
            "areaServed": ["Senec", "Bratislava", "Galanta", "Trnava", "Pezinok", "Šamorín"]
          })}
        </script>
      </Helmet>

      {/* NEW split hero (prenájom | predaj) — desktop diagonal split, mobile stacked */}
      <HeroSplit />

      {/* --- OLD HERO — kept for revert (re-enable the 2 imports above) ---
      <div className="hidden md:block">
        <Hero />
      </div>
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />
      <MobileHero />
      */}

      {/* Aktuálne akcie — carousel (prvá sekcia pod hero) */}
      <PromoCarousel />

      <Catalog />
    </>
  );
}
