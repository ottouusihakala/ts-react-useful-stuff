import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"

const WizardEducation = () => {
  return (
    <form>
      <div>
        <label>Place of Study</label>
        <input type="text" />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton />
    </form>
  )
}

export default WizardEducation