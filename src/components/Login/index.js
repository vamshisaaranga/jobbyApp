import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data, {expires: 30, path: '/'})
    history.replace('/')
  }

  onResponseFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmit = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onResponseFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="pageContainer">
        <div className="loginCardContainer">
          <div className="websiteLogoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="userNameInput" className="userName">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="userNameInput"
              className="inputElement"
              onChange={this.onChangeUserName}
              value={username}
            />
            <br />
            <label htmlFor="userPasswordInput" className="userName">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="userPasswordInput"
              className="inputElement"
              onChange={this.onChangePassword}
              value={password}
            />
            <div className="loginButtonContainer">
              <button type="submit" className="loginButton">
                Login
              </button>
            </div>
            {showSubmitError && <p className="errorMessage">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
