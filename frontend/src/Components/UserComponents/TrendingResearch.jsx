import React from 'react';

const TrendingResearch = () => {
    return (
        <div className="w-full">
            <div className="bg-background rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text mb-2">Trending research</h3>
                <p className="text-text/70 mb-4">Papers and topics gaining traction right now.</p>

                <ul className="space-y-3">
                    <li className="p-3 bg-background/5 rounded-md">
                        <div className="text-sm font-medium text-text">Foundation Models in Vision</div>
                        <div className="text-xs text-text/60">1.2k reads · 3 new</div>
                    </li>

                    <li className="p-3 bg-background/5 rounded-md">
                        <div className="text-sm font-medium text-text">Causal Representation Learning</div>
                        <div className="text-xs text-text/60">980 reads · 7 new</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TrendingResearch;
