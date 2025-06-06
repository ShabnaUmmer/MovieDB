import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import {API_KEY, API_BASE_URL} from '../../config'

import './index.css'

class PopularMovies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchPopularMovies(1)
  }

  fetchPopularMovies = async page => {
    this.setState({loading: true, error: null})
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
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

  handlePageChange = pageNo => {
    this.setState({currentPage: pageNo})
    this.fetchPopularMovies(pageNo)
  }

  render() {
    const {movies, currentPage, totalPages, loading, error} = this.state

    if (loading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} />
        </div>
      )
    }
    if (error) return <div className="error">Error: {error}</div>

    return (
      <div className="movies-page">
        <h1 className="page-title">Popular</h1>
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            apiCallback={this.handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
    )
  }
}

export default PopularMovies
