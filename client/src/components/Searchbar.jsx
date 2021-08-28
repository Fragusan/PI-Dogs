import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNameDog } from "../actions";

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
        <div>
            <input type="text" placeholder="Aquí puedes introducir la raza de perro a buscar" onChange={(b)=> handleInputChange(b)} />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Realizar busqueda</button>
        </div>
    )
}