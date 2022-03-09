import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

//The purpose of this component is to display the list of employees

export const EmployeeList = () => {
    //employees variable holds initial state
    //changeEmployee() is a function to modify said state
    const [employees, changeEmployee] = useState([])
    const history = useHistory()

    //Create function to store fetch call for tickets, so it can be called on when the page is rendered,
    //and when the delete button is clicked.
    const getEmployees = () => {
        //Get data from API to pull into application state of tickets
        fetch("http://localhost:8088/employees?_expand=location")
            //Convert JSON encoded string into Javascript
            .then(res => res.json())
            //Invoke updateTickets() to set value of tickets
            .then((data) => {
                changeEmployee(data)
        })
    }
    
    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //call getEmployees() to pull employee data into application state
            getEmployees()
        },
        []
    )

    //Create function to fire an employee, with a parameter of id from the URL
    const fireEmployee = (id) => {
        //Get data from API to pull into application state of tickets
        fetch(`http://localhost:8088/employees/${id}`, {
            //delete the ticket
            method: "DELETE"
        })
        //then run the getTickets function to update list without the deleted items
        .then(getEmployees())
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Enter New Employee</button>
            </div>
            {
                employees.map(
                    (employee) => {
                        return <div>
                            <p key={`employee--${employee.id}`}>
                            {employee.name}<br></br>
                            Location: {employee.location.address}<br></br>
                            {/* Use stringify to convert boolean */}
                            Manager: {JSON.stringify(employee.manager)}<br></br>
                            Full time: {JSON.stringify(employee.fullTime)}<br></br>
                            Rate: ${employee.hourlyRate}/hr
                            </p>
                            <button onClick={() => {
                                fireEmployee(employee.id)
                                }}>Fire
                            </button>
                            </div>
                    }
                )
            }
        </>
    )
}