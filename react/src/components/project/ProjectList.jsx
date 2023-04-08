import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ProjectFact } from "./ProjectFact";
import { v4 as uuidv4 } from "uuid";

export const ProjectList = ({ index, project, onItemUpdate, onItemDelete }) => {
  const [model, setModel] = useState({ ...project });

  const addFact = () => {
    if (model.specialFacts?.length >= 6) return;
    const fact = {
      uuid: uuidv4(),
      text: "",
    };
    model.specialFacts.push(fact);
    setModel({ ...model });
  };

  const onFactChange = (item) => {
    if (!item) return;
    const newList = model.specialFacts.map((list) => {
      if (item.uuid === list.uuid) {
        return { ...item };
      } else {
        return list;
      }
    });
    setModel({ ...model, specialFacts: newList });
  };

  const deleteFact = (item) => {
    if (!item) return;
    const newList = model.specialFacts.filter(
      (list) => item.uuid !== list.uuid
    );
    setModel({ ...model, specialFacts: newList });
  };

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
          <label className="form-label">Title</label>
          <div className="mt-1">
            <input
              value={model.title || ""}
              onChange={(e) => setModel({ ...model, title: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">About</label>
          <div className="mt-1">
            <input
              value={model.about || ""}
              onChange={(e) => setModel({ ...model, about: e.target.value })}
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">Github Link</label>
          <div className="mt-1">
            <input
              value={model.links.github || ""}
              onChange={(e) =>
                setModel({
                  ...model,
                  links: { ...model.links, github: e.target.value },
                })
              }
              type="url"
              className="form-input"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="form-label">Demo Link</label>
          <div className="mt-1">
            <input
              value={model.links.demo || ""}
              onChange={(e) =>
                setModel({
                  ...model,
                  links: { ...model.links, demo: e.target.value },
                })
              }
              type="url"
              className="form-input"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="sm:col-span-full">
          <label className="form-label">TechStack</label>
          <div className="mt-1">
            <input
              value={model.techStack || ""}
              onChange={(e) =>
                setModel({ ...model, techStack: e.target.value })
              }
              type="text"
              className="form-input"
              placeholder="eg. HTML, CSS, Bootstrap, JS, jQuery"
            />
          </div>
        </div>

        <div className="sm:col-span-full mt-3">
          <div className="flex justify-between items-center">
            <h4 className="form-label">
              Special facts about the project
              <span className="text-gray-500 ml-2">(max: 5)</span>
            </h4>
            <button onClick={addFact} type="button" className="btn">
              <PlusIcon className="w-4 h-5 mr-1" />
              Add Fact
            </button>
          </div>
          <div className="pl-5 mt-6">
            {model.specialFacts.length > 0 ? (
              model.specialFacts.map((fact, index) => (
                <ProjectFact
                  key={fact.uuid}
                  index={index + 1}
                  fact={fact}
                  onFactChange={onFactChange}
                  deleteFact={deleteFact}
                />
              ))
            ) : (
              <p className="text-center text-sm text-gray-600">
                There is no special fact about the project.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
