import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const PersonalInfo = ({ personalInfo, onPersonalInfoUpdate }) => {
  const [info, setInfo] = useState({ ...personalInfo });
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    onPersonalInfoUpdate(info);
  }, [info]);

  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(info, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="bg-slate-100 rounded-md p-4 mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="lg:col-span-2 sm:col-span-3">
            <label className="form-label">Name</label>
            <div className="mt-1">
              <input
                value={info.name || ""}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                type="text"
                className="form-input"
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-span-3">
            <label className="form-label">Email</label>
            <div className="mt-1">
              <input
                value={info.email || ""}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                type="email"
                className="form-input"
                placeholder="eg. example@gmail.com"
              />
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-span-3">
            <label className="form-label">Phone Number</label>
            <div className="mt-1">
              <input
                value={info.phone || ""}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                type="text"
                className="form-input"
                placeholder="eg. 09789xxxxxx, 09987xxxxxx"
              />
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-span-3">
            <label className="form-label">Job</label>
            <div className="mt-1">
              <input
                value={info.job || ""}
                onChange={(e) => setInfo({ ...info, job: e.target.value })}
                type="text"
                className="form-input"
                placeholder="eg. Software Enginner"
              />
            </div>
          </div>

          <div className="lg:col-span-4 sm:col-span-full">
            <label className="form-label">Address</label>
            <div className="mt-1">
              <input
                value={info.address || ""}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                type="text"
                className="form-input"
                placeholder="Your address"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
