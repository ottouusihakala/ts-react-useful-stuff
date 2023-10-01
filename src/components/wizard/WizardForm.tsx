import WizardContext, { StageState, WizardStage, WizardStagesState } from '@/src/context/WizardContext'
import React, {useContext} from 'react'
import WizardIntro from './Intro'
import WizardFirstForm from './FirstForm'
import WizardSecondForm from './SecondForm'
import WizardThirdForm from './ThirdForm'
import useObservablesContext from '@/src/hooks/useObservableContextValue'
import WizardFourthForm from './FourthForm'
import WizardFifthForm from './FifthForm'

// the stages should flow thus:
// 1 -> 2
// 2 -> 3 or 4
// 3 -> 4, 5 or 6
// 4 -> 4 or 6
// 5 -> 6

const componentsForStages: {[StageKey in WizardStage]: React.FC} = {
  [WizardStage.First]: WizardIntro,
  [WizardStage.Second]: WizardFirstForm,
  [WizardStage.Third]: WizardSecondForm,
  [WizardStage.Fourth]: WizardThirdForm,
  [WizardStage.Fifth]: WizardFourthForm,
  [WizardStage.Sixth]: WizardFifthForm,
}

const WizardForm = () => {
  const {currentStage, data: {firstForm}} = useContext(WizardContext)
  const ActiveShownStage = componentsForStages[currentStage]
  console.log('ActiveShownStage ', ActiveShownStage)
  useObservablesContext(firstForm?.firstNames, () => { console.log('firstNames have changed') })

  return (
    <ActiveShownStage />
  )
}

export default WizardForm