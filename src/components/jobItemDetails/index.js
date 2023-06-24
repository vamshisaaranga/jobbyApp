import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    jobItemApiStatus: apiConstants.initial,
    similarJobs: [],
    skills: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  onClickFailureRetryButton = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItemApiStatus: apiConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    let jwtToken = Cookies.get('jwt_token')
    jwtToken = JSON.parse(jwtToken)
    jwtToken = jwtToken.jwt_token
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      this.setState({
        jobDetails: formattedData.jobDetails,
        similarJobs: formattedData.similarJobs,
        skills: formattedData.jobDetails.skills,
        jobItemApiStatus: apiConstants.success,
      })
    }
  }

  renderJobItemDetailsSuccess = () => {
    const {jobDetails, skills, similarJobs} = this.state

    const formattedSkills = skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    }))
    const formattedData = {
      id: jobDetails.id,
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      jobDescription: jobDetails.job_description,
      skills: jobDetails.skills,
      title: jobDetails.title,
    }

    const formattedSimilarJobs = similarJobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      id: each.id,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      lifeAtCompany,
      location,
      packagePerAnnum,
      jobDescription,
      rating,
      title,
    } = formattedData
    let lifeAtTheCompany = []
    if (lifeAtCompany !== undefined) {
      lifeAtTheCompany = lifeAtCompany
    }

    return (
      <>
        <div className="jobItemCompanyCardContainer">
          <div className="companyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="jobItemCompanyLogo"
            />
            <div>
              <h1 className="jobItemTitle">{title}</h1>
              <div className="jobItemRatingContainer">
                <AiFillStar className="jobItemStarIcon" />
                <p className="jobItemRating">{rating}</p>
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
            <div className="descriptionUrlAlignment">
              <h1 className="jobItemDescriptionHeading">Description</h1>
              <div className="websiteUrlAlignment">
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="visit"
                >
                  Visit
                </a>
                <BiLinkExternal className="linkIcon" />
              </div>
            </div>
            <p className="jobItemJobDescription">{jobDescription}</p>
          </div>
          <div>
            <h1 className="jobItemDescriptionHeading">Skills</h1>
            <ul className="skillsContainer">
              {formattedSkills.map(each => (
                <li className="skillImageContainer" key={each.name}>
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skillImage"
                  />
                  <h1 className="skillImageName">{each.name}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="lifeAtCompanyContainer">
            <div className="lifeAtCompanyDescriptionContainer">
              <h1 className="jobItemDescriptionHeading">Life at Company</h1>
              <p className="lifeAtCompanyDescription">
                {lifeAtTheCompany.description}
              </p>
            </div>
            <div>
              <img
                src={lifeAtTheCompany.image_url}
                alt="life at company"
                className="lifeAtCompanyImage"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="jobItemDescriptionHeading">Similar Jobs</h1>
          <div className="similarJobsContainer">
            {formattedSimilarJobs.map(each => (
              <li className="similarJobsCardContainer" key={each.id}>
                <div className="companyLogoContainer">
                  <img
                    src={each.companyLogoUrl}
                    alt="company logo"
                    className="jobItemCompanyLogo"
                  />
                  <div>
                    <h1 className="jobItemTitle">{each.title}</h1>
                    <div className="jobItemRatingContainer">
                      <AiFillStar className="jobItemStarIcon" />
                      <p className="jobItemRating">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <p className="similarJobsDescription">{each.jobDescription}</p>
                <div className="locationEmploymentContainer">
                  <div className="jobsLocationContainer">
                    <MdLocationOn className="location-icon" />
                    <p className="jobsListLocation">{each.location}</p>
                  </div>
                  <div className="jobsLocationContainer">
                    <MdLocationOn className="location-icon" />
                    <p className="jobsListLocation">{each.employmentType}</p>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </>
    )
  }

  renderJobItemInProgress = () => (
    <div className="loaderContainer">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobItemFailureView = () => (
    <div className="loaderContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobItemFailureImage"
      />
      <h1 className="jobItemFailureHeading">Oops! Something Went Wrong</h1>
      <p className="jobItemFailureDescription">
        We cannot seen to find the page you are looking for.
      </p>
      <div>
        <button
          type="button"
          className="findJobsButton"
          onClick={this.onClickFailureRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItemApiStatus} = this.state
    switch (jobItemApiStatus) {
      case apiConstants.success:
        return this.renderJobItemDetailsSuccess()
      case apiConstants.progress:
        return this.renderJobItemInProgress()
      case apiConstants.failure:
        return this.renderJobItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobItemBgContainer">
        <div>
          <Header />
        </div>
        {this.renderJobItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
