import { StageState, WizardStage } from "@/src/context/WizardContext"
import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"
import useWizardContext from "@/src/hooks/useWizardContext"
import { useForm } from "react-hook-form"

interface Fields {
  text?: string
}

const WizardFourthForm = () => {
  const stage = WizardStage.Fifth
  const {update, data: { fourthForm }} = useWizardContext(stage)
  const formMethods = useForm<Fields>({mode: 'onBlur'})
  const {register, handleSubmit} = formMethods

  const onSubmit = ({text}: Fields) => {
    update({
      fourthForm: {
        ...fourthForm,
        text
      }
    }, {
      [WizardStage.Sixth]: StageState.Active
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Fifth Stage - Fourth Form</h1>
      <div>
        <label>label</label>
        <input {...register('text')} type="text" />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton stage={WizardStage.Fifth} />
    </form>
  )
}

export default WizardFourthForm