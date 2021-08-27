import { React } from 'react';
import { Link } from 'react-router-dom';
import "./Landing.css";

export default function Landing() {
    return (
        <div className="body">
            <h1>Bienvenido a Dogs App Lite</h1>
            <Link to='/home'>
                <button>Iniciar</button>
            </Link>
        </div>
    )
}