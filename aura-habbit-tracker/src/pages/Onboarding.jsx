import { useState } from "react";
import onboardingData from "../data/onboardingData";
import OnboardingLayout from "./components/OnboardingLayout";

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  const currentData = onboardingData[currentStep - 1];

  function handleNext() {
    if (currentStep < onboardingData.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to the dashboard after onboarding
      console.log("Onboarding completed");
    }
  }

  function handlePrevious() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <OnboardingLayout
      step={currentData.id}
      title={currentData.title}
      description={currentData.description}
      options={currentData.options}
      buttonText={currentData.buttonText}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}

export default Onboarding;