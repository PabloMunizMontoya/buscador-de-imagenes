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
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

    const respuesta = await fetch(url)
    const resultado = await respuesta.json()

    guardarResultados(resultado.hits)

    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
    guardarTotalPaginas(calcularTotalPaginas)

    const jumbotron = document.querySelector('.jumbotron')
    jumbotron.scrollIntoView({behavior: 'smooth'})
    }

    consultarApi()
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1

    if(nuevaPaginaActual === 0) return

    guardarPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1

    if(nuevaPaginaActual > totalPaginas ) return

    guardarPaginaActual(nuevaPaginaActual)
  }
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

      { (paginaActual === 1) ? null : (
        <button
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior </button>
      )}

      {(paginaActual === totalPaginas) ? null : (
        <button
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button> )
        }
      </div>
    </div>
  );
}

export default App;
