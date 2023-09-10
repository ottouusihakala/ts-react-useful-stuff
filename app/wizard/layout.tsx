'use client'
import WizardContextProvider from "@/src/context/WizardContextProvider";

const WizardLayout = ({children}: {children: React.ReactNode}) => (
  <WizardContextProvider>{children}</WizardContextProvider>
)

export default WizardLayout