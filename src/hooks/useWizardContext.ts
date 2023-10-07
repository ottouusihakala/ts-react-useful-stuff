import {useContext, useState, useEffect} from 'react'
import WizardContext, { StageState, WizardData, WizardStage, WizardStagesState, defaultStagesState } from '../context/WizardContext'
import { getCurrentStage } from '../context/WizardContextProvider'
import usePrevious from './usePrevious'

const useWizardContext = (stage: WizardStage) => {
  const {stagesState, currentStage: currentInternalStage, setCurrentStage, setStagesState} = useContext(WizardContext)
  const [data, setData] = useState<WizardData>({})
  const previousStage = usePrevious(currentInternalStage)
  const completeStage = (followUpStagesState?: Partial<WizardStagesState>) => {
    setStagesState({
      ...stagesState,
      [stage]: StageState.Done,
      ...followUpStagesState,
    })
  }
  const update = (dataUpdate: Partial<WizardData>, followUpStagesState?: Partial<WizardStagesState>) => {
    setData(dataUpdate)
    const newSubstageState = {
      ...stagesState,
      [stage]: StageState.Done,
      ...followUpStagesState,
    }
    setStagesState(newSubstageState)
  }

  useEffect(() => {
    const currentStage = getCurrentStage(stagesState)
    if (currentStage !== previousStage) {
      setCurrentStage(currentStage)
    }
  }, [previousStage, setCurrentStage, stagesState])

  return {completeStage, update, currentStage: currentInternalStage, stagesState, data, setStagesState}
}

export default useWizardContext