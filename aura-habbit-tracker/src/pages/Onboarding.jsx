import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import onboardingData from "../data/onboardingData";
import OnboardingLayout from "./components/OnboardingLayout";
import { setGoal, setTargetHabitCount, setPreferredReminderTime } from "../redux/onboardingSlice";
import { submitOnboarding } from "../services/onboarding";

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onboarding = useSelector(
    (state) => state.onboarding
  )

  const currentData = onboardingData[currentStep - 1];


  function handleOptionSelect(option) {

    if (currentStep === 1) {
      dispatch(setGoal(option));
    }

    if (currentStep === 2) {
      dispatch(setTargetHabitCount(option));
    }
  }


  function handleNext() {

    if (currentStep < onboardingData.length) {
      setCurrentStep(currentStep + 1);
    }
  }


  function handlePrevious() {

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleReminderTime(time) {

    dispatch(setPreferredReminderTime(time));

  }


  // async function handleContinue() {

  //     try {

  //         const goals = [onboarding.goal];

  //         const targetHabitCount =
  //             onboarding.targetHabitCount === "1-3"
  //                 ? "FOCUSED_1_3"
  //                 : onboarding.targetHabitCount === "4-6"
  //                     ? "FOCUSED_4_6"
  //                     : "FOCUSED_7_PLUS";


  //         const [hour, minute] = onboarding.preferredReminderTime.split(":");


  //         const preferredReminderTime = {
  //             hour: Number(hour),
  //             minute: Number(minute),
  //             second: 0,
  //             nano: 0
  //         };


  //         const data = await submitOnboarding(
  //             goals,
  //             targetHabitCount,
  //             preferredReminderTime
  //         );


  //         console.log("Onboarding API response:", data);

  //         navigate("/home");

  //     } catch (error) {

  //         console.error(error);

  //     }
  // }

  async function handleContinue() {

    try {

      const goals = [onboarding.goal];

      const targetHabitCount =
        onboarding.targetHabitCount === "1-3"
          ? "FOCUSED_1_3"
          : onboarding.targetHabitCount === "4-6"
            ? "BALANCED_4_6"
            : "MASTERY_7_PLUS";


      const [hour, minute] = onboarding.preferredReminderTime.split(":");

      const preferredReminderTime = {hour: Number(hour),minute: Number(minute),second: 0,nano: 0};

      const data = await submitOnboarding(goals,targetHabitCount,preferredReminderTime);

      console.log("Onboarding API response:",data);

      navigate("/home");

    } catch (error) {

      console.error("Onboarding Error:",error);

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
      onContinue={handleContinue}

      onOptionSelect={handleOptionSelect}

      selectedOption={
        currentStep === 1
          ? onboarding.goal
          : onboarding.targetHabitCount
      }

      reminderTime={onboarding.preferredReminderTime}

      onReminderTimeChange={handleReminderTime}
    />
  );
}

export default Onboarding;