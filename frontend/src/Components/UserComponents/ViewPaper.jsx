import React from 'react';
import { useParams } from 'react-router-dom';
const ViewPaper = () => {

    const { paperId } = useParams();

    return (
        <div>
            <h1>View paper {paperId}</h1>
        </div>
    );
}

export default ViewPaper;
