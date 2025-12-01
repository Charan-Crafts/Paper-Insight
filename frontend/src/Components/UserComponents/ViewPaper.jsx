import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Save } from 'lucide-react';
import { savePaper } from '../../redux/slice/paperSlice';
import { toast } from "react-toastify"
const ViewPaper = () => {

    const { paperId } = useParams();

    const dispatch = useDispatch();

    const decodedId = paperId ? decodeURIComponent(paperId) : '';

    const { papers, savedPapers } = useSelector((state) => state.papers);

    // Try to find the paper either in the current search results or in saved papers
    const currentPaper =
        (papers || []).find((paper) => paper.id === decodedId) ||
        (savedPapers || []).find(
            (paper) =>
                paper.id === decodedId ||
                paper.paperId === decodedId ||
                paper._id === decodedId
        );

    // Check if this paper is already in savedPapers (by multiple possible id fields)
    const isAlreadySaved = !!currentPaper && (savedPapers || []).some((paper) =>
        paper.id === decodedId ||
        paper.paperId === decodedId ||
        paper._id === decodedId
    );

    const handleSavePaper = () => {
        if (!currentPaper || isAlreadySaved) return;

        dispatch(savePaper(currentPaper))
            .then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                }
            });
    }

    // console.log(currentPaper);

    // If for some reason we couldn't find the paper, show a friendly message
    if (!currentPaper) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-black">Paper not found</h1>
                <p className="text-text/70 mt-2">
                    We couldn't load the details for this paper. Try opening it again from Search or Saved Papers.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-2 py-6  flex items-center justify-between" >
                <div className="flex items-center gap-2 border-b flex-col border-text/5 pb-2">
                    <h1 className="text-2xl font-bold text-black">{currentPaper.title}</h1>

                    <span className="text-md text-left text-text/70  font-bold font-ibm-plex-sans">Published on: {currentPaper.published.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-2 border-b flex-row w-1/12 border-text/5 pb-2">
                    <a href={currentPaper.pdf_url} download={currentPaper.title} className="bg-text text-background px-3 py-1 rounded-md text-sm font-medium cursor-pointer">Download</a>
                    <button
                        className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${isAlreadySaved ? 'bg-gray-400 text-background cursor-default' : 'bg-text text-background'
                            }`}
                        onClick={isAlreadySaved ? undefined : handleSavePaper}
                        disabled={isAlreadySaved}
                    >
                        {isAlreadySaved ? 'Saved' : 'Save'}
                    </button>

                </div>



            </div>

            {/* Abstract and Authors  */}
            <div className="flex items-center justify-between gap-2 w-full">
                {/* Abstract Section */}
                <div className="w-3/4">
                    <h2 className="text-2xl font-bold text-black mb-3">Abstract</h2>
                    <p className="text-xl text-justify tracking-wider text-black font-ibm-plex-sans mt-2 ">{currentPaper.abstract}</p>
                </div>


                {/* Authors Section */}
                <div className="w-1/4 ">
                    {
                        currentPaper.authors.map((author, index) => (
                            <div key={index} className="flex items-start justify-right px-3 gap-2">
                                <h3 className="text-lg font-bold text-black">{index + 1}. {author}</h3>

                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-full mt-3">
                <h1 className="text-2xl font-bold text-black mb-3">Category</h1>
                <p className="text-xl text-left tracking-wider text-black font-ibm-plex-sans mt-2 ">{currentPaper.category}</p>
            </div>

        </div>
    );
}

export default ViewPaper;
