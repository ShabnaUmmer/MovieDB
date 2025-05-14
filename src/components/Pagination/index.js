import React from 'react'
import './index.css'

class Pagination extends React.Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    const {totalPages, apiCallback} = this.props

    const maxVisiblePages = 5
    let startPage
    let endPage

    if (totalPages <= maxVisiblePages) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2)
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1

      if (pageNo <= maxPagesBeforeCurrent) {
        startPage = 1
        endPage = maxVisiblePages
      } else if (pageNo + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1
        endPage = totalPages
      } else {
        startPage = pageNo - maxPagesBeforeCurrent
        endPage = pageNo + maxPagesAfterCurrent
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
          disabled={pageNo === 1}
        >
          Prev
        </button>

        {pages.map(page => (
          <button
            type="button"
            key={page}
            className={`pagination-button ${page === pageNo ? 'active' : ''}`}
            onClick={() =>
              this.setState({pageNo: page}, () => apiCallback(page))
            }
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="pagination-button"
          onClick={this.onNextPage}
          disabled={pageNo === totalPages}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
