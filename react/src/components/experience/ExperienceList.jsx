import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const ExperienceList = ({
  index,
  experience,
  onItemUpdate,
  onItemDelete,
}) => {
  const [model, setModel] = useState({ ...experience });

  useEffect(() => {
    onItemUpdate(model);
  }, [model]);
  return (
    <div className="bg-slate-100 rounded-md p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="grid place-items-center w-7 h-7 bg-green-500 text-white rounded-full">
          {index}
        </h4>
        <button
          onClick={() => onItemDelete(model)}
          type="button"
          className="btn-outline text-red-500 hover:border-red-600"
        >
          <TrashIcon className="w-4 mr-1" />
          Delete
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label className="form-label">Company</label>
          <div className="mt-1">
            <input
              value={model.company || ""}
              onChange={(e) => setModel({ ...model, company: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="form-label">Job</label>
          <div className="mt-1">
            <input
              value={model.job || ""}
              onChange={(e) => setModel({ ...model, job: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="form-label">Duration of service</label>
          <div className="mt-1">
            <input
              value={model.duration || ""}
              onChange={(e) => setModel({ ...model, duration: e.target.value })}
              type="number"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-full">
          <label className="form-label">Description</label>
          <div className="mt-1">
            <textarea
              value={model.description || ""}
              onChange={(e) =>
                setModel({ ...model, description: e.target.value })
              }
              className="form-input"
              rows={4}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
