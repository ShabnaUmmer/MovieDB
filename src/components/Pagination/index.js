import {Component} from 'react'

import './index.css'

class Pagination extends Component {
  handlePrevClick = () => {
    const {currentPage, onPageChange} = this.props
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  handleNextClick = () => {
    const {onPageChange, currentPage, totalPages} = this.props

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  handlePageClick = page => {
    const {onPageChange} = this.props
    onPageChange(page)
  }

  render() {
    const {currentPage, totalPages} = this.props
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
      <div className="pagination">
        <button
          type="button"
          onClick={this.handlePrevClick}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>

        {startPage > 1 && (
          <>
            <button
              type="button"
              onClick={() => this.handlePageClick(1)}
              className="pagination-button"
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pages.map(page => (
          <button
            type="button"
            key={page}
            onClick={() => this.handlePageClick(page)}
            className={`pagination-button ${
              currentPage === page ? 'active' : ''
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            <button
              type="button"
              onClick={() => this.handlePageClick(totalPages)}
              className="pagination-button"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={this.handleNextClick}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
