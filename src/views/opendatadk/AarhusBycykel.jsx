import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import Pagination from '../../components/pagination/Pagination';


const AarhusBycykel = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  useEffect(() => {

    makeRequest("https://admin.opendata.dk/api/3/action/datastore_search?resource_id=0807ae2e-7433-4f73-8b0a-3339ae894eb8")


  }, [])

  return (
    <>
      <h1>Bycykel</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {data && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.result.records.length} />}

      {
        data && data.result.records.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map(c =>
          <article key={c._id}>
            <h2 >{c.place}</h2>
            <p>
              <a href={"https://www.google.com/maps/search/?api=1&query=" + c.lat + "," + c.lng} target='_blank'>se på kort </a>
            </p>

          </article >
        )
      }
    </>
  )
}

export default AarhusBycykel