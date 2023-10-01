import WizardContext, { StageState, WizardData, WizardStage, WizardStagesState } from "@/src/context/WizardContext"
import { getCurrentStage } from "@/src/context/WizardContextProvider"
import useWizardContext from "@/src/hooks/useWizardContext"
import React, {useContext} from 'react'

interface Properties {
  isEditing?: boolean
  stage: WizardStage
  previousStage?: WizardStage
}

const CancelButton = ({isEditing, previousStage, stage}: Properties) => {
  const {currentStage, stagesState, setStagesState, completeStage} = useWizardContext(stage)
  const onClick = () => {
    if (isEditing) {
      completeStage()
    } else {
      setStagesState({
        ...stagesState,
        ...(previousStage ? { [previousStage]: StageState.Active } : {}),
        [currentStage]: StageState.Inactive,
      })
    }
  }

  return (
    <button type="button" onClick={onClick}>{isEditing ? 'Cancel' : 'Previous'}</button>
  )
}

export default CancelButton