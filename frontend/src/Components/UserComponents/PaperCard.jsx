import React from 'react';

const PaperCard = ({ paper = {} }) => {
    const p = {
        title: paper.title || 'Untitled paper',
        year: paper.year || '2024',
        authors: paper.authors || 'Unknown',
        abstract: paper.abstract || 'No summary available for this paper.',
        downloadLink: paper.downloadLink || '#',
        tags: paper.tags || [],
        badge: paper.badge || '',
    };

    return (
        <article className="w-full bg-background/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-150">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                       
                        <h3 className="text-lg font-semibold text-text truncate">{p.title.length > 30 ? p.title.substring(0, 30) + "..." : p.title}</h3>
                    </div>

                    <div className="mt-2 text-sm text-text/70">
                        <span className="mr-3">{p.authors}</span>
                        <span className="inline-block">• {p.year}</span>
                    </div>

                    <p className="mt-3 text-sm text-text/70 max-h-16 overflow-hidden">{p.abstract}</p>

                    {p.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((t, i) => (
                                <span key={i} className="text-xs bg-text/5 text-text px-2 py-1 rounded-md">{t}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex-none ml-2 flex flex-col items-end gap-2">
                    <a href={p.downloadLink} className="text-sm text-text/70 hover:underline">Download</a>
                    <button className="bg-text text-background px-3 py-1 rounded-md text-sm font-medium">View</button>
                </div>
            </div>
        </article>
    );
};

export default PaperCard;
