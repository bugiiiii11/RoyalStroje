// Blog article metadata moved to blogMeta.js (plain ESM, single source of
// truth shared with Blog.jsx and the Node build scripts). Re-exported here
// for backwards compatibility.
export { blogMeta, blogPosts } from './blogMeta';

// Lazy loader - only loads article content when needed
export async function loadArticle(slug) {
  const modules = {
    'prenajom-vs-kupa-stavebnej-mechanizacie': () => import('./articles/prenajom-vs-kupa-stavebnej-mechanizacie.jsx'),
    'ako-vybrat-spravne-minirypadlo': () => import('./articles/ako-vybrat-spravne-minirypadlo.jsx'),
    'prenajom-stavebnej-mechanizacie-senec-bratislava': () => import('./articles/prenajom-stavebnej-mechanizacie-senec-bratislava.jsx'),
    'jarne-stavebne-projekty-mechanizacia': () => import('./articles/jarne-stavebne-projekty-mechanizacia.jsx'),
    'mobilne-sanitarne-kontajnery-sprievodca': () => import('./articles/mobilne-sanitarne-kontajnery-sprievodca.jsx'),
    'bezpecnostne-pravidla-stavebne-stroje': () => import('./articles/bezpecnostne-pravidla-stavebne-stroje.jsx'),
    'cennik-prenajmu-stavebnej-mechanizacie-2026': () => import('./articles/cennik-prenajmu-stavebnej-mechanizacie-2026.jsx'),
    'vibracne-dosky-hutnenie-sprievodca': () => import('./articles/vibracne-dosky-hutnenie-sprievodca.jsx'),
    'jesenne-terenne-upravy-priprava-na-zimu': () => import('./articles/jesenne-terenne-upravy-priprava-na-zimu.jsx'),
    'case-study-projekt-30-percent-rychlejsie': () => import('./articles/case-study-projekt-30-percent-rychlejsie.jsx'),
    'zimne-stavebne-projekty-vyzvy-riesenia': () => import('./articles/zimne-stavebne-projekty-vyzvy-riesenia.jsx'),
    'rocny-prehlad-2026-trendy-prenajom': () => import('./articles/rocny-prehlad-2026-trendy-prenajom.jsx'),
    'dewalt-dcg405p2-akumulatorova-bruska-profesionalny-nastroj': () => import('./articles/dewalt-dcg405p2-akumulatorova-bruska-profesionalny-nastroj.jsx'),
    'makita-tw001gm201-razovy-utahovak-extremny-vykon': () => import('./articles/makita-tw001gm201-razovy-utahovak-extremny-vykon.jsx'),
    'toughbuilt-tb-c700-pracovne-kozy-profesionalny-nastroj': () => import('./articles/toughbuilt-tb-c700-pracovne-kozy-profesionalny-nastroj.jsx'),
    'nivel-cl3g-krizovy-laser-zeleny-profesionalny-nastroj': () => import('./articles/nivel-cl3g-krizovy-laser-zeleny-profesionalny-nastroj.jsx'),
    'nivel-n32x-opticky-nivelacny-pristroj-profesionalny-nastroj': () => import('./articles/nivel-n32x-opticky-nivelacny-pristroj-profesionalny-nastroj.jsx'),
    'nivel-nl520r-rotacny-laser-cerveny-profesionalny-nastroj': () => import('./articles/nivel-nl520r-rotacny-laser-cerveny-profesionalny-nastroj.jsx'),
    'jcb-19c-i-mini-rypadlo-kompaktny-vykon': () => import('./articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx'),
  };

  if (!modules[slug]) return null;
  const mod = await modules[slug]();
  return mod.default;
}
