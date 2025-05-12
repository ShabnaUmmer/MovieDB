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
      <div className="pagination" data-testid="pagination">
        <button
          type="button"
          onClick={this.handlePrevClick}
          disabled={currentPage === 1}
          className="pagination-button"
          data-testid="prev-button"
          aria-label="Previous page"
        >
          Prev
        </button>

        {pages.map(page => (
          <button
            key={page}
            onClick={() => this.handlePageClick(page)}
            className={`pagination-button ${
              page === currentPage ? 'active' : ''
            }`}
            data-testid={`page-${page}`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : null}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={this.handleNextClick}
          disabled={currentPage === totalPages}
          className="pagination-button"
          data-testid="next-button"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
