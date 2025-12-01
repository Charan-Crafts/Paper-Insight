import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Save } from 'lucide-react';
import { useDispatch  } from 'react-redux';
import { savePaper } from '../../redux/slice/paperSlice';
import {toast} from "react-toastify"
const ViewPaper = () => {

    const { paperId } = useParams();

    const dispatch = useDispatch();

    const decodedId = paperId ? decodeURIComponent(paperId) : '';

    const { papers } = useSelector((state) => state.papers);

    const currentPaper = papers.find((paper) => paper.id === decodedId);

    const handleSavePaper = () => {
        
        dispatch(savePaper(currentPaper))
            .then((res)=>{
                if(res.payload.success){
                    toast.success(res.payload.message)
                }
            })
    }

    // console.log(currentPaper);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-2 py-6  flex items-center justify-between" >
                <div className="flex items-center gap-2 border-b flex-col border-text/5 pb-2">
                    <h1 className="text-2xl font-bold text-black">{currentPaper.title}</h1>

                    <span className="text-md text-left text-text/70  font-bold font-ibm-plex-sans">Published on: {currentPaper.published.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-2 border-b flex-row w-1/12 border-text/5 pb-2">
                    <a href={currentPaper.pdf_url} download={currentPaper.title} className="bg-text text-background px-3 py-1 rounded-md text-sm font-medium cursor-pointer">Download</a>
                    <button className="bg-text text-background px-3 py-1 rounded-md text-sm font-medium cursor-pointer" onClick={handleSavePaper}>Save</button>

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
                            currentPaper.authors.map((author,index)=>(
                                <div key={index} className="flex items-start justify-right px-3 gap-2">
                                    <h3 className="text-lg font-bold text-black">{index + 1}. {author}</h3>
    
                                </div>
                            ))
                        }
                </div>
            </div>

            <div className="w-full mt-3">
                <h1 className ="text-2xl font-bold text-black mb-3">Category</h1>
                <p className="text-xl text-left tracking-wider text-black font-ibm-plex-sans mt-2 ">{currentPaper.category}</p>
            </div>
            
        </div>
    );
}

export default ViewPaper;
