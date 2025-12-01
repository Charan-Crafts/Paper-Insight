import React, { useEffect, useState } from 'react';
import SearchComponent from '../../Components/UserComponents/SearchComponent';
import PaperCard from '../../Components/UserComponents/PaperCard';
import { useDispatch, useSelector } from 'react-redux';

const Searchpapers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalSlides = 10;

  const dispatch = useDispatch();

  const [viewPaper, setViewPaper] = useState(false);

  const { papers = [], loading } = useSelector((state) => state.papers);

  useEffect(() => {
    console.log("View paper:", viewPaper);
  }, [viewPaper])

  return (
    <div className='min-h-screen bg-background/0'>

      {/* SEARCH BAR */}
      <SearchComponent />

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
        <div className="join flex justify-center mt-9 gap-3">
          {[...Array(totalSlides).keys()].map((_, idx) => (
            <button key={idx} className="join-item btn bg-black text-white">
              {idx + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Searchpapers;
