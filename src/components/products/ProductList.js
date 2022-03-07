import React, { useEffect, useState } from "react"

export const ProductList = () => {
    //When you invoke useState, it returns an array
    //Variable on left captures initial value of state
    //Variable on right holds function whose job it is to modify state
    const [products, setProduct] = useState([])


    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of tickets
            //Expanding allows us to access the candy type via the products
            fetch("http://localhost:8088/products?_expand=type&_sort=type")
            //Convert JSON encoded string into Javascript    
            .then(res => res.json())
            //Invoke updateTickets() to set value of tickets
            .then((data) => {
                setProduct(data)
            })
        },
        //This array isn't watching any state - it runs when the component is rendered, and never again
        []
    )


    return (
        <>
            {
                products.map(
                    (productObject) => {
                        return <p key={`product--${productObject.id}`}>
                                Id: {productObject.id}<br></br>
                                Type: {productObject.type.name}<br></br>
                                Product: {productObject.name}<br></br>
                                Price: ${productObject.price}<br></br>
                            </p>

                    }
                )
            }
        </>
    )
}