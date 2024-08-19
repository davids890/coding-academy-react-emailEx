import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <header className="app-header">
        <h1>David Email App</h1><br />
        {/* <nav className="nav-bar"> ?? */}
        <nav>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/about" >About us</NavLink>
            <NavLink to="/email" >Email Index</NavLink>
        </nav>
        
    </header>
}


// <NavLink to="/email_index" >Email Index</NavLink> // email_index?