import React from "react";
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";

//The purpose of this component is to determine the general layout of the site 
//  - determines which order components should be displayed

export const KandyKorner = () => {
    return (
        //Fragment allows you to return one JSX element instead of a parent with mulitple child elements.
        <>
            <NavBar />
            <ApplicationViews />
        </>
    )
}