/**
 * Open Paths Navbar
 */

// Dependencies
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const PUBLIC_PATHS = [
        { path: "/home", name: "Home" },
        { path: "/about", name: "About" },
        { path: "/posts", name: "Posts" },
        { path: "/gallery", name: "Gallery" },
        { path: "/contact", name: "Contact" },
    ];

    return (
        <nav className={`bg-accentP-900 h-20 w-full`}>
            {PUBLIC_PATHS.map(({ path, name }, index) => (
                <Link key={name} to={path} className="mx-2">
                    {name}
                </Link>
            ))}
        </nav>
    );
}

export default Navbar;
