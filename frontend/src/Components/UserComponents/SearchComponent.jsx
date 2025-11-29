import React from 'react';

const SearchComponent = () => {
    const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

    const paperTypes = ["Research Paper", "Review Paper", "Case Study", "Short Communication", "Technical Report", "White Paper"];

    const researchFields = ["Computer Science", "Biology", "Chemistry", "Physics", "Mathematics", "Engineering", "Medicine", "Social Sciences", "Economics", "Psychology"];

    return (
        <div className="min-h-[60vh]">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-background/95 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-black mb-4">Search Papers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left: search input + submit */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-text/80 mb-2">Search query</label>
                            <div className="flex gap-3">
                                <input type="text" placeholder="Search by title, author, DOI..." className="flex-1 rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/60 focus:outline-none focus:ring-2 focus:ring-text/10" />
                                <button className="bg-text text-background px-5 py-3 rounded-lg font-semibold">Search</button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Research Field</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text">
                                        <option value="">All fields</option>
                                        {researchFields.map((field, idx) => (
                                            <option key={idx} value={field}>{field}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Paper type</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text">
                                        <option value="">All types</option>
                                        {paperTypes.map((type, idx) => (
                                            <option key={idx} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right: filters */}
                        <aside className="md:col-span-1">
                            <div className="bg-background/5 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-text mb-3">Filters</h3>

                                <div className="mb-4">
                                    <label className="block text-sm text-text/80 mb-2">Publication year</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text">
                                        <option value="">Any year</option>
                                        {years.map((year, idx) => (
                                            <option key={idx} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                               

                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Sort by</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text">
                                        <option value="relevance">Relevance</option>
                                        <option value="newest">Newest</option>
                                        <option value="citations">Most cited</option>
                                    </select>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;
