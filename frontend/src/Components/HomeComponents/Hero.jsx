import React from 'react';
import NavbarImage from "../../assets/Background Rem.png";
import HeroCard from './HeroCard';

const Hero = () => {
  const buttons = [
    'Get Started',
    'Learn More'
  ];

  return (
    <section className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 md:py-20" id="#">
      {/* Image / Card (restored to original style) */}
      <div className=" w-2/8 h-3/4 bg-black shadow-lg rounded-2xl overflow-hidden ring-2 ring-text/5">
        <HeroCard image={NavbarImage} />
      </div>

      {/* Content */}
      <div className="w-full md:w-7/12 lg:w-3/5 bg-transparent">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
          Your AI-Powered Research Companion
        </h1>

        <p className="text-base sm:text-lg text-text/80 mb-6 max-w-3xl">
          Discover research domains, explore the latest papers, analyze PDFs, and uncover new research opportunities — all in one intelligent platform. Transform the way you study, write, and explore academic insights with automated literature reviews, smart summaries, research-gap detection, and personalized topic recommendations.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
          <button className="bg-text text-background font-inter font-semibold text-base px-6 py-3 rounded-lg shadow hover:bg-text/90 transition-all duration-300">
            {buttons[0]}
          </button>

          <button className="border border-text/20 text-text font-inter font-semibold text-base px-6 py-3 rounded-lg hover:bg-text/5 transition-all duration-300">
            {buttons[1]}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
