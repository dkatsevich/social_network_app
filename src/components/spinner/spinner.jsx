import React from "react";
import spinner from './spinner.svg'

const Spinner = () => {
    return (
        <div className="spinner" style={{display: 'flex', justifyContent: 'center'}}>
            <img src={spinner} alt=""/>
        </div>
    )
}

export default Spinner;