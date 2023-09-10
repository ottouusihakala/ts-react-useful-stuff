import WizardContext, { StageState, WizardData, WizardStage, WizardStagesState } from "@/src/context/WizardContext"
import React, {useContext} from 'react'

interface Properties {
  isEditing?: boolean
}

const getPreviousStage = (currentStage: WizardStage, stagesState: WizardStagesState, data: WizardData): WizardStage => {
  const stagesStateAsArray = Object.entries(stagesState) as [WizardStage, StageState][]
  const currentStageIndex = stagesStateAsArray.findIndex(([stageKey]) => stageKey === currentStage)
  const [previousStage] = stagesStateAsArray[currentStageIndex - 1]
  if (currentStage === WizardStage.Education && !data.personalInformation?.isEmployed) {
    return WizardStage.PersonalInformation
  }
  return previousStage
} 

const CancelButton = ({isEditing}: Properties) => {
  const {currentStage, stagesState, setStagesState, completeStage, data} = useContext(WizardContext)
  const onClick = () => {
    if (isEditing) {
      completeStage(currentStage)
    } else {
      const previousStage = getPreviousStage(currentStage, stagesState, data)
      setStagesState({
        ...stagesState,
        [previousStage]: StageState.Active,
        [currentStage]: StageState.Inactive,
      })
    }
  }

  return (
    <button type="button" onClick={onClick}>{isEditing ? 'Cancel' : 'Previous'}</button>
  )
}

export default CancelButton