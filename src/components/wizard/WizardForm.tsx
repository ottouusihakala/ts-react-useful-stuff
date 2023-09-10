import WizardContext, { StageState, WizardStage, WizardStagesState } from '@/src/context/WizardContext'
import React, {useContext} from 'react'
import WizardIntro from './Intro'
import WizardPersonalInformation from './PersonalInformation'
import WizardEmployment from './Employment'
import WizardEducation from './Education'

const componentsForStages: {[StageKey in WizardStage]: React.FC} = {
  [WizardStage.Intro]: WizardIntro,
  [WizardStage.PersonalInformation]: WizardPersonalInformation,
  [WizardStage.Employment]: WizardEmployment,
  [WizardStage.Education]: WizardEducation
}

const WizardForm = () => {
  const {currentStage} = useContext(WizardContext)
  const ActiveShownStage = componentsForStages[currentStage]
  console.log('ActiveShownStage ', ActiveShownStage)

  return (
    <ActiveShownStage />
  )
}

export default WizardForm