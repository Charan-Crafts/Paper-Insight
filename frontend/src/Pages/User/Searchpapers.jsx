import React, { useState } from 'react';
import SearchComponent from '../../Components/UserComponents/SearchComponent';
import PaperCard from '../../Components/UserComponents/PaperCard';

const Searchpapers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 3000;
  const numberOfPapers = Math.ceil(totalResults / 10);
  const totalSlides = 10;

  const demoPapers = [
    { title: 'Deep Learning for Graphs', year: '2024', authors: 'A. Smith, B. Lee', abstract: 'An overview of graph neural networks and recent improvements.', tags: ['ML', 'Graphs'] },
    { title: 'CRISPR Applications in Medicine', year: '2023', authors: 'C. Patel', abstract: 'A review of CRISPR techniques and therapeutic potential.', tags: ['Biology', 'Medicine'], badge: 'Open Access' },
    { title: 'Quantum Error Correction', year: '2022', authors: 'D. Nguyen', abstract: 'Techniques for fault-tolerance in near-term quantum devices.', tags: ['Physics', 'Quantum'] },
    { title: 'Economic Impacts of AI', year: '2021', authors: 'E. Gomez', abstract: 'Study on labor markets and automation effects.', tags: ['Economics'] },
    { title: 'Advances in Battery Tech', year: '2024', authors: 'F. Wang', abstract: 'Materials and design improvements for energy density.', tags: ['Engineering', 'Energy'] },
  ];

  return (
    <div className='min-h-screen bg-background/0'>
      <div>
        <SearchComponent />
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {demoPapers.map((p, idx) => (
            <PaperCard key={idx} paper={p} />
          ))}
        </div>

        {/* Pagination  */}   
        <div className="join flex justify-center mt-9 gap-3">
          {
            [...Array(totalSlides).keys()].map((_, idx) => {
              return <button className="join-item btn bg-black">{idx + 1}</button>
            })
          }

        </div>

      </div>
    </div>
  );
}

export default Searchpapers;