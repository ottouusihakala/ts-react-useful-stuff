import { StageState, WizardStage } from "@/src/context/WizardContext"
import CancelButton from "./CancelButton"
import SubmitButton from "./SubmitButton"
import { useForm } from "react-hook-form"
import useWizardContext from "@/src/hooks/useWizardContext"

interface Fields {
  text?: string
  nextStage?: WizardStage.Fourth | WizardStage.Fifth | WizardStage.Sixth
}

const WizardSecondForm = () => {
  const stage = WizardStage.Third
  const {update, data: { secondForm }} = useWizardContext(stage)
  const formMethods = useForm<Fields>({mode: 'onBlur'})
  const {register, handleSubmit} = formMethods

  const onSubmit = ({text, nextStage}: Fields) => {
    if (!nextStage) {
      throw new Error('No next stage defined')
    }

    update({
      secondForm: { ...secondForm, text }
    }, {
      [nextStage]: StageState.Active
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Third Stage - Second Form</h1>
      <div>
        <label>label</label>
        <input {...register('text')} type="text" />
      </div>
      <fieldset>
        <legend>Next stage</legend>
        <div>
          <input {...register('nextStage', {required: true})} required value={WizardStage.Fourth} id="nextStageFourth" type="radio" />
          <label htmlFor="nextStageFourth">Third Form</label>
        </div>
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
      <CancelButton stage={WizardStage.Third} />
    </form>
  )
}

export default WizardSecondForm