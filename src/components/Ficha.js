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

  // NUEVO: Efecto para calcular y forzar saltos de página solo en las secciones indicadas
  useEffect(() => {
    const handleBeforePrint = () => {
      // Selecciona el contenedor de la ficha
      const fichaElement = document.querySelector('.ficha');
      if (!fichaElement) return;
      // Seleccionamos solo los elementos que nos interesan
      const selectors = '.ficha_OBJETIVO, .ficha_POBLACION, .ficha_MODALIDAD, .ficha_REQUISITOS, .ficha_APOYO, .ficha_manyToOne';
      const sections = fichaElement.querySelectorAll(selectors);

      // Definir el alto de la página y márgenes en píxeles (para tamaño carta: 11in * 96dpi = 1056px)
      const pageHeight = 1056;
      const marginTop = 10;
      const marginBottom = 10;
      const availableHeight = pageHeight - marginTop - marginBottom;

      let currentPageHeight = 0;

      // Recorrer cada sección y aplicar la clase "page-break" si no cabe en el espacio restante
      sections.forEach(section => {
        // Eliminar cualquier clase previa de salto
        section.classList.remove('page-break');
        const sectionHeight = section.offsetHeight;
        if (currentPageHeight + sectionHeight > availableHeight) {
          section.classList.add('page-break');
          currentPageHeight = sectionHeight; // Se inicia una nueva "página"
        } else {
          currentPageHeight += sectionHeight;
        }
      });
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, []);

  // Obtener la ficha actual según el índice
  const fichaActual = textData[indice];

  return (
    <>
      <div className="limitation-overlay"></div>
      <div>
        <Navbar logo={fichaActual.logo || 'default'} />
        <div className='titulo_name'>
          <img src={`${imgBasePath}Recurso 1.png`} alt="Logo 2" className="logo" />
          <div className='nameFicha'>
            <p>
              {fichaActual && fichaActual.titulo ? (
                fichaActual.titulo.split('\n').map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {paragraph}
                  </React.Fragment>
                ))
              ) : (
                "Texto no encontrado"
              )}
            </p>
          </div>
          <img src={`${imgBasePath}Recurso 2.png`} alt="Logo 2" className="logo" />
        </div>
        <div className="ficha">
          <div className='ficha_OBJETIVO'>
            <div className="ficha_titulo">
              <div className="buttonContainer">
                <p className="button">Objetivo</p>
              </div>
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
              <div className="buttonContainer">
                <p className="button">Población Beneficiaria</p>
              </div>
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
              <div className="buttonContainer">
                <p className="button">Modalidad</p>
              </div>
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
              <div className="buttonContainer">
                <p className="button">Requisitos</p>
              </div>
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
              <div className="buttonContainer">
                <p className="button">Características del Apoyo</p>
              </div>
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
          <div className='ficha_manyToOne'>
            <div className='ficha_FECHA'>
              <div className="ficha_titulo">
                <div className="buttonContainer">
                  <p className="button">Periodicidad</p>
                </div>
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
                      ? `${qrs}${fichaActual.titulo.toLowerCase().replace(/\s+/g, ' ')}.png`
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
                <div className="buttonContainer">
                  <p className="button">Contacto</p>
                </div>
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
      </div>
    </>
  );
}

export default Ficha;
