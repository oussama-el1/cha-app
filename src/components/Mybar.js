import React, { Children } from "react";
import CustomScroll from "react-custom-scroll";
import "../css/style.css"


const myscrollbar = () => {
    return (
        <div className="custom-scroll-container with-bg-color">
            <CustomScroll heightRelativeToParent="100%">
                {Children}
            </CustomScroll>
        </div>
    )
}

export default myscrollbar