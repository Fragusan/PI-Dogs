import React from "react";
//hooks de react que voy a usar
import { useState, useEffect } from "react";
//hooks de redux que voy a usar
import { useDispatch, useSelector } from 'react-redux';
//actions
import { getDogs, filterDogByUser, filterByName, filterByW8, filterByTemperament } from "../actions";
// para la redireccion
import { Link } from "react-router-dom"
// copoenntes importados
import DogCard from "./DogCard";
import Paginacion from "./Paginacion";
import SearchBar from "./Searchbar";
//estilos del compoennte local 
import "./Home.css";



export default function Home() {

    const dispatch = useDispatch()
    //traigo del reducer todos mis perros
    const razas = useSelector((state) => state.dogs)
    //La idea del paginado desde  https://youtu.be/IYCa1F-OWmk (no se me hubiera ocurrido)


    //estado local para la pagina actual
    const [paginaActual, setPaginaActual] = useState(1)
    //cuantoos por pagina 
    const [pPorPagina, setPPorPagina] = useState(8)
    //logica para 
    const posicionDelUltimo = paginaActual * pPorPagina
    const posicionDelPrimero = posicionDelUltimo - pPorPagina
    //paginado en render de lo que muestro, de tdos los perros solo tomo lo del paginado
    const razaActual = razas.slice(posicionDelPrimero, posicionDelUltimo)

    const [byName, setByName] = useState("")
    const [byW8, setByW8] = useState("")
    // const [tem, setTem] = useState("")


    //la paginacion en si (me setea el estado en el n de pagina)
    const paginacion = (numeroDePagina) => {
        setPaginaActual(numeroDePagina)
    }


    useEffect(() => {
        dispatch(getDogs())
        //array de dependencia
    }, [dispatch])

    //Funcionalidades de botones adcionales
    function handleClick(a) {
        a.preventDefault();
        dispatch(getDogs())
        setPaginaActual(1);
    }

    function handleFilterByUser(p) {
        dispatch(filterDogByUser(p.target.value))
        setPaginaActual(1);
    }

    function handleByName(e) {
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setPaginaActual(1);
        setByName(`acomodado ${e.target.value}`)
    }

    function handleByW8(e) {
        e.preventDefault();
        dispatch(filterByW8(e.target.value))
        //comience en la pagina desde el 1
        setPaginaActual(1);
        setByW8(`por peso ${e.target.value}`)
    }


    /* <select title="Ordenar por temperamento">
        {<select onChange={(e) => handleSelect(e)}>
            {temperament.map((t) => {

                return <option value={t}> {t}</option>
            })}
        </select>} */


        return (
        <div className="home">
            <div className="navbar">
                <div >
                    <Link to="/"><img src="https://i.ibb.co/5FMkkSq/mini-logo.pngg" title="Estas corriendo la version lite de la app" alt="restarter" /></Link>
                </div>
                <div><SearchBar /></div>
                <div className="menu">
                    <div><Link to="/home"><img src="https://i.ibb.co/7b3hQPh/hom.png" alt="home" title="Home" /></Link></div>
                    <div><Link to="/dog"><img src="https://i.ibb.co/BcQqYRz/paw.png" alt="add dog" title="Agregar una raza" /></Link></div>
                    <div><img src="https://i.ibb.co/Pcc3dFn/f5.png" onClick={p => { handleClick(p) }} alt="clean" title="Restablecer filtros/busqueda" /></div>
                    <div><Link to="/"><img src="https://i.ibb.co/2MqVRq3/exit.png" alt="exit" title="Salir de la app" /></Link></div>
                </div>

            </div>



            <div>
                <select title="Alternar el orden alfabético" onChange={e => handleByName(e)}>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select title="Ordenar por peso" onChange={e => handleByW8(e)}>
                    <option value="mayor">Menor primero</option>
                    <option value="menor">Mayor primero</option>
                </select>
                <select title="Filtar por..." onChange={p => handleFilterByUser(p)}>
                    <option value="Unify">Todos</option>
                    <option value="dogApi">Solo Predeterminados</option>
                    <option value="myDog">Mis perros</option>
                </select>


                <div className="dogCard">
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
                <br />

                <hr />
                <br />

                <Paginacion
                    pPorPagina={pPorPagina}
                    razas={razas.length}
                    paginacion={paginacion}>
                </Paginacion>
                <br />

                <footer>Created by Fragusan 🚀</footer>

            </div>
        </div>
        )

}

