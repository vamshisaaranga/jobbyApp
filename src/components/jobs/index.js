import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobsList from '../JobList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  noProducts: 'NO PRODUCTS',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: '',
    profileApiStatus: apiConstants.initial,
    searchInput: '',
    radioInput: '',
    checkBoxInput: [],
    jobsApiStatus: apiConstants.initial,
    jobsListData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiConstants.progress})
    let jwtToken = Cookies.get('jwt_token')
    jwtToken = JSON.parse(jwtToken)
    jwtToken = jwtToken.jwt_token
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    let data = await response.json()
    data = data.profile_details

    if (response.ok === true) {
      const formattedProfileData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        profile: formattedProfileData,
        profileApiStatus: apiConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiConstants.failure})
    }
  }

  renderProfileOnSuccess = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="profileContainer">
        <img src={profileImageUrl} alt="profile" className="profileImage" />
        <p className="profileName">{name}</p>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  renderProfileOnFailure = () => (
    <div className="noDetailsProfile">
      <button type="button" className="findJobsButton">
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="noDetailsProfile">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiConstants.success:
        return this.renderProfileOnSuccess()
      case apiConstants.failure:
        return this.renderProfileOnFailure()
      case apiConstants.progress:
        return this.renderProfileLoading()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobsDetails)
  }

  getJobsDetails = async () => {
    const {searchInput, checkBoxInput, radioInput} = this.state
    const employmentParams = checkBoxInput.join()
    this.setState({jobsApiStatus: apiConstants.progress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentParams}&minimum_package=${radioInput}&search=${searchInput}`
    let jwtToken = Cookies.get('jwt_token')
    jwtToken = JSON.parse(jwtToken)
    jwtToken = jwtToken.jwt_token
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const jobsList = data.jobs

    if (response.ok === true) {
      if (jobsList.length !== 0) {
        const formattedJobsListData = jobsList.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          packagePerAnnum: each.package_per_annum,
          location: each.location,
          rating: each.rating,
          title: each.title,
        }))
        this.setState({
          jobsListData: formattedJobsListData,
          jobsApiStatus: apiConstants.success,
        })
      } else {
        this.setState({jobsApiStatus: apiConstants.noProducts})
      }
    } else {
      this.setState({jobsApiStatus: apiConstants.failure})
    }
  }

  renderJobDetailsOnSuccess = () => {
    const {jobsListData} = this.state
    return (
      <ul>
        {jobsListData.map(each => (
          <JobsList key={each.id} jobsList={each} />
        ))}
      </ul>
    )
  }

  renderJobDetailsInProgress = () => (
    <div className="noDetailsJobList">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderJobDetailsFailure = () => (
    <div className="noDetailsJobList">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
      />
    </div>
  )

  renderNoProducts = () => (
    <div className="loaderContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="jobItemFailureHeading">No Jobs Found</h1>
      <p className="jobItemFailureDescription">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobDetails = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiConstants.success:
        return this.renderJobDetailsOnSuccess()
      case apiConstants.progress:
        return this.renderJobDetailsInProgress()
      case apiConstants.failure:
        return this.renderJobDetailsFailure()
      case apiConstants.noProducts:
        return this.renderNoProducts()
      default:
        return null
    }
  }

  selectedEmploymentTypes = id => {
    const {checkBoxInput} = this.state
    if (!checkBoxInput.includes(id)) {
      this.setState(
        prevState => ({checkBoxInput: [...prevState.checkBoxInput, id]}),
        this.getJobsDetails,
      )
    }
  }

  selectedSalary = id => {
    this.setState({radioInput: id}, this.getJobsDetails)
  }

  render() {
    return (
      <div className="jobsContainer">
        <div>
          <Header />
        </div>
        <div className="jobsAlignment">
          <div className="profileAndFiltersContainer">
            <div className="searchInputContainerSm">
              <input
                type="Search"
                placeholder="search"
                className="searchInput"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="searchButton"
                onClick={this.clickSearchIcon}
              >
                <BsSearch className="searchIcon" />
              </button>
            </div>
            <div>{this.renderProfile()}</div>
            <hr className="horizontalLine" />
            <div>
              <p className="employmentHeading">Types of Employment</p>
              <ul>
                {employmentTypesList.map(each => (
                  <EmploymentTypeItem
                    key={each.employmentTypeId}
                    employmentType={each}
                    selectedEmploymentType={this.selectedEmploymentTypes}
                  />
                ))}
              </ul>
            </div>
            <hr className="horizontalLine" />
            <div>
              <p className="employmentHeading">Salary Range</p>
              <ul>
                {salaryRangesList.map(each => (
                  <SalaryRangeItem
                    key={each.salaryRangeId}
                    salaryRange={each}
                    selectSalary={this.selectedSalary}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="searchInputContainerLg">
              <input
                type="Search"
                placeholder="search"
                className="searchInput"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="searchButton"
                onClick={this.clickSearchIcon}
              >
                <BsSearch className="searchIcon" />
              </button>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
