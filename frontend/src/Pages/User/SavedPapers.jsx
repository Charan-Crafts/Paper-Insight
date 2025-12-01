import React from 'react';
import PaperCard from '../../Components/UserComponents/PaperCard';
import {useSelector ,useDispatch} from "react-redux"
import { getSavedPapers } from '../../redux/slice/paperSlice';
import {useEffect} from "react"
import { useState } from 'react';
const SavedPapers = () => {

  const dispatch = useDispatch();

  const {savedPapers} = useSelector((state)=>state.papers)

  const {user} = useSelector((state)=>state.auth)

  
    const [viewPaper, setViewPaper] = useState(false);
  

  useEffect(()=>{

    dispatch(getSavedPapers(user.userId))
      .then((response)=>{
        // console.log("Saved papers fetched:", response);
      })

  },[])
  

  return (
    <div className="min-h-screen bg-background/0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text">My Collections</h1>
            <p className="text-sm text-text/70 mt-1">Papers you saved for later reading.</p>
          </div>

          {/* <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-ghost">Import</button>
            <button className="btn btn-sm">New collection</button>
          </div> */}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedPapers.map((p, idx) => (
            <PaperCard key={idx} paper={p}  setViewPaper={setViewPaper}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedPapers;
