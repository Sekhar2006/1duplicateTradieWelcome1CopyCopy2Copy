interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < currentStep
                  ? 'bg-[#FFD700] scale-125'
                  : index === currentStep
                  ? 'bg-[#FFD700] scale-150 shadow-lg shadow-[#FFD700]/50'
                  : 'bg-[#003E6D]/20'
              }`}
            />
            {index < totalSteps - 1 && (
              <div
                className={`w-4 h-0.5 transition-all duration-300 ${
                  index < currentStep ? 'bg-[#FFD700]' : 'bg-[#003E6D]/20'
                }`}
              />
            )}
          </div>
        ))}
        <span 
          className="ml-2 text-xs text-[#003E6D]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
        >
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      {labels && labels[currentStep] && (
        <p 
          className="text-xs text-[#003E6D]/70 mt-1 text-center"
          style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400 }}
        >
          {labels[currentStep]}
        </p>
      )}
    </div>
  );
}
