import React, { useState } from "react";
import GameAPI from "../../apis/gameAPI";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const CreateReview = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        // try {
        //   const response = await GameAPI.post(`/${id}/addReview`, {
        //     name,
        //     review: reviewText,
        //     rating,
        //   });
        // navigate("/"+location.pathname)
        // } catch (err) {}
        // };
    
    };
    return (
        <div className="mb-2">
     
        </div>
    )
};


export default CreateReview;
