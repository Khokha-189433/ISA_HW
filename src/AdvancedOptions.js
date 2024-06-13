import React from 'react';

function AdvancedOptions({ showAdvancedOptions, populationSize, generations, mutationRate, setPopulationSize, setGenerations, setMutationRate }) {
  if (!showAdvancedOptions) return null;

  return (
    <div className="advancedOptionsStyle">
      <label>
        Population Size:
        <input
          type="number"
          placeholder="Population Size"
          value={populationSize}
          onChange={e => setPopulationSize(parseInt(e.target.value) || 0)}
          className="inputStyle"
        />
      </label>
      <label>
        Generations:
        <input
          type="number"
          placeholder="Generations"
          value={generations}
          onChange={e => setGenerations(parseInt(e.target.value) || 0)}
          className="inputStyle"
        />
      </label>
      <label>
        Mutation Rate:
        <input
          type="number"
          step="0.01"
          placeholder="Mutation Rate"
          value={mutationRate}
          onChange={e => setMutationRate(parseFloat(e.target.value) || 0)}
          className="inputStyle"
        />
      </label>
    </div>
  );
}

export default AdvancedOptions;