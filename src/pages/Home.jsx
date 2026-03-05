import Hero from '../components/home/Hero';
import Catalog from '../components/home/Catalog';

export default function Home() {
  return (
    <>
      {/* Hero - Desktop only */}
      <div className="hidden md:block">
        <Hero />
      </div>
      {/* Separator line between hero and content - Desktop only */}
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />
      <Catalog />
    </>
  );
}
