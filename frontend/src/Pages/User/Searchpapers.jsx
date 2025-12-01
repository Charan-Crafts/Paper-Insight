import React, { useEffect, useState } from 'react';
import SearchComponent from '../../Components/UserComponents/SearchComponent';
import PaperCard from '../../Components/UserComponents/PaperCard';
import { useSelector } from 'react-redux';

const Searchpapers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [viewPaper, setViewPaper] = useState(false);

  const { papers = [], loading, totalResults, limit, page: storePage } = useSelector((state) => state.papers);

  // Keep local currentPage in sync with the page coming from the backend/store
  useEffect(() => {
    if (storePage) {
      setCurrentPage(storePage);
    }
  }, [storePage]);

  const totalPages =
    totalResults && limit
      ? Math.ceil(totalResults / limit)
      : 1;

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // SearchComponent will react to the new page via its props and trigger a new fetch
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-background/0'>

      {/* SEARCH BAR */}
      <SearchComponent
        page={currentPage}
        onResetPage={() => handlePageChange(1)}
      />

      <div className='max-w-7xl mx-auto px-4 py-6'>

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="space-x-3 flex text-black">
              <span className="loading loading-ring loading-sm"></span>
              <span className="loading loading-ring loading-md"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
          </div>
        )}

        {/* NO PAPERS */}
        {!loading && papers.length === 0 && (
          <div className='flex items-center justify-center min-h-[40vh]'>
            <h2 className='text-text/60 text-lg'>No papers found. Try adjusting your search criteria.</h2>
          </div>
        )}

        {/* PAPERS GRID */}
        {papers.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {papers.map((p, idx) => (
              <PaperCard key={idx} paper={p} setViewPaper={setViewPaper} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="join flex justify-center mt-9 gap-3">
            {/* Previous button */}
            <button
              className="join-item btn bg-white text-black border border-black/20 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Page number window (max 10) */}
            {(() => {
              const maxWindow = 10;
              let startPage = Math.max(1, currentPage - Math.floor(maxWindow / 2));
              let endPage = startPage + maxWindow - 1;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxWindow + 1);
              }

              const pages = [];
              for (let p = startPage; p <= endPage; p++) {
                const isActive = p === currentPage;
                pages.push(
                  <button
                    key={p}
                    className={`join-item btn ${isActive ? 'bg-black text-white' : 'bg-white text-black border border-black/20'}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                );
              }
              return pages;
            })()}

            {/* Next button */}
            <button
              className="join-item btn bg-white text-black border border-black/20 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Searchpapers;
