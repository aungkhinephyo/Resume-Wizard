import { useEffect, useState } from "react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { ExperienceList } from "./ExperienceList";

export const Experience = ({ experiences, onExperienceUpdate }) => {
  const [myExperience, setMyExperience] = useState([...experiences]);
  const [collapse, setCollapse] = useState(true);

  const addItem = () => {
    const item = {
      uuid: uuidv4(),
      company: "",
      job: "",
      year: "",
      description: "",
    };
    myExperience.push(item);
    setMyExperience([...myExperience]);
  };

  const onItemUpdate = (item) => {
    if (!item) return;
    const newList = myExperience.map((list) => {
      if (item.uuid === list.uuid) {
        return { ...item };
      } else {
        return list;
      }
    });
    setMyExperience([...newList]);
  };

  const onItemDelete = (item) => {
    if (!item) return;
    const newList = myExperience.filter((list) => item.uuid != list.uuid);
    setMyExperience([...newList]);
  };

  useEffect(() => {
    onExperienceUpdate(myExperience);
  }, [myExperience]);
  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Experiences
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(myExperience, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="flex justify-end my-4">
          <button onClick={addItem} type="button" className="btn">
            <PlusIcon className="w-4 h-5 mr-1" />
            Add
          </button>
        </div>
      )}

      {!collapse &&
        myExperience.length > 0 &&
        myExperience.map((item, index) => (
          <ExperienceList
            key={item.uuid}
            index={index + 1}
            experience={item}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        ))}

      {!collapse && myExperience.length == 0 && (
        <div className="py-4 bg-slate-100 text-center text-sm text-gray-600 rounded-md">
          There is no information for experience.
        </div>
      )}
    </div>
  );
};
