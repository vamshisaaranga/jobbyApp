import './index.css'

const EmploymentTypeItem = props => {
  const {employmentType, selectedEmploymentType} = props
  const {label, employmentTypeId} = employmentType

  const clickedOnEmploymentType = () => {
    selectedEmploymentType(employmentTypeId)
  }

  return (
    <div>
      <li className="employmentItemContainer">
        <input
          type="checkbox"
          id="employmentCheckbox"
          onChange={clickedOnEmploymentType}
        />
        <label className="employmentItemHeading" htmlFor="employmentCheckbox">
          {label}
        </label>
      </li>
    </div>
  )
}

export default EmploymentTypeItem
