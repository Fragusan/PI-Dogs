import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {posNewDog, filterByTemperament} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

import "./NewDog.css";

export default function NewDog(){
     const dispatch = useDispatch()
     const temperament = useSelector((state) => state.temperament)

    //nuevo estado wiii
     const [ nuevo ,setNuevo ] = useState({
        name : "",
        height : "",
        weight : "",
        temperament : [],
        life_span : "",
        Image :"",  
        flagByUser : true

     })
     function handleChange(e){
         setNuevo({
             ...nuevo,
             // se setea de manera dinamica con el value
             [e.target.name] : e.target.value
         })
     }

     function handleSelect(e){
         setNuevo({
             ...nuevo,
            temperament: [...nuevo.temperament, e.target.value]
         })
     }

     function handleSubmit(e){
         e.preventDefault()
         console.log("los datos a cargar:",nuevo)
         dispatch(posNewDog(nuevo))
         alert("La nueva raza fue creada de manera satisfactoria")
         //borro los valores de la entrada al formulario
         setNuevo({
            name : "",
            height : "",
            weight : "",
            temperament : [],
            life_span : "",
            Image :"",  
            flagByUser : true
          })

     }

     // para renderizar los temperamentos
     useEffect(()=>{
         dispatch(filterByTemperament());
     }, [dispatch]);

     return (
         <div className="contenedor">
             {/* <div className="img"><img src="https://i.ibb.co/jTdkb7G/d.png" alt="" /></div> */}
             <div className="form">
             <Link title="Regresar a la pantalla anterior" to="/home"><img src="https://i.ibb.co/W3y6NbM/dog-logo.png" weight="64px" alt="" /></Link>
             <h1>Agregar una nueva raza 🐶</h1>
             <form onSubmit={e => handleSubmit(e)}>
                 <div>
                     <label>Nombre: </label>
                     <input required type="text" value={nuevo.name} name="name" onChange={e => handleChange(e)}/>
                 </div>

                 <div>
                     <label>Altura (en cm): </label>
                     <input required type="number" name="height" min="10" max="103" value={nuevo.height} onChange={e => handleChange(e)}/>
                 </div>
                 <div>
                     <label>Peso (en kg): </label>
                     <input required type="number" name="weight" min="4" max="110" value={nuevo.weight} onChange={e => handleChange(e)}/>
                    
                 </div>
                  <div>
                     <label>Esperanza de vida: </label>
                     <input required type="number" value={nuevo.life_span} min="1" max="30" name="life_span" onChange={e => handleChange(e)} />
                 </div> 
                 <select onChange={(e)=> handleSelect(e)}>
                     {temperament.map((t) =>{
                         
                         return <option value={t}> {t}</option>
                     })}
                 </select>

                 <div>
                     <h3>Temperamentos seleccionados</h3>
                     <div>{nuevo.temperament.map(t=> `${t} , `)}</div>
                 </div>
                  <div>
                     <label>Imagen del perro:  </label>
                     <input type="text" value={nuevo.Image} name="Image" onChange={e => handleChange(e)}/>
                 </div> 

                  
                 <button type="submit" >Crear la nueva raza</button>
                 <button><Link to="/home">Volver al inicio</Link></button>
                 <button><Link to="/home">Cancelar</Link></button>
                 


             </form>
             </div>
             
         </div>
     )

}
