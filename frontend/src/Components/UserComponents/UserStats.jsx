import React from 'react';

const UserStats = () => {
    return (
        <div className="w-full">
            <div className="bg-background rounded-2xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-background/5 rounded">
                        <div className="text-sm text-text/60">Downloads</div>
                        <div className="text-2xl font-semibold text-text">31K</div>
                        <div className="text-xs text-text/60">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="p-4 bg-background/5 rounded">
                        <div className="text-sm text-text/60">Papers Analyzed</div>
                        <div className="text-2xl font-semibold text-text">4,200</div>
                        <div className="text-xs text-text/60">↗︎ 400 (22%)</div>
                    </div>

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
