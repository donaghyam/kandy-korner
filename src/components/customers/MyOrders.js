import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const MyOrders = () => {
    //When you invoke useState, it returns an array
    //Variable on left captures initial value of state
    //Variable on right holds function whose job it is to modify state
    const [orders, updateOrders] = useState([])
    const { customerId } = useParams()

    //Create function to store fetch call for orders, so it can be called on when the page is rendered,
    //and when the delete button is clicked.
    const getOrders = () => {
        //Get data from API to pull into application state of orders
        //Expanding allows us to access the customer data via the service ticket
        fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=product`)
            //Convert JSON encoded string into Javascript
            .then(res => res.json())
            //Invoke updateOrders() to set value of tickets
            .then((data) => {
                updateOrders(data)
        })
    }

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes. - It's an event listener.
    //useEffect hook always takes in a function, and an array
    useEffect(
        () => {
            //call getOrders() to pull order data into applicaion state
            getOrders()
            },
        //This array isn't watching any state - it runs when the component is rendered, and never again
        []
    )

    return (
        <>
            {
                orders.map(
                    (order) => {
                        //React NEEDS a new key attribute with a unique value on each element
                        //  - uses the key attribute to do its internal rendering of the DOM to know which element is which 
                        return <div>
                                    <p key={`order--${order.id}`}>
                                        Product: {order.product.name}<br></br>
                                        Price: ${order.product.price}<br></br>
                                    </p>                      
                                </div>
                    }
                )
            }
        </>
    )
}