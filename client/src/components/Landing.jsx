import { React } from 'react';
import { Link } from 'react-router-dom';
import "./Landing.css";



export default function Landing() {
    return (
        <div className="container">


            
            <div className="animationbackground"/>
            
            <div className="body">
                <div className="title">
                    <h1>Bienvenidos a</h1>
                    <img src="https://i.ibb.co/W3y6NbM/dog-logo.png" alt="" />
                </div>
                <div className="button">
                    <Link to='/home'>
                        <button className="btntext" >Iniciar</button>
                    </Link>
                </div>

            </div>
            <div className="animationbackground"/>
            <div className="animationbackground"/>
            <div className="animationbackground"/>
            <div className="animationbackground"/>
            <div className="animationbackground"/>

            

        </div>

    )
}