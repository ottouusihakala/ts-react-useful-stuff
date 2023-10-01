'use client'
import React, {useState} from 'react'
import WizardContext, { StageState, WizardData, WizardStage, WizardStagesState, defaultStagesState } from './WizardContext'

export const getCurrentStage = (stagesState: WizardStagesState): WizardStage => {
  const allActiveStages = Object.entries(stagesState).reduce((activeStages, [stageKey, stageState]) => {
    if (stageState === StageState.Active) {
      activeStages.push(stageKey as WizardStage)
    }
    return activeStages
  }, [] as WizardStage[])
  console.log('getCurrentStageComponent allActiveStages', allActiveStages)
  const firstActive = allActiveStages.shift()
  if (!firstActive) {
    throw new Error('No active stages found!')
  }
  return firstActive
}

const WizardContextProvider = ({children}: {children: React.ReactNode}) => {
  const [stagesState, setInternalStagesState] = useState(defaultStagesState)
  const [data, setInternalData] = useState<WizardData>({})
  const [currentStage, setCurrentStage] = useState(getCurrentStage(stagesState))
  // const completeStage = (currentStage: WizardStage, followUpStagesState?: Partial<WizardStagesState>) => {
  //   setStagesState({
  //     ...stagesState,
  //     ...followUpStagesState,
  //     [currentStage]: StageState.Done
  //   })
  // }
  // const update = (dataUpdate: Partial<WizardData>, followUpStagesState?: Partial<WizardStagesState>) => {
  //   setData({
  //     ...data,
  //     ...dataUpdate,
  //   })
  //   setStagesState({
  //     ...stagesState,
  //     ...followUpStagesState,
  //     [currentStage]: StageState.Done
  //   })
  // }

  const setStagesState = (stagesStateUpdate: Partial<WizardStagesState>) => {
    setInternalStagesState({
      ...stagesState,
      ...stagesStateUpdate,
    })
  }

  const setData = (dataUpdate: Partial<WizardData>) => {
    setInternalData({
      ...data,
      ...dataUpdate,
    })
  }

  return (
    <WizardContext.Provider value={{currentStage, stagesState, data, setCurrentStage, setStagesState, setData}}>
      {children}
    </WizardContext.Provider>
  )
}

export default WizardContextProvider