import { useState, useEffect } from 'react';
import { categories } from '../../data/categories';
import { getProductsBySubcategory } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('male-naradie');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Get current category data
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Get filtered products
  const allProducts = getProductsBySubcategory(activeCategory, activeSubcategory);

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 when category or subcategory changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubcategory]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory('all');
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setActiveSubcategory(subcategoryId);
  };

  return (
    <section id="katalog" className="py-12 md:py-16">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Vyberte si z našej{' '}
            <span className="text-orange-primary">širokej ponuky</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
            Profesionálna technika pre každý typ projektu - od malého náradia po ťažkú mechanizáciu
          </p>
        </div>

        {/* Main Catalog Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold text-base uppercase tracking-wide mb-5 px-2">
                Kategórie
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl font-bold text-base transition-all ${
                      activeCategory === category.id
                        ? 'bg-orange-primary text-white shadow-lg'
                        : 'bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      {category.badge && activeCategory !== category.id && (
                        <span className="text-[10px] px-2 py-1 bg-orange-primary/20 text-orange-primary rounded font-semibold">
                          {category.badge}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Category Description */}
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-2">
                {currentCategory?.name}
              </h3>
              <p className="text-white/70 text-sm">
                {currentCategory?.description}
              </p>
            </div>

            {/* Subcategory Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {currentCategory?.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={`px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
                      activeSubcategory === subcategory.id
                        ? 'bg-orange-primary text-white shadow-lg'
                        : 'bg-zinc-900 border border-white/10 text-white/70 hover:bg-zinc-800 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        currentPage === 1
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800'
                      }`}
                    >
                      Predošlá
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-bold text-sm transition ${
                            currentPage === page
                              ? 'bg-orange-primary text-white'
                              : 'bg-zinc-900 border border-white/10 text-white/70 hover:bg-zinc-800 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        currentPage === totalPages
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800'
                      }`}
                    >
                      Ďalšia
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Žiadne produkty
                </h3>
                <p className="text-white/70">
                  V tejto kategórii momentálne nie sú dostupné žiadne produkty.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
