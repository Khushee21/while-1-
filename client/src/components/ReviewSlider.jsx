import React from "react";
import Marquee from "react-fast-marquee";
import Reviewcard from "./Reviewcard";
import { reviews } from "../utils/reviews";

const ReviewSlider=()=>{
    return(
        <div>
            <Marquee parseOnHover speed={40} gradient={false}>
                {
                    reviews.map((review , i) =>(
                        <Reviewcard key={i} {...review}/>
                    ))}
            </Marquee>
        </div>
    );
};

export default ReviewSlider;