import React from 'react';
import { useSelector } from 'react-redux';

const UserStats = () => {
    const { savedPapers = [] } = useSelector((state) => state.papers);
    const totalSaved = savedPapers.length;

    return (
        <div className="w-full">
            <div className="bg-background rounded-2xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="p-4 bg-background/5 rounded">
                        <div className="text-sm text-text/60">Total Saved Papers</div>
                        <div className="text-2xl font-semibold text-text">{totalSaved}</div>
                        <div className="text-xs text-text/60">Across all your collections</div>
                    </div>

                    {/* <div className="p-4 bg-background/5 rounded">
                        <div className="text-sm text-text/60">Papers Analyzed</div>
                        <div className="text-2xl font-semibold text-text">4,200</div>
                        <div className="text-xs text-text/60">↗︎ 400 (22%)</div>
                    </div> */}

                    {/* <div className="p-4 bg-background/5 rounded">
                        <div className="text-sm text-text/60">New Registers</div>
                        <div className="text-2xl font-semibold text-text">1,200</div>
                        <div className="text-xs text-text/60">↘︎ 90 (14%)</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default UserStats;
