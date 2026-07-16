import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Crawler-correct 404 view: SPA hosting always returns HTTP 200, so the
// noindex meta is what keeps unknown URLs out of the Google index (no more
// soft-404 redirects to the homepage).
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAFAFA' }}>
      <Helmet>
        <title>Stránka nenájdená | Royal Stroje</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center py-24">
        <p className="text-orange-primary font-bold text-sm uppercase tracking-widest mb-4">Chyba 404</p>
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
          Stránka nenájdená
        </h1>
        <p className="text-zinc-700 mb-8 max-w-md mx-auto leading-relaxed">
          Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary px-6 py-3">
            Späť na úvod
          </Link>
          <a href="/#katalog" className="btn-outline-light px-6 py-3">
            Prezrieť katalóg
          </a>
        </div>
      </div>
    </div>
  );
}
