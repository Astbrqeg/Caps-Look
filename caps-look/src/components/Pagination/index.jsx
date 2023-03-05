import React from 'react'
import Style from './style.module.scss'
import ReactPaginate from 'react-paginate'

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage
}) => {
  let pages = []
  const nPages = Math.ceil(totalPosts / postsPerPage)
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className={Style.pagination}>
      <button onClick={prevPage}> Previous </button>

      {pages.map((number) => (
        <button key={number} className="page-item">
          <button
            onClick={() => setCurrentPage(number)}
            href={number}
            className={Style.pagelink}
          >
            {number}
          </button>
        </button>
      ))}

      <button onClick={nextPage}> Next </button>
    </div>
  )
}

export default Pagination
