import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterDogByUser } from "../actions";
import { Link } from "react-router-dom"
import DogCard from "./DogCard";
import Paginacion from "./Paginacion";
import SearchBar from "./Searchbar";

export default function Home() {

    const dispatch = useDispatch()
    const razas = useSelector((state) => state.dogs)
    //La idea del paginado desde el frontend  https://youtu.be/IYCa1F-OWmk

    const [paginaActual, setPaginaActual] = useState(1)
    const [pPorPagina, setPPorPagina] = useState(8)
    const posicionDelUltimo = paginaActual * pPorPagina
    const posicionDelPrimero = posicionDelUltimo - pPorPagina
    const razaActual = razas.slice(posicionDelPrimero, posicionDelUltimo)

    const paginacion = (numeroDePagina) => {
        setPaginaActual(numeroDePagina)
    }


    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    //Funcionalidades de botones adcionales
    function handleClick(a) {
        a.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterByUser(p) {
        dispatch(filterDogByUser(p.target.value))
    }

    return (
        <div>
            <div><SearchBar/></div>
            <div>
                <Link to="/dog">Agregar una nueva raza de perro</Link>
                <h1>Dogs App Lite</h1>
            </div>
            <button onClick={p => { handleClick(p) }}>Restablecer los filtros</button>
            <div>
                <select>
                    <option value="as">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <select> Por peso
                    <option value="mayor">Mayor peso primero</option>
                    <option value="menor">Menor peso primero</option>
                </select>
                <select onChange={p => handleFilterByUser(p)}>
                    <option value="Unify">Todos</option>
                    <option value="dogApi">Solo Predeterminados</option>
                    <option value="myDog">Mis perros</option>
                </select>


               <div>
               {razaActual?.map((r) => {
                    return (
                        <div className='dog'>
                            <Link to={`/home/${r.id}`}>
                                <DogCard
                                    name={r.name}
                                    Image={r.Image}
                                    temperament={r.temperament}
                                />
                            </Link>
                        </div>
                    )
                })

                }
               </div>

                <hr />

                <Paginacion
                    pPorPagina={pPorPagina}
                    razas={razas.length}
                    paginacion={paginacion}>
                </Paginacion>

                <div>
                    <span>Created by Fragusan 🚀</span>
                </div>

            </div>
        </div>
    )

}

