import React from 'react';
import Ficha from './components/Ficha'; // Cambiamos el nombre del componente
import './styles.css'; // Importamos el archivo de estilos

function App() {
    return (
        <div className="container">
            <div className="content">
                <Ficha />

            </div>
        </div>
    );
}

export default App;
