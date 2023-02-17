import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import './App.css'
import { useSearch } from './hooks/useSearch.js'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const { search, setSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => getMovies({ search }), 300), [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(e.target.value)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <hr />
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: error ? '1px solid red' : '1px transparent' }}
            value={search} onChange={handleChange} type='text' placeholder='Avengers, Star Wars, Matrix'
          />
          <input type='checkbox' onChange={handleSort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>

    </div>
  )
}

export default App
