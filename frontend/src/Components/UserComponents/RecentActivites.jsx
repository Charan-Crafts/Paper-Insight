import React from 'react';
import { useSelector } from 'react-redux';

const RecentActivites = () => {
    const { recentPapers = [] } = useSelector((state) => state.papers);

    const topFive = recentPapers.slice(0, 5);

    return (
        <div className="w-full ">
            <div className="bg-background rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text mb-2">Recent activity</h3>
                <p className="text-text/70 mb-4">Your latest opened and saved papers.</p>

                {topFive.length === 0 ? (
                    <p className="text-sm text-text/60">You haven't opened any papers yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {topFive.map((paper, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-3 bg-background/5 rounded-md">
                                <div className="w-10 h-10 rounded-md bg-text/10 flex items-center justify-center">
                                    {(paper.title || 'P').charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-text line-clamp-1">
                                        {paper.title || 'Untitled paper'}
                                    </div>
                                    <div className="text-xs text-text/60">
                                        {paper.published
                                            ? `Published: ${paper.published.split('T')[0]}`
                                            : 'Recently viewed'}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default RecentActivites;
