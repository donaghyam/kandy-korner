import React from "react";
import { Route } from "react-router-dom";
import { CustomerList } from "./customers/CustomerList";
import { MyOrders } from "./customers/MyOrders";
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

            {/* Capture whatever comes after second slash with the : and the specific key
                that you want that number to be stored in.
                - React will capture that number and store it in the ticketId variable
                - (\d+) This will ensure it only envokes this route when it is this specific path
                - the ticketId is what will be the name of the key
             */}
            <Route exact path="/myOrders/:customerId(\d+)">
                <MyOrders />
            </Route>

            <Route path="/locations">
                <LocationList />
            </Route>

            <Route path="/customers">
                <CustomerList />
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