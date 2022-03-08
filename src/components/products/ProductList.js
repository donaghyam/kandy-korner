import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ProductList = () => {
    //When you invoke useState, it returns an array
    //Variable on left captures initial value of state
    //Variable on right holds function whose job it is to modify state
    const [products, setProduct] = useState([])

    const history = useHistory()

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of products
            //Expanding allows us to access the candy type via the products
            fetch("http://localhost:8088/products?_expand=type&_sort=type")
            //Convert JSON encoded string into Javascript    
            .then(res => res.json())
            //Invoke setProduct() to set value of products
            .then((data) => {
                setProduct(data)
            })
        },
        //This array isn't watching any state - it runs when the component is rendered, and never again
        []
    )
    
    //Define function to save purchase
    const savePurchase = (productObject) => {
        //Define variable to store new candy object
        const newPurchase = {
            //The customer's ID is being stored in localStorage, NOT our API
            //By default, this is a string, so the integer must be parsed
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            employeeId: 1,
            //JSON server will delete an ENTIRE object if there is an invalid foreign key 
            //(such as 1, or any other key that doesn't exist)
            productId: productObject.id,
            locationId: 1,
            dateCompleted: ""
        }

    //Define variable to send object to API
        const fetchOption = {
            //Sending an object = POST - create new
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //Send body of purchase - This must be a string for JSON 
            body: JSON.stringify(newPurchase)
        }

    return fetch("http://localhost:8088/purchases", fetchOption)
        .then(response => response.json())
        .then(() => {
            //Use history mechanism from react-router-dom
            //This allows us to push to our browser history (this looks like an array method, but is not)
            //When this triggers, the user will be redirected to the service tickets page
            history.push("/myOrders")
        })

    }

    return (
        <>
            {
                products.map(
                    (productObject) => {
                        return <div>
                                    <p key={`product--${productObject.id}`}>
                                        Id: {productObject.id}<br></br>
                                        Type: {productObject.type.name}<br></br>
                                        Product: {productObject.name}<br></br>
                                        Price: ${productObject.price}<br></br>
                                    </p>
                                    <button onClick={() => {
                                        const copy = {...productObject}
                                        savePurchase(copy)
                                        }}>Purchase
                                    </button>
                                </div>
                    }
                )
            }
        </>
    )
}