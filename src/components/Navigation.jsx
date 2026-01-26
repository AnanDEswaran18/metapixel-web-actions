import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🛍️ E-commerce
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🏢 Services
            </NavLink>
            <NavLink to="/lead-gen" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                📊 Lead Gen
            </NavLink>
            <NavLink to="/engagement" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                💬 Engagement
            </NavLink>
            <NavLink to="/media" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🎬 Media
            </NavLink>
            <NavLink to="/utilities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🔧 Utility
            </NavLink>
            <NavLink to="/custom" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🎯 Custom
            </NavLink>
        </nav>
    );
};

export default Navigation;
