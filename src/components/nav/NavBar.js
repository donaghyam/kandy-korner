import React from "react";
import { Link } from "react-router-dom";

//This component builds the navigation bar for UI

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                {/* Link component generates anchor tags 
                    -the "to="" attribute is going to be the href attribute 
                      of the anchor tag it's goingt to create
                    -this link component is what broadcasts that the URL has changed */}

                <Link className="navbar__link" to="/products">Products</Link>
                <Link className="navbar__link" to="/locations">Locations</Link>
                <Link className="navbar__link" to="/customers">Customers</Link>
                <Link className="navbar__link" to="/employees">Employees</Link>   
                <Link className="navbar__link" to={`/myOrders/${localStorage.getItem("kandy_customer")}`}>MyOrders</Link>            
            </li>
        </ul>
    )
}

//Whenever a link is clicked, the browser broadcasts an event the URL was changed
//  -the ApplicationViews component will be listening for this event

//NavBar will be implemented in KandyKorner.js