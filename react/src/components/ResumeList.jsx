import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "./utilities/Button";

export const ResumeList = ({ resume, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-sm animate-fade-and-drop hover:shadow-lg transition-all duration-300 ease-in-out">
      <img src="/resume.png" alt="Icon" className="w-full" />
      <h3 className="text-center capitalize text-lg font-semibold mt-4">
        {resume.title}
      </h3>
      <div className="mt-6 flex justify-center items-center gap-4">
        <Button to={`/resume/${resume.slug}/update`} link circle color="blue">
          <PencilSquareIcon className="w-5 h-5" />
        </Button>
        <Button to={`/resume/${resume.slug}/view`} link circle color="green">
          <DocumentTextIcon className="w-5 h-5" />
        </Button>
        <Button onClick={() => onDelete(resume.slug)} link circle color="red">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-6">
        <p className="text-sm text-right text-gray-400">{resume.updated_at}</p>
      </div>
    </div>
  );
};
