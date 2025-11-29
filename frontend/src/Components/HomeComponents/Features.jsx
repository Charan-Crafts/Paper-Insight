import React from 'react';
import {Bot,FileSearchCorner,SearchCheck,MessageCircleMore} from "lucide-react"
const Features = () => {
    const features = [
        {
            title: 'AI-Powered Paper Discovery',
            description:
                "Instantly explore cutting-edge research from arXiv, IEEE, PubMed, and thousands of open-access repositories. PaperInsight intelligently finds the most relevant papers based on your domain, keywords, authors, or problem statement — delivering accurate, high-quality results in seconds.",
            icon:<Bot/>
        },
        {
            title: 'PDF Insight Extraction',
            description:
                "Upload any research paper and let PaperInsight decode it for you. It extracts the methodology, datasets, equations, key findings, limitations, and conclusions into a clean, structured format that’s effortless to understand.",
                icon:<FileSearchCorner />
        },
        {
            title: 'Find What’s Missing in the Research',
            description:
                "Detect unexplored angles, weaknesses, inconsistencies, and future opportunities. PaperInsight reveals research gaps that can become new project ideas, thesis topics, or innovative directions for your next publication.",
                icon:<SearchCheck />
        },
        {
            title: 'Chat With Your Papers',
            description:
                "Ask anything — from 'Explain the algorithm' to 'Why is this dataset used?' PaperInsight understands your PDF and responds with clear, contextual answers, simplifying complex terminology and breaking down equations.",
                icon:<MessageCircleMore />
        }
    ];


    return (
        <section id="features" className="py-12 px-4 sm:px-6 lg:px-12 mt-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-6xl sm:text-4xl font-inter font-semibold  text-text mb-6">Features</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <article key={idx} className="bg-background/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-black rounded-lg flex items-center justify-center">
                                    {/* simple icon */}
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold font-inter text-text">{feature.title}</h3>
                                    <p className="text-black font-ibm-plex-sans gap-2 text-sm mt-1 tracking-wider ">{feature.description}</p>
                                </div>
                            </div>

                           
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
