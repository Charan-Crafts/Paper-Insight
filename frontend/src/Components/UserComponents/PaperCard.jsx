import React, { useEffect } from 'react';
import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// {
//     "id": "http://arxiv.org/abs/cs/9301113v1",
//     "title": "Textbook examples of recursion",
//     "abstract": "  We discuss properties of recursive schemas related to McCarthy's ``91 function'' and to Takeuchi's triple recursion. Several theorems are proposed as interesting candidates for machine verification, and some intriguing open questions are raised.",
//     "published": "1991-08-01T00:00:00Z",
//     "authors": [
//         "Donald E. Knuth"
//     ],
//     "pdf_url": "https://arxiv.org/pdf/cs/9301113v1",
//     "category": "cs.CC"
// }

const PaperCard = ({ paper = {}, setViewPaper }) => {
    const navigate = useNavigate();
    const p = {
        title: paper.title,
        year: new Date(paper.published).getFullYear(),
        authors: paper.authors.slice(1, 10),
        abstract: paper.abstract,
        downloadLink: paper.pdf_url,
        tags: paper.category ? [paper.category] : [],

    };

    const handleViewPaper = (paperId) => {
        if (setViewPaper) {
            setViewPaper(true);
        }
        if (paperId) {
            const encodedId = encodeURIComponent(paperId);
            navigate(`/paperinsight/${encodedId}`);
        }
    };



    return (
        <article className="w-full bg-background/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-150" key={paper.id}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3">

                        <h3 className="text-lg font-semibold text-text truncate">{p.title.length > 30 ? p.title.substring(0, 30) + "..." : p.title}</h3>
                    </div>

                    <div className="mt-2 text-sm text-text/70">

                        <span className="mr-3">{p.authors}</span>
                        <span className="inline-block">• {p.year}</span>
                    </div>

                    <p className="mt-3 text-sm text-text/70 max-h-16 overflow-hidden">{p.abstract.substring(0, 100)}...</p>

                    {p.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((t, i) => (
                                <span key={i} className="text-xs bg-text/5 text-text px-2 py-1 rounded-md">{t}</span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex-none ml-2 flex flex-col items-end gap-2">
                    {/* <a
                        href={p.downloadLink}
                        download={p.title || "paper.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg hover:bg-primary/20 transition font-medium text-sm"
                    >
                        <Download size={18} />

                    </a> */}
                    <button
                        className="bg-text text-background px-3 py-1 rounded-md text-sm font-medium cursor-pointer"
                        onClick={() => handleViewPaper(paper.id)}
                    >
                        View
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PaperCard;
