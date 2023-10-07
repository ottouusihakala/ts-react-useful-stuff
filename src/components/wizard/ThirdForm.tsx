import { StageState, WizardStage } from "@/src/context/WizardContext"
import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"
import useWizardContext from "@/src/hooks/useWizardContext"
import { useForm } from "react-hook-form"

interface Fields {
  text?: string
  nextStage?: WizardStage.Fifth | WizardStage.Sixth
}

const WizardThirdForm = () => {
  const stage = WizardStage.Fourth
  const {update, data: { thirdForm }} = useWizardContext(stage)
  const formMethods = useForm<Fields>({mode: 'onBlur'})
  const {register, handleSubmit} = formMethods

  const onSubmit = ({text, nextStage}: Fields) => {
    if (!nextStage) {
      throw new Error('No next stage defined')
    }

    update({
      thirdForm: { ...thirdForm, text }
    }, {
      [nextStage]: StageState.Active
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Fourth Stage - Third Form</h1>
      <div>
        <label>label</label>
        <input {...register('text')} type="text" />
      </div>
      <fieldset>
        <legend>Next stage</legend>
        <div>
          <input {...register('nextStage', {required: true})} required value={WizardStage.Fifth} id="nextStageFifth" type="radio" />
          <label htmlFor="nextStageFifth">Fourth Form</label>
        </div>
        <div>
          <input {...register('nextStage', {required: true})} required value={WizardStage.Sixth} id="nextStageSixth" type="radio" />
          <label htmlFor="nextStageSixth">Fifth Form</label>
        </div>
      </fieldset>
      <SubmitButton>Next</SubmitButton>
      <CancelButton stage={WizardStage.Fourth} />
    </form>
  )
}

export default WizardThirdForm