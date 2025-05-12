import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {API_KEY, API_BASE_URL} from '../../config'

import './index.css'

class SearchedMovies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: true,
    error: null,
    searchQuery: '',
  }

  componentDidMount() {
    this.parseSearchQueryAndFetch()
  }

  componentDidUpdate(prevProps) {
    const {
      location: {search: prevSearch},
    } = prevProps
    const {
      location: {search: currentSearch},
    } = this.props

    if (prevSearch !== currentSearch) {
      this.parseSearchQueryAndFetch()
    }
  }

  parseSearchQueryAndFetch = () => {
    const {
      location: {search},
    } = this.props

    if (!search) {
      this.setState({
        searchQuery: '',
        movies: [],
        loading: false,
      })
      return
    }

    const searchParams = new URLSearchParams(search)
    const query = searchParams.get('query') || ''

    this.setState(
      {
        searchQuery: query,
        currentPage: 1,
        loading: true,
      },
      () => {
        this.fetchSearchedMovies(1)
      },
    )
  }

  fetchSearchedMovies = async page => {
    const {searchQuery} = this.state
    if (!searchQuery.trim()) return

    this.setState({loading: true, error: null})
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          searchQuery,
        )}&page=${page}`,
      )
      const data = await response.json()
      this.setState({
        movies: data.results,
        currentPage: data.page,
        totalPages: data.total_pages > 500 ? 500 : data.total_pages,
        loading: false,
      })
    } catch (error) {
      this.setState({error: error.message, loading: false})
    }
  }

  handlePageChange = page => {
    this.fetchSearchedMovies(page)
  }

  render() {
    const {
      movies,
      currentPage,
      totalPages,
      loading,
      error,
      searchQuery,
    } = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} />
        </div>
      )
    }
    if (error) return <div className="error">Error: {error}</div>

    return (
      <div className="sp-movies-page">
        <h1 className="sp-page-title">Search Results for "{searchQuery}"</h1>
        {movies.length === 0 ? (
          <div className="no-results">
            No movies found matching your search.
          </div>
        ) : (
          <>
            <div className="sp-movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            )}
          </>
        )}
      </div>
    )
  }
}

export default withRouter(SearchedMovies)
