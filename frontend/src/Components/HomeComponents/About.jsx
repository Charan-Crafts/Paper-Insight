import React from 'react';

const About = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-12" id="about">
            <div className="max-w-6xl mx-auto bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="font-inter font-bold text-3xl sm:text-4xl text-text mb-3">About PaperInsight AI</h2>
                    <p className="font-inter font-medium text-base sm:text-lg text-text/80 mb-4">Built for thinkers. Powered by intelligence.</p>

                    <p className="text-text mb-4 font-ibm-plex-sans">PaperInsight isn’t just another research tool — it’s your personal research partner. A platform designed to decode complexity, deliver clarity, and turn overwhelming academic work into an effortless, intuitive experience.</p>

                    <p className="text-text mb-6 font-ibm-plex-sans ">Whether you're diving into AI, engineering, healthcare, finance, or emerging research fields, PaperInsight brings you closer to knowledge with precision. It fetches the latest papers, analyzes dense PDFs, highlights key insights, detects research gaps, and sparks new ideas — all in seconds.</p>

                    <div className="flex gap-3">
                        <button className="bg-text text-background font-inter font-semibold px-5 py-3 rounded-lg shadow hover:bg-text/90 transition">Learn more</button>
                       
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="p-3 bg-text/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-inter font-semibold text-lg text-text">Smart Summaries</h4>
                            <p className="text-text/70 text-sm">Get concise, accurate summaries of any paper in seconds.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="p-3 bg-text/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-inter font-semibold text-lg text-text">PDF Deep-Scan</h4>
                            <p className="text-text/70 text-sm">Analyze PDFs, extract figures, methodology, and key results.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="p-3 bg-text/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-inter font-semibold text-lg text-text">Research Gap Detection</h4>
                            <p className="text-text/70 text-sm">Automatically spot areas where new work can make an impact.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
