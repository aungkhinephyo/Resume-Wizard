import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const EducationList = ({
  index,
  education,
  onItemUpdate,
  onItemDelete,
}) => {
  const [model, setModel] = useState({ ...education });

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
          className="btn-outline text-red-500 hover:border-red-600 ml-auto"
        >
          <TrashIcon className="w-4 mr-1" />
          Delete
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="form-label">University / School</label>
          <div className="mt-1">
            <input
              value={model.school}
              onChange={(e) => setModel({ ...model, school: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">Education</label>
          <div className="mt-1">
            <input
              value={model.education}
              onChange={(e) =>
                setModel({ ...model, education: e.target.value })
              }
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">Start Date (Only Year)</label>
          <div className="mt-1">
            <input
              value={model.startDate}
              onChange={(e) =>
                setModel({ ...model, startDate: e.target.value })
              }
              type="number"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">End Date (Only Year)</label>
          <div className="mt-1">
            <input
              value={model.endDate}
              onChange={(e) => setModel({ ...model, endDate: e.target.value })}
              type="number"
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
