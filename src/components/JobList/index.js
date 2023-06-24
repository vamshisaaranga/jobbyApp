import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobsList = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobsList

  return (
    <div>
      <Link to={`/jobs/${id}`} className="navLink">
        <li className="jobListCardContainer">
          <div className="companyLogoContainer">
            <div>
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="jobListLogo"
              />
            </div>
            <div className="titleRatingContainer">
              <h1 className="jobListTitle">{title}</h1>
              <div className="ratingContainer">
                <AiFillStar className="starIcon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="packageContainer">
            <div className="locationEmploymentContainer">
              <div className="jobsLocationContainer">
                <MdLocationOn className="location-icon" />
                <p className="jobsListLocation">{location}</p>
              </div>
              <div className="jobsLocationContainer">
                <MdLocationOn className="location-icon" />
                <p className="jobsListLocation">{employmentType}</p>
              </div>
            </div>
            <p className="jobsListPackage">{packagePerAnnum}</p>
          </div>
          <hr className="jobListHorizontalLine" />
          <div>
            <h1 className="descriptionHeading">Description</h1>
            <p className="jobDescription">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default JobsList
