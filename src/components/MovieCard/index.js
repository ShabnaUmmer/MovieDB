import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IMAGE_BASE_URL, POSTER_SIZE} from '../../config'
import './index.css'

class MovieCard extends Component {
  render() {
    const {movie} = this.props
    return (
      <div className="movie-card">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Poster'
          }
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <div className="movie-rating">
            <span className="rating-star">★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <h3 className="movie-title">{movie.title}</h3>

          <Link to={`/movie/${movie.id}`} className="view-details-btn">
            <button className="vd-btn">View Details</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieCard)
