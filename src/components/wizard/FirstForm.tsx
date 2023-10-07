import React, {useContext, useEffect, useRef} from 'react'
import SubmitButton from "./SubmitButton"
import WizardContext, { StageState, WizardStage } from '@/src/context/WizardContext'
import {useForm} from 'react-hook-form'
import CancelButton from './CancelButton'
import usePrevious from '@/src/hooks/usePrevious'
import useObservablesContext from '@/src/hooks/useObservableContextValue'
import useWizardContext from '@/src/hooks/useWizardContext'

interface Fields {
  firstNames?: string
  lastName: string
  moveToFourth?: boolean
}

const WizardFirstForm = () => {
  const stage = WizardStage.Second
  const {currentStage, update, data: { firstForm }} = useWizardContext(stage)
  const defaultValues: Fields = {
    ...firstForm,
    firstNames: '',
    lastName: '',
  }
  const formMethods = useForm<Fields>({mode: 'onBlur', defaultValues})
  const {register, handleSubmit, reset} = formMethods
  const prevCurrentStage = usePrevious(currentStage)

  useEffect(() => {
    if (currentStage !== prevCurrentStage) {
      reset(defaultValues)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage, prevCurrentStage, reset])

  const onSubmit = ({firstNames, lastName, moveToFourth}: Fields) => {
    const updatedPersonalInformation: Record<string, string | undefined> = {
      ...firstForm,
      firstNames,
      lastName,
      dateOfBirth: undefined
    }

    update({
      secondForm: updatedPersonalInformation
    }, {
      [WizardStage.Third]: !moveToFourth ? StageState.Active : StageState.Inactive,
      [WizardStage.Fourth]: !!moveToFourth ? StageState.Active : StageState.Inactive
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Second Stage - First Form</h1>
      <div>
        <label>First name</label>
        <input {...register('firstNames', {
          required: true
        })} type="text" />
      </div>
      <div>
        <label>Last name</label>
        <input
          {...register('lastName', {required: true})}
          type="text"
        />
      </div>
      <div>
        <label>Move to Fourth stage</label>
        <input
          {...register('moveToFourth')}
          type="checkbox"
        />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton stage={stage} />
    </form>
  )
}

export default WizardFirstForm