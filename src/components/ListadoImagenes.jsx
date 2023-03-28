import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({resultados}) => {
    return ( 
        <div className='col-12 p-5 row'>
            {resultados.map(resultado => (
                <Imagen
                    key={resultado.id}
                    imagen={resultado}
                />
            ))}
        </div>

     );
}
 
export default ListadoImagenes;