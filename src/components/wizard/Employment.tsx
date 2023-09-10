import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"

const WizardEmployment = () => {
  return (
    <form>
      <div>
        <label>Employer Name</label>
        <input type="text" />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton />
    </form>
  )
}

export default WizardEmployment