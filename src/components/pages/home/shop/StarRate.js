import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function StarRate () {

    const [rating, setRating] = useState(null)
    const [rateColor, setRateColor] = useState(null)

    return (
        <>
            {[...Array(5)].map((star, index) => {
                const currentRate = index + 1
                return(
                    <>

                    <label>
                    <input type="radio" name="rate"
                    onClick={()  => setRating(currentRate)}
                    value={currentRate}
                    style={{ display: "none" }}/>
                    <FontAwesomeIcon icon={faStar} color={ currentRate <= (rateColor || rating) ? "yellow" : "grey"}/>
                    </label>
                    </>

                )
            })}
        </>
    )

}