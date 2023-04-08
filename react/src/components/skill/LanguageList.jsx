import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";

export const LanguageList = ({
  index,
  language,
  onItemUpdate,
  onItemDelete,
}) => {
  const [model, setModel] = useState({ ...language });
  const { languageLevels } = useStateContext();

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
        <div className="sm:col-span-3">
          <label className="form-label">Name</label>
          <div className="mt-1">
            <input
              value={model.name}
              onChange={(e) => setModel({ ...model, name: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">Level</label>
          <div className="mt-1">
            <select
              onChange={(e) => setModel({ ...model, level: e.target.value })}
              className="form-input"
              value={model.level || ""}
            >
              <option value="" disabled>
                --Select--
              </option>
              {languageLevels.map((list, key) => (
                <option key={key} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
