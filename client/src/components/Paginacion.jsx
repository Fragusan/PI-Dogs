 import React from "react";
 import "./Paginacion.css";
 //ver referencia en componente Home.js

 export default function Paginacion({pPorPagina, razas, paginacion}){
     const numeroDePagina =[]

     for(let i = 1; i <=Math.ceil(razas/pPorPagina); i++){
         numeroDePagina.push(i)
     }
     return (
         <nav>
             {/* <i class="fa fa-chevron-left" aria-hidden="true"></i> */}
             <ul className="paginacion" >
             {numeroDePagina?.map(numerito =>(
                 <div className="ndepag" key={numerito}>
                     <a onClick={()=>paginacion(numerito)}>{numerito}</a>
                 </div>
             ))
             }
             </ul>
             {/* <i class="fa fa-chevron-right" aria-hidden="true"></i> */}
         </nav>
     )
 }

//  <li className="ndepag" key={numerito}></li>