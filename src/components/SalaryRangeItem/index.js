import './index.css'

const SalaryRangeItem = props => {
  const {salaryRange, selectSalary} = props
  const {label, salaryRangeId} = salaryRange

  const clickedSalary = () => {
    selectSalary(salaryRangeId)
  }

  return (
    <li className="employmentItemContainer">
      <input type="radio" id="salaryRadio" onChange={clickedSalary} />
      <label className="employmentItemHeading" htmlFor="salaryRadio">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
