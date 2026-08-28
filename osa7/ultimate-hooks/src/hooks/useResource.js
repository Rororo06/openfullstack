import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    let cancelled = false

    axios.get(baseUrl).then(response => {
      if (!cancelled) {
        setResources(response.data)
      }
    })

    return () => {
      cancelled = true
    }
  }, [baseUrl])

  const create = useCallback(
    async resource => {
      const response = await axios.post(baseUrl, resource)
      setResources(current => current.concat(response.data))
      return response.data
    },
    [baseUrl]
  )

  return [resources, { create }]
}

export default useResource
