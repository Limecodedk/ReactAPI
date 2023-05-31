import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const useRequestData = () => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  const makeRequest = async (url, headers = null, params = null) => {

    setIsLoading(true); // Der loades = afventer svar fra api

    try {
      let response = await axios.get(url, { headers: headers, params: params })
      setData(response.data)
      setError()

    } catch (error) {

      setError("Der er opstået en fejl:" + error)


    } finally {
      setIsLoading(false)
    }

  }


  return (
    { data, isLoading, error, makeRequest }
  )
}

export default useRequestData