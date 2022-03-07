import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
    //employee variable holds initial state
    //updateEmployee() is a function to modify said state
    const [employee, updateEmployee] = useState({
        //Create intial values for each employee object
        name: "",
        locationId: "",
        manager: false,
        fullTime: false,
        hourlyRate: ""
    })

    //define variable to hold state (locations)
    //define variable to hold the function responsible for modifying state (setLocation)
    const [locations, setLocation] = useState([])


    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                //convert JSON string to JS
                .then(res => res.json())
                //invoke setLocations to set value of locations variable
                .then((locationsArray) => {
                    setLocation(locationsArray)
                })
        },
        []
    )

    const history = useHistory()

    //Function to use the state variable to create an object to post to the API
    const SaveEmployee = (event) => {
        //Prevent default behavior of the browser, which is to submit the form
        //This allows us to see the POST in our Network tab of the debugger
        event.preventDefault()
        //Define variable to store new employee object
        const newEmployee = {
            name: employee.name,
            locationId: employee.locationId,
            manager: false,
            fullTime: false,
            hourlyRate: employee.hourlyRate
        }
    
    //Define variable to send object to API
    const fetchOption = {
        //Sending an object = POST
        method: "POST",
        headers: {
            "Content-Type": "application/JSON"
        },
        //Send body of employee form - This must be a string for JSON 
        body: JSON.stringify(newEmployee)
    }


    return fetch("http://localhost:8088/employees", fetchOption)
        .then(response => response.json())
        .then(() => {
            //Use history mechanism from react-router-dom
            //This allows us to push to our browser history (this looks like an array method, but is not)
            //When this triggers, the user will be redirected to the employees page
            history.push("/employees")
        })
    }

    return (
        // The data the user enters will be transient state until the button is clicked and it will be sent to the API
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        //Create an event listner for when state changes
                        onChange={
                            //Capture event passed to us as an argument by the browser
                            (event) => {
                                //Since you cannot directly modify state in React, 
                                //you must first copy the existing state.
                                //Use object spread operator to copy of the current state
                                //The copy variable will be a brand new object with all of the values
                                //copied from state
                                const copy = {...employee}
                                //Modify the copy and update the name to user input
                                copy.name = event.target.value
                                //Make the copy the new state via updateEmployee() function
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select id="locationSelectBox" defaultValue={"0"}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.locationId = event.target.value
                                updateEmployee(copy)
                            }
                        }>
                        <option value="0">Select your location</option>
                            {locations.map((location) => {
                                return <option value={location.id}>{location.address}</option>
                            })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.manager = event.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full Time:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.fullTime = event.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.hourlyRate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={SaveEmployee}>
                Hire employee
            </button>
        </form>
    )
}