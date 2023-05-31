import React from 'react'
import './Pagination.scss'


const Pagination = ({ setCurrentPage, currentPage, itemsPerPage, itemsTotal }) => {

  let pagesTotal = Math.ceil(itemsTotal / itemsPerPage);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      <button onClick={() => setCurrentPage(currentPage - 1)} style={{ whiteSpace: "nowrap" }} disabled={currentPage <= 0}>&lt;&lt; Tilbage</button>
      {
        [...Array(pagesTotal)].map((x, i) =>

          //Hvis index og currentPage er ens får button classnamet "btnactive" og ellers null
          <button onClick={() => setCurrentPage(i)} className={i === currentPage ? "btnactive" : null}>{i + 1}</button>
        )
      }

      <button onClick={() => setCurrentPage(currentPage + 1)} style={{ whiteSpace: "nowrap" }} disabled={currentPage >= pagesTotal - 1}>Frem &gt;&gt;</button>
    </div>
  )
}

export default Pagination