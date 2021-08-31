import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {posNewDog, filterByTemperament} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

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

     // para renderizar los temperamentos
     useEffect(()=>{
         dispatch(posNewDog());
     }, []);

     return (
         <div>
             <Link to="/home"><img src="https://i.ibb.co/W3y6NbM/dog-logo.png" weight="64px" alt="" /></Link>
             <h1>Agregar una nueva raza 🐶</h1>
             {/* <form>
                 <div>
                     <label>Nombre</label>
                     <input type="text" value={input.name} name="name" />
                 </div>

                 <div>
                     <label>Altura (en cm):</label>
                     <input type="number" name="valor minimo" min="10" max="103" value={input.height}/>
                 </div>
                 <div>
                     <label>Peso (en kg):</label>
                     <input type="number" name="valor minimo" min="10" max="100" value={input.weight}/>
                    
                 </div>
                  <div>
                     <label>Nombre </label>
                     <input type="text" value={input.name} name="name" />
                 </div> 

                  <div>
                     <label></label>
                 </div> 


             </form> */}
         </div>
     )

}
