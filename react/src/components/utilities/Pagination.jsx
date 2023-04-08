import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Pagination = ({ meta, onPageClick }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md mt-6 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={(e) => onPageClick(e, meta.links[0])}
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={(e) => onPageClick(e, meta.links[meta.links.length - 1])}
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
             Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
          {meta.total > meta.per_page && (
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {meta.links?.map((link, index) => (
                <a
                  key={index}
                  onClick={(e) => onPageClick(e, link)}
                  href="#"
                  className={
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 " +
                    (link.active
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ") +
                    (index === 0 ? "rounded-l-md " : "") +
                    (index === meta.links.length - 1 ? "rounded-r-md " : "")
                  }
                  dangerouslySetInnerHTML={{ __html: link.label }}
                ></a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
