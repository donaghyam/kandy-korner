import React, { useEffect, useState } from "react"

//The purpose of this component is to display the list of customers

export const CustomerList = () => {
    //customers variable holds initial state
    //changeEmployee() is a function to modify said state
    const [customers, changeCustomer] = useState([])

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of customers
            fetch("http://localhost:8088/customers")
            //Convert JSON encoded string into Javascript   
            .then(res => res.json())
            //Invoke changeCustomer() to set value of customers 
            .then((data) => {
                changeCustomer(data)
            })
        },
        []
    )

    return (
        <>
            {
                customers.map(
                    (customer) => {
                        return <div>
                            <p key={`customer--${customer.id}`}>
                            {customer.name}<br></br>
                            id: {customer.id}<br></br>
                            address: {customer.address}<br></br>
                            email: {customer.email}<br></br>
                            </p>
                            </div>
                    }
                )
            }
        </>
    )
}