import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const ProjectFact = ({ index, fact, onFactChange, deleteFact }) => {
  const [model, setModel] = useState({ ...fact });

  useEffect(() => {
    onFactChange(model);
  }, [model]);

  return (
    <div className="flex items-center mb-3">
      <span className="inline-block w-5">{index}.</span>
      <input
        value={model.text}
        onChange={(e) => setModel({ ...model, text: e.target.value })}
        type="text"
        className="form-input"
      />
      <button
        onClick={() => deleteFact(model)}
        type="button"
        className="btn-outline-circle text-red-500 hover:border-red-600 ml-2"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
