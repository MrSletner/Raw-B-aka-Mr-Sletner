import React from 'react';

interface SequencerGridProps {
  pads: Array<{ id: string; name: string; color: string }>;
  sequence: boolean[][];
  currentStep: number;
  onToggleStep: (padIndex: number, stepIndex: number) => void;
}

const SequencerGrid: React.FC<SequencerGridProps> = ({
  pads,
  sequence,
  currentStep,
  onToggleStep
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 mb-2">
        <div className="w-12"></div>
        {Array(16).fill(null).map((_, stepIndex) => (
          <div
            key={stepIndex}
            className={`w-6 h-4 text-xs flex items-center justify-center rounded ${
              currentStep === stepIndex ? 'bg-yellow-400 text-black' : 'bg-gray-300'
            }`}
          >
            {stepIndex + 1}
          </div>
        ))}
      </div>
      {pads.map((pad, padIndex) => (
        <div key={pad.id} className="flex items-center gap-1">
          <div className={`w-12 h-6 ${pad.color} rounded text-white text-xs flex items-center justify-center`}>
            {padIndex + 1}
          </div>
          {Array(16).fill(null).map((_, stepIndex) => (
            <button
              key={stepIndex}
              onClick={() => onToggleStep(padIndex, stepIndex)}
              className={`w-6 h-6 rounded border-2 transition-all ${
                sequence[padIndex][stepIndex] ? pad.color : 'bg-gray-200'
              } ${currentStep === stepIndex ? 'border-yellow-400 border-4' : 'border-gray-300'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SequencerGrid;