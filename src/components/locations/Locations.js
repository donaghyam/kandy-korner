import React, { useEffect, useState } from "react"

export const LocationList = () => {
    const [locations, setLocation] = useState([])


    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((data) => {
                    setLocation(data)
                })
        },
        []
    )

    useEffect(
        () => {

        },
        [locations]
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