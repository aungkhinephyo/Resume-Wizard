import { useEffect, useRef, useState } from "react";
import {
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { Loading } from "../components/utilities/Loading";
import { Button } from "../components/utilities/Button";

export default function ResumeView() {
  const { slug } = useParams();
  const [resume, setResume] = useState({});
  const [loading, setLoading] = useState(true);

  const componentRef = useRef();

  const notEmpty = (x) => {
    if (Array.isArray(x)) {
      return x.length === 0 ? false : true;
    } else {
      return Object.keys(x).length === 0 ? false : true;
    }
  };

  const isPlural = (x, singular, plural) => {
    if (x === null) {
      return "";
    } else if (Number(x) <= 1) {
      return singular;
    } else if (Number(x) > 1) {
      return plural;
    }
  };

  useEffect(() => {
    if (slug) {
      axiosClient
        .get(`/resume/${slug}`)
        .then(({ data }) => {
          setResume(data.data);
        })
        .then(() => setLoading(false));
    }
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="py-8">
          {/* <pre>{JSON.stringify(resume, undefined, 2)}</pre> */}
          <div className="w-[8.5in] mx-auto flex justify-end">
            <div className="flex gap-6">
              <Button to={`/resume/${slug}/update`} color="blue">
                <PencilIcon className="w-4 h-4 mr-2" /> Edit
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button color="green">
                    <PrinterIcon className="w-4 h-4 mr-2" /> Print & Save
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
          <div className="font-merri w-[8.5in] h-[11.3in] mx-auto mt-6 bg-white shadow-lg overflow-hidden">
            <div
              ref={componentRef}
              className="w-full h-full py-[0.4in] px-[0.3in]"
            >
              {/* Personal Info */}
              {notEmpty(resume.personal_info) && (
                <div className="grid grid-cols-3 gap-x-6 overflow-hidden">
                  <div className="col-span-2 h-full">
                    <h1 className="text-5xl font-bold capitalize">
                      {resume.personal_info.name || "Name"}
                    </h1>
                    <h3 className="text-lg font-semibold italic capitalize mt-3">
                      {resume.personal_info.job || "Job"}
                    </h3>
                  </div>
                  <div className="col-span-1 h-full">
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-semibold">
                        {resume.personal_info.email || "Email"}
                      </span>
                    </div>
                    <div className="font-semibold flex items-center mt-4">
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-semibold">
                        {resume.personal_info.phone || "Phone Number"}
                      </span>
                    </div>
                    {resume.social_links && (
                      <div className="font-semibold flex items-center gap-3 mt-4">
                        {resume.social_links.facebook && (
                          <a
                            href={resume.social_links.facebook}
                            target="_blank"
                          >
                            <img
                              src="/facebook.png"
                              alt="icon"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                        {resume.social_links.twitter && (
                          <a href={resume.social_links.twitter} target="_blank">
                            <img
                              src="/twitter.png"
                              alt="icon"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                        {resume.social_links.linkedin && (
                          <a
                            href={resume.social_links.linkedin}
                            target="_blank"
                          >
                            <img
                              src="/linkedin.png"
                              alt="icon"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                        {resume.social_links.github && (
                          <a href={resume.social_links.github} target="_blank">
                            <img
                              src="/github.png"
                              alt="icon"
                              className="w-5 h-5"
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-x-6 mt-8">
                <div className="col-span-2 h-full">
                  {/* Projects */}
                  {notEmpty(resume.projects) && (
                    <div>
                      <h3 className="text-lg text-blue-600 font-bold mb-2">
                        Projects
                      </h3>

                      {resume.projects.map((list) => (
                        <div key={list.uuid} className="mb-6">
                          <h3 className="font-bold capitalize">{list.title}</h3>
                          <div className="text-xs font-bold flex gap-4 mb-1">
                            {list.links.github && (
                              <a
                                href={list.links.github}
                                className="text-blue-500 underline"
                                target="_blank"
                              >
                                github
                              </a>
                            )}
                            {list.links.demo && (
                              <a
                                href={list.links.demo}
                                className="text-blue-500 underline"
                                target="_blank"
                              >
                                demo
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-gray-800 italic mb-1">
                            {list.about}
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            TechStack- {list.techStack}
                          </p>
                          {list.specialFacts && (
                            <ul className="list-disc text-sm text-gray-600 ml-6 mt-2">
                              {list.specialFacts.map((item) => (
                                <li key={item.uuid}>{item.text}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-span-1 h-full">
                  {/* Experience */}
                  {notEmpty(resume.experiences) && (
                    <div className="mb-8">
                      <h3 className="text-lg text-blue-600 font-bold mb-2">
                        Experiences
                      </h3>
                      <div className="text-sm">
                        {resume.experiences.map((list) => (
                          <div key={list.uuid} className="mb-3">
                            <span className="text-[15px] font-bold">
                              {list.company || ""}{" "}
                              {list.job ? "| " + list.job : ""}
                            </span>
                            {list.duration && (
                              <p className="text-sm text-gray-600">
                                Duration: {list.duration}{" "}
                                {isPlural(list.duration, " year", " years")}
                              </p>
                            )}
                            {list.description && (
                              <p className="text-sm text-gray-600">
                                ( {list.description} )
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {notEmpty(resume.skills) && (
                    <div className="mb-8">
                      <h3 className="text-lg text-blue-600 font-bold mb-2">
                        Skills
                      </h3>
                      <div>
                        {resume.skills.frontEnd && (
                          <p className="text-sm mb-2">
                            <span className="text-[15px] font-bold">
                              Front End:{" "}
                            </span>
                            <span className="text-gray-600">
                              {resume.skills.frontEnd}
                            </span>
                          </p>
                        )}
                        {resume.skills.backEnd && (
                          <p className="text-sm mb-2">
                            <span className="text-[15px] font-bold">
                              Back End:{" "}
                            </span>
                            <span className="text-gray-600">
                              {resume.skills.backEnd}
                            </span>
                          </p>
                        )}
                        {resume.skills.otherTools && (
                          <p className="text-sm mb-2">
                            <span className="text-[15px] font-bold">
                              Tools:{" "}
                            </span>
                            <span className="text-gray-600">
                              {resume.skills.otherTools}
                            </span>
                          </p>
                        )}
                        {resume.skills.currentLearning && (
                          <p className="text-sm">
                            <span className="text-[15px] font-bold">
                              Current Learning:{" "}
                            </span>
                            <span className="text-gray-600">
                              {resume.skills.currentLearning}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {notEmpty(resume.education) && (
                    <div className="mb-8">
                      <h3 className="text-lg text-blue-600 font-bold mb-2">
                        Education
                      </h3>
                      <div className="text-sm">
                        {resume.education.map((list) => (
                          <div key={list.uuid} className="mb-3">
                            <p className="text-[15px] font-bold capitalize">
                              {list.education}
                            </p>
                            <p className="text-gray-600 capitalize">
                              {list.school}
                            </p>
                            <p className="text-gray-600">
                              ({list.startDate}-{list.endDate})
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {notEmpty(resume.languages) && (
                    <div>
                      <h3 className="text-lg text-blue-600 font-bold mb-2">
                        Languages
                      </h3>
                      <div className="text-sm">
                        <ul className="list-disc list-inside">
                          {resume.languages.map((list) => (
                            <li key={list.uuid} className="capitalize mb-3">
                              <span className="font-bold">{list.name}</span>{" "}
                              <span className="text-gray-600">
                                ( {list.level} )
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
