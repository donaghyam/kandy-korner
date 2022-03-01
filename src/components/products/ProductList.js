import React, { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, setProduct] = useState([])


    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=type&_sort=price")
                .then(res => res.json())
                .then((data) => {
                    setProduct(data)
                })
        },
        []
    )

    useEffect(
        () => {

        },
        [products]
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