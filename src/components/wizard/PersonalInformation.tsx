import React, {useContext, useEffect, useRef} from 'react'
import SubmitButton from "./SubmitButton"
import WizardContext, { PersonalInformation, StageState, WizardStage } from '@/src/context/WizardContext'
import {useForm} from 'react-hook-form'
import CancelButton from './CancelButton'
import usePrevious from '@/src/hooks/usePrevious'
import useObservablesContext from '@/src/hooks/useObservableContextValue'

interface Fields {
  firstNames?: string
  lastName: string
  isEmployed?: boolean
}

const WizardPersonalInformation = () => {
  const {currentStage, update, data: { personalInformation }} = useContext(WizardContext)
  const defaultValues: Fields = {
    ...personalInformation,
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

  const onSubmit = ({firstNames, lastName, isEmployed}: Fields) => {
    const updatedPersonalInformation: PersonalInformation = {
      ...personalInformation,
      firstNames,
      lastName,
      isEmployed,
      dateOfBirth: undefined
    }

    console.log('submit')

    update({
      personalInformation: updatedPersonalInformation
    }, {
      [WizardStage.Employment]: isEmployed ? StageState.Active : StageState.Hidden,
      [WizardStage.Education]: isEmployed ? StageState.Inactive : StageState.Active,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label>Are you employed at the moment?</label>
        <input 
          {...register('isEmployed')}
          type="checkbox"
        />
      </div>
      <SubmitButton>Next</SubmitButton>
      <CancelButton />
    </form>
  )
}

export default WizardPersonalInformation