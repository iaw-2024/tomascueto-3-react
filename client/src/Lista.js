import './Titulo.css';
import React, {useEffect, useState} from 'react'



function Lista() {
    const [datos, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/json');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            setError(error);
        }
        };

        fetchData();
    }, []); // Esto asegura que el efecto se ejecute solo una vez al montar el componente

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!datos) {
        return <div>Cargando...</div>;
    }
    
    return(
        <div className="row">
        <div className="col-lg-8 mx-auto" id="list-container">
            <ul className="list-group shadow">
                {datos.map((item, index) => (
                    <li className="list-group-item" key={index}>
                        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                            <div className="media-body order-2 order-lg-1">
                                <h5 className="mt-0 font-weight-bold mb-2">{item.nombre}</h5>
                                <p className="font-italic text-muted mb-0 small">{item.genero}</p>
                                <div className="d-flex align-items-center justify-content-between mt-1"></div>
                                <h6 className="font-weight-bold my-2">{item.empresa}</h6>
                                <img src={item.imagen} alt="Imagen de item.nombre" width="200" className="float-end order-1 order-lg-2" />
                            </div>
                        </div>
                    </li>
                 ))}
            </ul>
        </div>
    </div>
    )
}


export default Lista;
