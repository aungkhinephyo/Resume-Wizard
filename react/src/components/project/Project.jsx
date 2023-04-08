import { useEffect, useState } from "react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { ProjectList } from "./ProjectList";

export const Project = ({ projects, onProjectUpdate }) => {
  const [myProject, setMyProject] = useState([...projects]);
  const [collapse, setCollapse] = useState(true);

  const addItem = () => {
    if (myProject.length >= 3) return;
    const item = {
      uuid: uuidv4(),
      title: "",
      about: "",
      links: {
        github: "",
        demo: "",
      },
      techStack: "",
      specialFacts: [],
    };
    myProject.push(item);
    setMyProject([...myProject]);
  };

  const onItemUpdate = (item) => {
    if (!item) return;
    const newList = myProject.map((list) => {
      if (item.uuid === list.uuid) {
        return { ...item };
      } else {
        return list;
      }
    });
    setMyProject([...newList]);
  };

  const onItemDelete = (item) => {
    if (!item) return;
    const newList = myProject.filter((list) => item.uuid != list.uuid);
    setMyProject([...newList]);
  };

  useEffect(() => {
    onProjectUpdate(myProject);
  }, [myProject]);
  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Projects
          <span className="text-sm text-gray-500 ml-2">(max: 3)</span>
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(myProject, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="flex justify-end my-4">
          <button onClick={addItem} type="button" className="btn">
            <PlusIcon className="w-4 h-5 mr-1" />
            Add
          </button>
        </div>
      )}

      {!collapse &&
        myProject.length > 0 &&
        myProject.map((item, index) => (
          <ProjectList
            key={item.uuid}
            index={index + 1}
            project={item}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        ))}
      {!collapse && myProject.length == 0 && (
        <div className="py-4 bg-slate-100 text-center text-sm text-gray-600 rounded-md">
          There is no information for project.
        </div>
      )}
    </div>
  );
};
