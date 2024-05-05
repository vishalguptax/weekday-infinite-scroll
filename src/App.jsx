import { useCallback, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import "./App.css";
import { getJobs } from "./services/jobs.api";
import { setJobs, useAppDispatch, useAppSelector } from "./store";
import { JobCard } from "./components/job-card/JobCard";
import { JobFilter } from "./components/job-filter/JobFilter";
import { JobCardLoader } from "./components/job-card/JobCardLoader";

function App() {
  // State variables for pagination, job data, loading state
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(10);
  const jobs = useAppSelector((state) => state.jobs.value);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch jobs data from API
  const fetchJobs = useCallback(async () => {
    const payload = { limit: dataPerPage, offset: currentPage };
    setIsLoading(true);
    try {
      const { data } = await getJobs(payload);
      const { jdList } = data;
      dispatch(setJobs([...jobs, ...(jdList ?? [])]));
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, dataPerPage, dispatch]);

  // Effect hook to fetch jobs data on component mount and when currentPage changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, currentPage]);

  // Function to handle infinite scrolling
  const handleLoadMore = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 10 &&
      !isLoading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading]);

  // Effect hook to add/remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleLoadMore);
    return () => {
      window.removeEventListener("scroll", handleLoadMore);
    };
  }, [handleLoadMore]);

  // Rendering JSX
  return (
    <Container>
      <Typography variant="h5" textAlign={"center"} my={4}>
        Weekday Jobs Listing By{" "}
        <a href="https://www.linkedin.com/in/vishalgupta26/" target="_blank">
          Vishal Gupta
        </a>
      </Typography>

      {/* JobFilter component to filter job results */}
      <JobFilter refetchJobs={fetchJobs} />

      {/* Grid layout to display job cards */}
      <Grid container spacing={4}>
        {jobs?.map((job) => (
          <Grid
            key={job?.jdUid}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* JobCard component to display individual job details */}
            <JobCard data={job} />
          </Grid>
        ))}
        {/* Loading skeleton while fetching data */}
        {isLoading && <JobCardLoader />}
      </Grid>
    </Container>
  );
}

export default App;
