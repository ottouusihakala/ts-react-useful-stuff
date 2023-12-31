import { useForm } from "react-hook-form"
import SubmitButton from "./SubmitButton"
import { useContext } from "react"
import WizardContext, { StageState, WizardStage } from "@/src/context/WizardContext"
import useWizardContext from "@/src/hooks/useWizardContext"

const WizardIntro = () => {
  const {completeStage} = useWizardContext(WizardStage.First)
  const formMethods = useForm()
  const {handleSubmit} = formMethods
  const onSubmit = () => {
    completeStage({
      [WizardStage.Second]: StageState.Active
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>First Stage - Intro</h1>
      <p>This is a multipart form as a wizard.</p>
      <p>Click on Next to proceed.</p>
      <SubmitButton>Next</SubmitButton>
    </form>
  )
}

export default WizardIntro