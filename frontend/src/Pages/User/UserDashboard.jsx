import React from 'react';
import RecentActivites from '../../Components/UserComponents/RecentActivites';
import TrendingResearch from '../../Components/UserComponents/TrendingResearch';
import UserStats from '../../Components/UserComponents/UserStats';
const UserDashboard = () => {
    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-text">Welcome back, Charan</h1>
                    <p className="text-sm text-text/70">Continue exploring research with ease</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <section className="md:col-span-2">
                        <h2 className="text-lg font-semibold text-text mb-3">Recent Activity</h2>
                        <RecentActivites />
                    </section>

                    <aside className="md:col-span-1">
                        <h2 className="text-lg font-semibold text-text mb-3">Trending Research</h2>
                        <TrendingResearch />
                    </aside>

                    <section className="md:col-span-3">
                        <h2 className="text-lg font-semibold text-text mb-3">Stats</h2>
                        <UserStats />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
