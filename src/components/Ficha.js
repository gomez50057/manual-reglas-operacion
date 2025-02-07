import React, { useState, useEffect, useCallback } from 'react';
import textData from '../utils';
import './styles.css';
import Navbar from './Navbar';
const imgBasePath = "./img/";
const qrs = "./img/qrs/";


const Ficha = ({ id }) => {
    const [indice, setIndice] = useState(0); // Estado para almacenar el índice de la ficha actual

    const mostrarSiguienteFicha = useCallback(() => {
        setIndice(prevIndice => (prevIndice + 1) % textData.length);
    }, []);

    const mostrarAnteriorFicha = useCallback(() => {
        setIndice(prevIndice => (prevIndice - 1 + textData.length) % textData.length);
    }, []);

    const manejarTecla = useCallback((event) => {
        if (event.key === 'ArrowRight') {
            mostrarSiguienteFicha();
        } else if (event.key === 'ArrowLeft') {
            mostrarAnteriorFicha();
        }
    }, [mostrarSiguienteFicha, mostrarAnteriorFicha]);

    useEffect(() => {
        window.addEventListener('keydown', manejarTecla);
        return () => {
            window.removeEventListener('keydown', manejarTecla);
        };
    }, [manejarTecla]);

    // Obtener la ficha actual según el índice
    const fichaActual = textData[indice];
    return (
        <div>
            <Navbar logo={fichaActual.logo || 'default'} /> {/* Pasa el logo al componente Navbar */}

            <div className='titulo_name'>
                <img src={`${imgBasePath}Recurso 1.png`} alt="Logo 2" className="logo" />
                <div className='nameFicha'>
                    <p>{fichaActual && fichaActual.titulo ? (
                        fichaActual.titulo.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}</p>
                </div>
                <img src={`${imgBasePath}Recurso 2.png`} alt="Logo 2" className="logo" />
            </div>
            <div className="ficha">
                <div className='ficha_OBJETIVO'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Objetivo</p></div>
                    </div>
                    {fichaActual && fichaActual.objetivo ? (
                        fichaActual.objetivo.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_POBLACION'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Población Beneficiaria</p></div>
                    </div>
                    {fichaActual && fichaActual.poblacion ? (
                        fichaActual.poblacion.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_MODALIDAD'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Modalidad</p></div>
                    </div>
                    {fichaActual && fichaActual.modalidad ? (
                        fichaActual.modalidad.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_REQUISITOS'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Requisitos</p></div>
                    </div>
                    {fichaActual && fichaActual.requisitos ? (
                        fichaActual.requisitos.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_APOYO'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Características del Apoyo</p></div>
                    </div>
                    {fichaActual && fichaActual.apoyo ? (
                        fichaActual.apoyo.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_FECHA'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Periodicidad</p></div>
                    </div>
                    {fichaActual && fichaActual.fecha ? (
                        fichaActual.fecha.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
                <div className='ficha_QR'>
                    <div className="img_qr">
                        <img
                            src={
                                fichaActual && fichaActual.titulo
                                    ? `${qrs}${fichaActual.titulo
                                        .toLowerCase()
                                        .replace(/\s+/g, ' ')}.png`
                                    : "default.png"
                            }
                            alt={fichaActual && fichaActual.titulo ? fichaActual.titulo : "titulo"}
                        />
                    </div>
                    <p>Consulta las reglas de operación</p>
                    {fichaActual && fichaActual.link ? (
                        fichaActual.link.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>

                <div className='ficha_CONTACTO'>
                    <div className="ficha_titulo">
                        <div className="buttonContainer"><p className="button">Contacto</p></div>
                    </div>
                    {fichaActual && fichaActual.contacto ? (
                        fichaActual.contacto.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />}
                                {paragraph}
                            </React.Fragment>
                        ))
                    ) : (
                        "Texto no encontrado"
                    )}
                </div>
            </div>
        </div>

    );
}

export default Ficha;


