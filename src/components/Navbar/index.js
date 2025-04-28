import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Navbar extends Component {
  state = {
    searchQuery: '',
  }

  handleSearchChange = event => {
    this.setState({searchQuery: event.target.value})
    const {history} = this.props
    if (event.target.value.trim() === '') {
      history.push('/')
    }
  }

  handleSearchSubmit = e => {
    e.preventDefault()
    const {searchQuery} = this.state
    const {history} = this.props
    if (searchQuery.trim()) {
      history.push(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  render() {
    const {searchQuery} = this.state
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <h1 data-testid="heading">movieDB</h1>
          </Link>
          <ul className="navbar-links">
            <li>
              <Link to="/" className="navbar-link">
                <h2 data-testid="popular">Popular</h2>
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="navbar-link">
                <h2 data-testid="top-rated">Top Rated</h2>
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="navbar-link">
                <h2 data-testid="upcoming">Upcoming</h2>
              </Link>
            </li>
          </ul>
          <form onSubmit={this.handleSearchSubmit} className="navbar-search">
            <input
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={this.handleSearchChange}
              className="search-input"
            />
            <button
              type="submit"
              className="search-button"
              data-testid="search-button"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
