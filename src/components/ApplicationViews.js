import React from "react";
import { Route } from "react-router-dom";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { LocationList } from "./locations/Locations";
import { ProductList } from "./products/ProductList";

//The purpose of this component is to set up the individual routes, and which component should be displayed
//when a particular browser route has been changed in the URL

//ApplicationViews will be listening for the change event from when the URL was changed in NavBar

export const ApplicationViews = () => {
    return (
        <>
            {/* These routes are listening for the event from NavBar */}
            <Route path="/products">
                {/* When the URL changes to /customers, display CustomerList component to the user */}
                <ProductList />
            </Route>

            <Route path="/locations">
                <LocationList />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/employees/hire">
                <EmployeeForm />
            </Route>
        </>
    )
}

//Application views will be implemented in Repairs.js