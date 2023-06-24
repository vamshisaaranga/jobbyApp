import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="lgNavContainer">
        <nav>
          <ul className="homeNavContainer">
            <li>
              <Link to="/" className="navLink">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                  alt="website logo"
                  className="homeWebsiteLogo"
                />
              </Link>
            </li>
            <div className="homeJobsContainer">
              <li className="homePara">
                <Link to="/" className="navLink">
                  Home
                </Link>
              </li>
              <li className="homePara">
                <Link to="/jobs" className="navLink">
                  Jobs
                </Link>
              </li>
            </div>

            <button
              type="button"
              className="logoutButton"
              onClick={logoutButton}
            >
              Logout
            </button>
          </ul>
        </nav>
      </div>
      <div className="smNavContainer">
        <nav className="homeNavContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="homeWebsiteLogo"
          />
          <div>
            <AiFillHome className="navIcon" />
            <BsFillBagFill className="navIcon" />
            <FiLogOut className="navIcon" onClick={logoutButton} />
          </div>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Header)
