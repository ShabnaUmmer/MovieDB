import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaArrowLeft, FaPlay, FaTimes} from 'react-icons/fa'
import {
  API_KEY,
  API_BASE_URL,
  IMAGE_BASE_URL,
  PROFILE_SIZE,
  POSTER_SIZE,
} from '../../config'

import './index.css'

class MovieDetails extends Component {
  state = {
    movie: null,
    cast: [],
    trailerKey: null,
    showTrailer: false,
    loading: true,
    error: null,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.fetchMovieDetails(id)
    this.fetchMovieCast(id)
    this.fetchMovieVideos(id)
  }

  fetchMovieDetails = id => {
    fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        this.setState({movie: data})
      })
      .catch(error => {
        this.setState({error: error.message})
      })
  }

  fetchMovieCast = id => {
    fetch(
      `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          cast: data.cast.slice(0, 10).filter(person => person.profile_path),
          loading: false,
        })
      })
      .catch(error => {
        this.setState({error: error.message, loading: false})
      })
  }

  fetchMovieVideos = id => {
    fetch(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        const trailer = data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube',
        )
        if (trailer) {
          this.setState({trailerKey: trailer.key})
        }
      })
      .catch(() => {
        this.setState({trailerKey: null})
      })
  }

  openTrailer = () => {
    this.setState({showTrailer: true})
  }

  closeTrailer = () => {
    this.setState({showTrailer: false})
  }

  render() {
    const {movie, cast, trailerKey, showTrailer, loading, error} = this.state

    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">Error: {error}</div>
    if (!movie) return null

    return (
      <div className="movie-details-page">
        <Link to="/" className="back-button">
          <FaArrowLeft />
          <span>Back to Movies</span>
        </Link>

        <div className="movie-backdrop">
          <div className="backdrop-overlay">
            <div className="movie-poster-container">
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Poster'
                }
                alt={movie.title}
                className="md-movie-poster"
              />
              <div className="movie-header">
                <h1 className="md-movie-title">{movie.title}</h1>
                <div className="genres">
                  {movie.genres.map(genre => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="release-date">
                  Release Date:{' '}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="runtime">
                  Runtime: {Math.floor(movie.runtime / 60)}hrs{' '}
                  {String(movie.runtime % 60).padStart(2, '0')}min
                </p>
                <div className="movie-meta">
                  <span className="rating">
                    <span className="rating-star">★</span>
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>

                {trailerKey && (
                  <button
                    type="button"
                    className="trailer-button"
                    onClick={this.openTrailer}
                  >
                    <FaPlay />
                    <span>Watch Trailer</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-content">
          <section className="movie-overview-container">
            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </section>
          <section className="movie-cast">
            <h2>Cast</h2>
            <div className="cast-grid">
              {cast.map(person => {
                const imageUrl = person.profile_path
                  ? `${IMAGE_BASE_URL}${PROFILE_SIZE}${person.profile_path}`
                  : 'https://via.placeholder.com/150x225?text=No+Image'

                return (
                  <div key={person.id} className="cast-card">
                    <img
                      src={imageUrl}
                      alt={person.name}
                      className="cast-image"
                      onError={e => {
                        e.target.onerror = null
                        e.target.src =
                          'https://via.placeholder.com/150x225?text=No+Image'
                      }}
                      loading="lazy"
                    />
                    <div className="cast-info">
                      <h3>{person.name}</h3>
                      <p>{person.character || 'Unknown'}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {showTrailer && trailerKey && (
          <div className="trailer-modal-overlay" onClick={this.closeTrailer}>
            <div
              className="trailer-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="close-trailer-button"
                onClick={this.closeTrailer}
                aria-label="Close trailer"
              >
                <FaTimes />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MovieDetails
