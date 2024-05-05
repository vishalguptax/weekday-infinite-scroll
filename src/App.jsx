import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getJobs } from "./services/jobs.api";
import { setJobs, useAppDispatch, useAppSelector } from "./store";
import { JobCard } from "./components/job-card/JobCard";
import { Container, Grid, Typography } from "@mui/material";
import { JobFilter } from "./components/job-filter/JobFilter";
import { JobCardLoader } from "./components/job-card/JobCardLoader";

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
      dispatch(setJobs([...jobs, ...(jdList ?? [])]));
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
    <Container>
      <Typography variant="h4" textAlign={"center"} my={4}>
        Weekday Job Search
      </Typography>

      <JobFilter refetchJobs={fetchJobs} />

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
            <JobCard data={job} />
          </Grid>
        ))}
        {isLoading && <JobCardLoader />}
      </Grid>
    </Container>
  );
}

export default App;
