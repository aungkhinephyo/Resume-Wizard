import { useEffect, useState } from "react";
import { Education } from "../components/education/Education";
import { PageComponent } from "../components/page/PageComponent";
import { PersonalInfo } from "../components/personal/PersonalInfo";
import { SocialLinks } from "../components/personal/SocialLinks";
import { Experience } from "../components/experience/Experience";
import { Skill } from "../components/skill/Skill";
import { Language } from "../components/skill/Language";
import { Project } from "../components/project/Project";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/utilities/Loading";

export default function CreateResume() {
  const { slug } = useParams();
  const { showToast } = useStateContext();
  const navigate = useNavigate();

  const [resume, setResume] = useState({
    title: "",
    personal_info: {},
    social_links: {},
    education: [],
    experiences: [],
    skills: {},
    languages: [],
    projects: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const onPersonalInfoUpdate = (info) => {
    setResume({ ...resume, personal_info: info });
  };
  const onSocialLinksUpdate = (links) => {
    setResume({ ...resume, social_links: links });
  };
  const onEducationUpdate = (lists) => {
    setResume({ ...resume, education: lists });
  };
  const onExperienceUpdate = (lists) => {
    setResume({ ...resume, experiences: lists });
  };
  const onSkillUpdate = (lists) => {
    setResume({ ...resume, skills: lists });
  };
  const onLanguageUpdate = (lists) => {
    setResume({ ...resume, languages: lists });
  };
  const onProjectUpdate = (lists) => {
    setResume({ ...resume, projects: lists });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let request = null;
    if (slug) {
      request = axiosClient.put(`/resume/${slug}`, resume);
    } else {
      request = axiosClient.post("/resume", resume);
    }
    request
      .then(({ data }) => {
        showToast(slug ? "The resume is updated." : "The resume is created.");
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(true);
        }
      });
  };

  useEffect(() => {
    if (slug) {
      axiosClient
        .get(`/resume/${slug}`)
        .then(({ data }) => {
          setResume(data.data);
        })
        .then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <PageComponent title={slug ? "Update Resume" : "Creat Resume"}>
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={onSubmit}>
          {/* Title */}
          {/* {resume.title} */}
          <div
            className={`bg-white px-8 py-8 mb-6 rounded-md shadow-md ${
              error ? "border-2 border-red-500" : ""
            }`}
          >
            <div className="flex items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900 mr-2">
                Title:
              </h2>
              <input
                value={resume.title || ""}
                onChange={(e) =>
                  setResume({ ...resume, title: e.target.value })
                }
                type="text"
                className="form-input"
              />
            </div>
          </div>

          {/* <pre>{JSON.stringify(resume.personal_info, undefined, 2)}</pre> */}
          <PersonalInfo
            personalInfo={resume.personal_info}
            onPersonalInfoUpdate={onPersonalInfoUpdate}
          ></PersonalInfo>

          {/* <pre>{JSON.stringify(resume.social_links, undefined, 2)}</pre> */}
          <SocialLinks
            socialLinks={resume.social_links}
            onSocialLinksUpdate={onSocialLinksUpdate}
          ></SocialLinks>

          {/* <pre>{JSON.stringify(resume.education, undefined, 2)}</pre> */}
          <Education
            education={resume.education}
            onEducationUpdate={onEducationUpdate}
          ></Education>

          {/* <pre>{JSON.stringify(resume.experiences, undefined, 2)}</pre> */}
          <Experience
            experiences={resume.experiences}
            onExperienceUpdate={onExperienceUpdate}
          ></Experience>

          {/* <pre>{JSON.stringify(resume.skills, undefined, 2)}</pre> */}
          <Skill skills={resume.skills} onSkillUpdate={onSkillUpdate}></Skill>

          {/* <pre>{JSON.stringify(resume.languages, undefined, 2)}</pre> */}
          <Language
            languages={resume.languages}
            onLanguageUpdate={onLanguageUpdate}
          ></Language>

          {/* <pre>{JSON.stringify(resume.projects, undefined, 2)}</pre> */}
          <Project
            projects={resume.projects}
            onProjectUpdate={onProjectUpdate}
          ></Project>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-1/2 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out"
            >
              {slug ? "Update Resume" : "Create Resume"}
            </button>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
