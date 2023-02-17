import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.length < 3) {
      setError('Debes ingresar al menos 3 caracteres')
      return
    }

    if (search.match(/^[0-9]+$/)) {
      setError('No se puede buscar películas con solo números')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
