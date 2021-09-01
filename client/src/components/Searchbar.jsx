import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNameDog } from "../actions";
import "./Searchbar.css";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [raza, setRaza] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setRaza(e.target.value)
        console.log("Buscando:", `"${raza}"`)
        
       
    }
    
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchNameDog(raza))
    }
    

    return (
        <div >
            <div><button className="bttsearch" type="submit" title="Buscar" onClick={(e)=>handleSubmit(e)}><img src="https://i.ibb.co/jRBJNf8/s.png" alt="search - buscar" /></button></div>
            <div><input required className="barsearch" type="text" placeholder="Introduce una raza de perro" onChange={(b)=> handleInputChange(b)} /></div>
            <div>{raza.length > 0 ? `Resultados de ${raza}` : null}</div>
        </div>
    )
}