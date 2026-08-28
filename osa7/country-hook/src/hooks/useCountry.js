import axios from 'axios'
import { useEffect, useState } from 'react'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    let cancelled = false

    axios
      .get(`${baseUrl}/${name}`)
      .then(response => {
        if (!cancelled) {
          setCountry({ found: true, data: response.data })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCountry({ found: false })
        }
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return country
}

export default useCountry
