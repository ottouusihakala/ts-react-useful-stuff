import { WizardStage } from "@/src/context/WizardContext"
import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"

const WizardFifthForm = () => {
  return (
    <form>
      <div>
        <label>label</label>
        <input type="text" />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton stage={WizardStage.Fifth} />
    </form>
  )
}

export default WizardFifthForm