import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchPapers } from '../../redux/slice/paperSlice';
const SearchComponent = () => {
    const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

    const paperTypes = ["Research Paper", "Review Paper", "Case Study", "Short Communication", "Technical Report", "White Paper"];

    const researchFields = [
        "Computer Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Data Science",
        "Cybersecurity",
        "Software Engineering",
        "Mathematics",
        "Physics",
        "Biology",
        "Chemistry",
        "Medicine",
        "Neuroscience",
        "Psychology",
        "Economics",
        "Social Sciences",
        "Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Aerospace Engineering",
        "Environmental Science",
        "Materials Science",
        "Biotechnology",
        "Bioinformatics",
        "Climate Science",
        "Robotics",
        "Quantum Computing"
    ];


    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    const [researchField, setResearchField] = useState("");

    const [paperType, setPaperType] = useState("");

    const [publicationYear, setPublicationYear] = useState("");

    const [sortBy, setSortBy] = useState("");


    useEffect(() => {

        const searchParams = {
            searchQuery,
            researchField,
            paperType,
            publicationYear,
            sortBy
        }

        dispatch(fetchPapers(searchParams))
            .then((response) => {
                console.log("Fetched papers:", response);
            })

    }, [sortBy, publicationYear, paperType, researchField])
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search logic here
        // console.log("Searching for:", { searchQuery, researchField, paperType, publicationYear, sortBy });

        const searchParams = {
            searchQuery,
            researchField,
            paperType,
            publicationYear,
            sortBy
        }

        dispatch(fetchPapers(searchParams))
            .then((response) => {
                console.log("Fetched papers:", response);
            })
    }



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
                                <input type="text" placeholder="Search by title, author, DOI..." className="flex-1 rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/60 focus:outline-none focus:ring-2 focus:ring-text/10"

                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />

                                <button className="bg-text text-background px-5 py-3 rounded-lg font-semibold"
                                    onClick={handleSearch}>Search</button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Research Field</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text" value={researchField} onChange={(e) => setResearchField(e.target.value)}>
                                        <option value="">All fields</option>
                                        {researchFields.map((field, idx) => (
                                            <option key={idx} value={field}>{field}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Paper type</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text" value={paperType} onChange={(e) => setPaperType(e.target.value)}>
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
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)}>
                                        <option value="">Any year</option>
                                        {years.map((year, idx) => (
                                            <option key={idx} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>



                                <div>
                                    <label className="block text-sm text-text/80 mb-2">Sort by</label>
                                    <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
