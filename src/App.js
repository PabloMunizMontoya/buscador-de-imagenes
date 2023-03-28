import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario';



function App() {

  const [busqueda,guardarBusqueda] = useState('')

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return

    const imagenesPorPagina=30
    const key = '34703769-fed4de6320af82b8990d04887'
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`

    const respuesta = await fetch(url)
    const resultado = await respuesta.json()

    console.log(resultado.hits)
    }

    consultarApi()
  }, [busqueda])

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de imágenes</p>

        <Formulario 
          guardarBusqueda= {guardarBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
