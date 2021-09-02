import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetails } from "../actions/index"
import { useEffect } from "react";
import "./DogDetail.css";

 

export default function Detail(prop) {
    console.log("prop:",prop)
    const dispatch = useDispatch()
    //accedo al id desde aqui para dejar mas legible el useEffect
    const { id } = prop.match.params
   
 
    useEffect(() => {
        dispatch(dogDetails(id))
    }, [ dispatch])

    const dog = useSelector(e => e.details)
    console.log("loquetengo en dog:", dog.name)

    return (
        <div>
            
            <div className="detail">{ 
                (dog.length !== 0) ? <div>
                    <h1>Nombre de la raza : {dog[0].name}</h1>
                    <img className="img" src={dog[0].Image} alt={`fotografia de un ejemplar de la raza ${dog[0].name}`} title={`fotografia de un ejemplar de la raza ${dog[0].name}`}  />
                    <h3>Altura: {dog[0].height} cm</h3>
                    <h3>Peso: {dog[0].weight} kg</h3>
                    <h3>Temperamentos habituales: { (dog[0].temperament)? dog[0].temperament : "🤔 Nada para mostrar aquí"}</h3>
                    <h3>Esperanza de vida: {dog[0].life_span} años</h3>
                </div>
                    : <div>
                        <div>Loading . . . </div>
                        <img src="https://i.ibb.co/TtR7Cgx/load.gif" alt="loading" />
                        <div className="warning"><h3>¿Estás seguro que este ID es correcto?</h3></div>
                        
                    </div>
            }</div>
            
            <button><Link to="/home">Volver a Home</Link></button>
        </div>
    )
}