import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

//The purpose of this component is to display the list of employees

export const EmployeeList = () => {
    //employees variable holds initial state
    //changeEmployee() is a function to modify said state
    const [employees, changeEmployee] = useState([])
    const history = useHistory()

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of employees
            fetch("http://localhost:8088/employees?_expand=location")
            //Convert JSON encoded string into Javascript   
            .then(res => res.json())
            //Invoke changeEmployee() to set value of employees 
            .then((data) => {
                changeEmployee(data)
            })
        },
        []
    )

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
                            </div>
                    }
                )
            }
        </>
    )
}