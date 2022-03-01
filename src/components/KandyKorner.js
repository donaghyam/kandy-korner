import React from "react"
import { LocationList } from "./locations/Locations.js"
import { ProductList } from "./products/ProductList.js"

export const Kandy = () => {
    return (
        <>

            <h2>Location List</h2>
            <LocationList />

            <h2>Product List</h2>
            <ProductList />
          
        </>
    )
}