import React, { useState } from 'react';
import NavbarLogo from "../../assets/Background Rem.png"
import { Grid2X2, FileSearchCorner, BookMarked, MessageSquare, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
const SidebarDrawer = () => {

    const [paperId, setPaperId] = useState(null);
    // Use relative paths (no leading slash) so links resolve under the current parent route (/paperinsight)
    const sidebarItems = [
        { name: 'Dashboard', Icon: Grid2X2, path: '.' },
        { name: 'Search Papers', Icon: FileSearchCorner, path: 'papers' },
        { name: 'My Collections', Icon: BookMarked, path: 'savedpapers' },
        { name: 'Research Chat', Icon: MessageSquare, path: 'researchchat' },
        
    ];


    return (
        // Sidebar: vertical on md+, horizontal compact on small screens
        <aside className="bg-background border-r border-text/5 md:w-64 w-full md:min-h-screen">
            <div className="max-w-7xl mx-auto px-3 py-6">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm">
                        <img src={NavbarLogo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden md:block">
                        <h3 className="text-lg font-semibold text-text">Paper Insight</h3>
                        <p className="text-sm text-text/60">Research, summarized.</p>
                    </div>
                </div>

                {/* Items: on small screens show a horizontal bar */}
                <nav>
                    <ul className="flex md:flex-col gap-2 overflow-auto">
                        {sidebarItems.map((item, idx) => (
                            
                            <li key={idx} className="md:mb-1">
                                {
                                    

                                        <Link to={item.path}

                                            className="flex items-center gap-3 md:gap-4 px-3 py-2 rounded-lg hover:bg-text/5 transition-colors text-text"
                                            title={item.name}
                                        >
                                            <item.Icon className="h-5 w-5 text-text/80" />
                                            <span className="hidden md:inline-block font-medium">{item.name}</span>
                                        </Link>

                                       
                                }
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default SidebarDrawer;
