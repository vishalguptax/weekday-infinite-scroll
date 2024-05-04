import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getJobs } from "./services/jobs.api";
import { setJobs, useAppDispatch, useAppSelector } from "./store";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(10);
  const jobs = useAppSelector((state) => state.jobs.value);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    const payload = { limit: dataPerPage, offset: currentPage };
    setIsLoading(true);
    try {
      const { data } = await getJobs(payload);
      const { jdList } = data;
      dispatch(setJobs(jdList ?? []));
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, dataPerPage, dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, currentPage]);

  const handleLoadMore = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 10 &&
      !isLoading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleLoadMore);
    return () => {
      window.removeEventListener("scroll", handleLoadMore);
    };
  }, [handleLoadMore]);

  return (
    <div>
      <h1>Jobs</h1>
      {jobs?.map((job) => (
        <div key={job?.jdUid}>
          <h3>{job?.companyName}</h3>
          <p>{job?.jobDetailsFromCompany}</p>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default App;
