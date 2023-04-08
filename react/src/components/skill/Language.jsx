import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LanguageList } from "./LanguageList";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export const Language = ({ languages, onLanguageUpdate }) => {
  const [myLanguages, setMyLanguages] = useState([...languages]);
  const [collapse, setCollapse] = useState(true);

  const addItem = () => {
    const item = {
      uuid: uuidv4(),
      name: "",
      level: "",
    };
    myLanguages.push(item);
    setMyLanguages([...myLanguages]);
  };

  const onItemUpdate = (item) => {
    if (!item) return;
    const newList = myLanguages.map((list) => {
      if (item.uuid === list.uuid) {
        return { ...item };
      } else {
        return list;
      }
    });
    setMyLanguages([...newList]);
  };

  const onItemDelete = (item) => {
    if (!item) return;
    const newList = myLanguages.filter((list) => item.uuid != list.uuid);
    setMyLanguages([...newList]);
  };

  useEffect(() => {
    onLanguageUpdate(myLanguages);
  }, [myLanguages]);

  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Languages
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(myLanguages, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="flex justify-end my-4">
          <button onClick={addItem} type="button" className="btn">
            <PlusIcon className="w-4 h-5 mr-1" />
            Add
          </button>
        </div>
      )}

      {!collapse &&
        myLanguages.length > 0 &&
        myLanguages.map((item, index) => (
          <LanguageList
            key={item.uuid}
            index={index + 1}
            language={item}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        ))}

      {!collapse && myLanguages.length == 0 && (
        <div className="py-4 bg-slate-100 text-center text-sm text-gray-600 rounded-md">
          There is no information for language skill.
        </div>
      )}
    </div>
  );
};
