import Hero from '../components/home/Hero';
import Catalog from '../components/home/Catalog';

export default function Home() {
  return (
    <>
      {/* Hero - Desktop only */}
      <div className="hidden md:block">
        <Hero />
      </div>
      <Catalog />
    </>
  );
}
