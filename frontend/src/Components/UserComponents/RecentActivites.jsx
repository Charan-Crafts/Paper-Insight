import React from 'react';

const RecentActivites = () => {
    return (
        <div className="w-full">
            <div className="bg-background rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text mb-2">Recent activity</h3>
                <p className="text-text/70 mb-4">Your latest interactions, opened papers, and saved items.</p>

                <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 bg-background/5 rounded-md">
                        <div className="w-10 h-10 rounded-md bg-text/10 flex items-center justify-center">A</div>
                        <div>
                            <div className="text-sm font-medium text-text">Opened: Deep Learning Survey</div>
                            <div className="text-xs text-text/60">2 hours ago</div>
                        </div>
                    </li>

                    <li className="flex items-start gap-3 p-3 bg-background/5 rounded-md">
                        <div className="w-10 h-10 rounded-md bg-text/10 flex items-center justify-center">S</div>
                        <div>
                            <div className="text-sm font-medium text-text">Saved: Transformer Applications</div>
                            <div className="text-xs text-text/60">Yesterday</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default RecentActivites;
