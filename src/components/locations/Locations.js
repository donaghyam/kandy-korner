import React, { useEffect, useState } from "react"

export const LocationList = () => {
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

    
    return (
        <>
            {
                locations.map(
                    (locationObject) => {
                        return <p key={`location--${locationObject.id}`}>{locationObject.address}</p>
                    }
                    )
                }
        </>
    )
}

