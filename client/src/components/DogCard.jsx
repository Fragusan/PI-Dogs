import React  from "react";
import "./DogCard.css";

export default function DogCard({Image, name, temperament}){
    return (
        <div className="dogcard">
           <div className="dogName"> <h3>{name}</h3></div>
            <div className="dogImg"><img src={Image} alt="Imagen de un ejemplar de esta raza" width="200px" /></div>
            <div className="dogTemperament"><h5>{temperament}</h5></div>
        </div>
    )
}