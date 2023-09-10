import React from "react"
import WizardIntro from "../components/wizard/Intro"

export enum WizardStage {
  Intro = 'index',
  PersonalInformation = 'personalInformation',
  Employment = 'employment',
  Education = 'education'
}

export enum StageState {
  Active = 'active',
  Inactive = 'inactive',
  Hidden = 'hidden',
  Done = 'done'
}

export type WizardStagesState = {[StageKey in WizardStage]: StageState}

export const defaultStagesState: WizardStagesState = {
  [WizardStage.Intro]: StageState.Active,
  [WizardStage.PersonalInformation]: StageState.Inactive,
  [WizardStage.Employment]: StageState.Inactive,
  [WizardStage.Education]: StageState.Inactive,
}

export interface PersonalInformation {
  firstNames: string | undefined
  lastName: string
  dateOfBirth: string | undefined
  isEmployed?: boolean
}

interface Address {
  streetAddress: string
  postalCode: string
  postOffice: string
}

interface Employment {
  startDate: string
  endDate?: string
  employer: string
}

interface EmploymentInformation {
  isEmployed?: boolean
  employments?: Employment[]
}

interface Degree {
  title: string
  organisation?: string
  type?: 'highschool' | 'uppersecondary' | 'university' | 'college' | 'vocation'
}

interface Education {
  primarySchool?: boolean
  lowerSecondarySchool?: boolean
  degrees?: Degree[]
}

export interface WizardData {
  personalInformation?: PersonalInformation
  address?: Address
  employment?: EmploymentInformation
  education?: Education
}

interface WizardContextType {
  currentStage: WizardStage
  stagesState: WizardStagesState
  setStagesState: (stagesState: WizardStagesState) => void
  completeStage: (currentStage: WizardStage, followUpStagesState?: Partial<WizardStagesState>) => void
  data: WizardData
  update: (dataUpdate: Partial<WizardData>, followUpStagesState?: Partial<WizardStagesState>) => void
}

const WizardContext = React.createContext<WizardContextType>({
  currentStage: WizardStage.Intro,
  stagesState: defaultStagesState,
  setStagesState: (newStagesState) => {},
  completeStage: () => {},
  data: {},
  update: () => {}
})

export default WizardContext