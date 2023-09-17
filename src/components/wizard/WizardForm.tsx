import WizardContext, { StageState, WizardStage, WizardStagesState } from '@/src/context/WizardContext'
import React, {useContext} from 'react'
import WizardIntro from './Intro'
import WizardPersonalInformation from './PersonalInformation'
import WizardEmployment from './Employment'
import WizardEducation from './Education'
import useObservablesContext from '@/src/hooks/useObservableContextValue'

const componentsForStages: {[StageKey in WizardStage]: React.FC} = {
  [WizardStage.Intro]: WizardIntro,
  [WizardStage.PersonalInformation]: WizardPersonalInformation,
  [WizardStage.Employment]: WizardEmployment,
  [WizardStage.Education]: WizardEducation
}

const WizardForm = () => {
  const {currentStage, data: {personalInformation}} = useContext(WizardContext)
  const ActiveShownStage = componentsForStages[currentStage]
  console.log('ActiveShownStage ', ActiveShownStage)
  useObservablesContext(personalInformation?.firstNames, () => { console.log('firstNames have changed') })

  return (
    <ActiveShownStage />
  )
}

export default WizardForm