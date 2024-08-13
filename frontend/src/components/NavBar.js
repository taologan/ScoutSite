import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNavBar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <button onClick={toggleNavBar} className="p-2 bg-gray-800 text-white fixed top-0 right-0">
                ☰
            </button>
            <div className={`fixed top-0 left-0 h-screen ${isExpanded ? 'w-64' : 'w-0'} overflow-hidden m-0 flex 
            flex-col bg-black text-white shadow-lg 
            transition-width duration-1000`}>
                {isExpanded && (
                    <>
                        <i>A</i>
                        <i>B</i>
                        <Link to="/events">
                            <h1>Events</h1>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;