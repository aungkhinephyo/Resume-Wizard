import { useEffect, useState } from "react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { EducationList } from "./EducationList";
import { v4 as uuidv4 } from "uuid";

export const Education = ({ education, onEducationUpdate }) => {
  const [myEducation, setMyEducation] = useState([...education]);
  const [collapse, setCollapse] = useState(true);

  const addItem = () => {
    const item = {
      uuid: uuidv4(),
      school: "",
      education: "",
      startDate: "",
      endDate: "",
    };
    myEducation.push(item);
    setMyEducation([...myEducation]);
  };

  const onItemUpdate = (item) => {
    if (!item) return;
    const newList = myEducation.map((list) => {
      if (item.uuid === list.uuid) {
        return { ...item };
      } else {
        return list;
      }
    });
    setMyEducation([...newList]);
  };

  const onItemDelete = (item) => {
    if (!item) return;
    const newList = myEducation.filter((list) => item.uuid != list.uuid);
    setMyEducation([...newList]);
  };

  useEffect(() => {
    onEducationUpdate(myEducation);
  }, [myEducation]);
  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Education
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(myEducation, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="flex justify-end my-4">
          <button onClick={addItem} type="button" className="btn">
            <PlusIcon className="w-4 h-5 mr-1" />
            Add
          </button>
        </div>
      )}

      {!collapse &&
        myEducation.length > 0 &&
        myEducation.map((item, index) => (
          <EducationList
            key={item.uuid}
            index={index + 1}
            education={item}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        ))}

      {!collapse && myEducation.length == 0 && (
        <div className="py-4 bg-slate-100 text-center text-sm text-gray-600 rounded-md">
          There is no information for education.
        </div>
      )}
    </div>
  );
};
