import React from "react"
import WizardIntro from "../components/wizard/Intro"

export enum WizardStage {
  First = 'first',
  Second = 'second',
  Third = 'third',
  Fourth = 'fourth',
  Fifth = 'fifth',
  Sixth = 'sixth'
}

export enum StageState {
  Active = 'active',
  Inactive = 'inactive',
  Hidden = 'hidden',
  Done = 'done'
}

export type WizardStagesState = {[StageKey in WizardStage]: StageState}

export const defaultStagesState: WizardStagesState = {
  [WizardStage.First]: StageState.Active,
  [WizardStage.Second]: StageState.Inactive,
  [WizardStage.Third]: StageState.Inactive,
  [WizardStage.Fourth]: StageState.Inactive,
  [WizardStage.Fifth]: StageState.Inactive,
  [WizardStage.Sixth]: StageState.Inactive,
}

export interface WizardData {
  firstForm?: Record<string, string | undefined>
  secondForm?: Record<string, string | undefined>
  thirdForm?: Record<string, string | undefined>
  fourthForm?: Record<string, string | undefined>
  fifthForm?: Record<string, string | undefined>
  sixthForm?: Record<string, string | undefined>
}

interface WizardContextType {
  currentStage: WizardStage
  stagesState: WizardStagesState
  data: WizardData
  setCurrentStage: (stage: WizardStage) => void
  setStagesState: (stagesStateUpdate: Partial<WizardStagesState>) => void
  setData: (dataUpdate: Partial<WizardData>) => void
}

const WizardContext = React.createContext<WizardContextType>({
  currentStage: WizardStage.First,
  stagesState: defaultStagesState,
  data: {},
  setCurrentStage: (stage: WizardStage) => {},
  setStagesState: (stagesStateUpdate: Partial<WizardStagesState>) => {},
  setData: (dataUpdate: Partial<WizardData>) => {}
})

export default WizardContext