import { useEffect, useState } from "react";
import { ResumeList } from "../components/ResumeList";
import { PageComponent } from "../components/page/PageComponent";
import axiosClient from "../axios";
import { Loading } from "../components/utilities/Loading";
import { Pagination } from "../components/utilities/Pagination";
import { useStateContext } from "../context/ContextProvider";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { showToast } = useStateContext();
  const [resumes, setResumes] = useState({});
  const [meta, setMeta] = useState({});

  const onDelete = (slug) => {
    if (window.confirm("Are you sure to delete this resume?")) {
      axiosClient.delete(`/resume/${slug}`).then(() => {
        getResumes();
        showToast("The resume is deleted.");
      });
    }
  };

  const onPageClick = (e, link) => {
    e.preventDefault();
    getResumes(link.url);
  };

  const getResumes = (url = "/resume") => {
    if (url === null) return;
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(true);
        setResumes(data.data);
        setMeta(data.meta);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getResumes();
  }, []);
  return (
    <PageComponent title="Dashboard">
      {loading && <Loading />}
      {!loading && resumes.length === 0 && (
        <div className="text-center text-gray-700 font-bold py-7">
          <img src="/empty-box.png" alt="icon" className="w-24 h-24 mx-auto" />
          <p className="mt-3">There is no resume you created.</p>
        </div>
      )}
      {!loading && resumes.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mx-6 sm:mx-0">
            {resumes.map((resume) => (
              <ResumeList key={resume.id} resume={resume} onDelete={onDelete} />
            ))}
          </div>
          <Pagination meta={meta} onPageClick={onPageClick} />
        </>
      )}
    </PageComponent>
  );
}
