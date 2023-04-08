import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const SocialLinks = ({ socialLinks, onSocialLinksUpdate }) => {
  const [links, setLinks] = useState({ ...socialLinks });
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    onSocialLinksUpdate(links);
  }, [links]);

  return (
    <div className="bg-white px-8 py-8 mb-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">
          Social Links
        </h2>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className="btn-outline-circle text-gray-600 hover:border-gray-500"
        >
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* <pre>{JSON.stringify(links, undefined, 2)}</pre> */}

      {!collapse && (
        <div className="bg-slate-100 rounded-md p-4 mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="form-label">Facebook</label>
            <div className="mt-1">
              <input
                value={links.facebook || ""}
                onChange={(e) =>
                  setLinks({ ...links, facebook: e.target.value })
                }
                type="url"
                className="form-input"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="form-label">Twitter</label>
            <div className="mt-1">
              <input
                value={links.twitter || ""}
                onChange={(e) =>
                  setLinks({ ...links, twitter: e.target.value })
                }
                type="url"
                className="form-input"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="form-label">Linkedin</label>
            <div className="mt-1">
              <input
                value={links.linkedin || ""}
                onChange={(e) =>
                  setLinks({ ...links, linkedin: e.target.value })
                }
                type="url"
                className="form-input"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="form-label">Github</label>
            <div className="mt-1">
              <input
                value={links.github || ""}
                onChange={(e) => setLinks({ ...links, github: e.target.value })}
                type="url"
                className="form-input"
                placeholder="https://"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
