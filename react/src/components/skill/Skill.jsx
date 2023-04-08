import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const Skill = ({ skills, onSkillUpdate }) => {
  const [mySkills, setMySkills] = useState({ ...skills });
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    onSkillUpdate(mySkills);
  }, [mySkills]);

  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Skills
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(mySkills, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="bg-slate-100 rounded-md p-4 mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-full">
            <label className="form-label">Front End</label>
            <div className="mt-1">
              <input
                value={mySkills.frontEnd || ""}
                onChange={(e) =>
                  setMySkills({ ...mySkills, frontEnd: e.target.value })
                }
                type="text"
                className="form-input"
                placeholder="eg.HTML, CSS, JS"
              />
            </div>
          </div>

          <div className="sm:col-span-full">
            <label className="form-label">Back End</label>
            <div className="mt-1">
              <input
                value={mySkills.backEnd || ""}
                onChange={(e) =>
                  setMySkills({ ...mySkills, backEnd: e.target.value })
                }
                type="text"
                className="form-input"
                placeholder="eg. PHP, Laravel, MySQL"
              />
            </div>
          </div>

          <div className="sm:col-span-full">
            <label className="form-label">Other Tools</label>
            <div className="mt-1">
              <input
                value={mySkills.otherTools || ""}
                onChange={(e) =>
                  setMySkills({ ...mySkills, otherTools: e.target.value })
                }
                type="text"
                className="form-input"
                placeholder="eg. Git, Figma, Websockets"
              />
            </div>
          </div>

          <div className="sm:col-span-full">
            <label className="form-label">Current Learning</label>
            <div className="mt-1">
              <input
                value={mySkills.currentLearning || ""}
                onChange={(e) =>
                  setMySkills({ ...mySkills, currentLearning: e.target.value })
                }
                type="text"
                className="form-input"
                placeholder="eg. React, Vue"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
