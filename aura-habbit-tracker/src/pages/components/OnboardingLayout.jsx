import "./OnboardingLayout.css";

function OnboardingLayout({
  step,
  title,
  description,
  options,
  buttonText,
  onNext,
  onPrevious,
  onContinue,
  onOptionSelect,
  selectedOption
}) {
  return (
    <div className="onboardingPage">

      <header className="onboardingHeader">
        AURA
      </header>

      <div className="onboardingContent">

        <div className="stepNumber">
          <p>
            0{step}<span>/03</span>
          </p>
          <div></div>
        </div>

        <h2>{title}</h2>

        <div className="options">

          {options.map((option) => (

            <button
              key={option}
              className={
                selectedOption === option
                  ? "optionButton selected"
                  : "optionButton"
              }
              onClick={() => onOptionSelect(option)}
            >
              {option}
            </button>

          ))}

        </div>

        <div className="navigationButtons">

          <button
            className="previousButton"
            onClick={onPrevious}
            disabled={step === 1}
          >
            ← Previous
          </button>

          <button
            className="nextButton"
            onClick={
              buttonText === "Next"
                ? onNext
                : onContinue
            }
          >
            {buttonText} →
          </button>

        </div>

      </div>

    </div>
  );
}

export default OnboardingLayout;
