import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';



function App() {

  const [busqueda,guardarBusqueda] = useState('')
  const [resultados, guardarResultados] = useState([])
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [ totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return

    const imagenesPorPagina=30
    const key = '34703769-fed4de6320af82b8990d04887'
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`

    const respuesta = await fetch(url)
    const resultado = await respuesta.json()

    guardarResultados(resultado.hits)

    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
    guardarTotalPaginas(calcularTotalPaginas)
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
      <div className='row justify-content-center'>
        <ListadoImagenes
          resultados = {resultados}
        />
      </div>
    </div>
  );
}

export default App;
