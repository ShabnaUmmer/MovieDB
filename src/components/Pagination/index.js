import React from 'react'
import './index.css'

class Pagination extends React.Component {
  onNextPage = () => {
    const {apiCallback, totalPages, currentPage} = this.props
    if (currentPage < totalPages) {
      apiCallback(currentPage + 1)
    }
  }

  onPrevPage = () => {
    const {apiCallback, currentPage} = this.props
    if (currentPage > 1) {
      apiCallback(currentPage - 1)
    }
  }

  render() {
    const {totalPages, currentPage, apiCallback} = this.props

    const maxVisiblePages = 5
    let startPage
    let endPage

    if (totalPages <= maxVisiblePages) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2)
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1
        endPage = maxVisiblePages
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1
        endPage = totalPages
      } else {
        startPage = currentPage - maxPagesBeforeCurrent
        endPage = currentPage + maxPagesAfterCurrent
      }
    }

    const pages = Array.from(
      {length: endPage - startPage + 1},
      (_, i) => startPage + i,
    )

    return (
      <div className="mb-3 pagination">
        <button
          type="button"
          className="pagination-button"
          onClick={this.onPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pages.map(page => (
          <button
            type="button"
            key={page}
            className={`pagination-button ${
              page === currentPage ? 'active' : ''
            }`}
            onClick={() => apiCallback(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="pagination-button"
          onClick={this.onNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
