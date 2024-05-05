import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { setJobs, useAppDispatch, useAppSelector } from "../../store";
import { experiences, roles, salaries } from "../../constants/filters";

export const JobFilter = ({ refetchJobs }) => {
  // Retrieving jobs from Redux store
  const jobs = useAppSelector((state) => state.jobs.value);
  const dispatch = useAppDispatch();

  // Setting up search parameters using useSearchParams hook
  const [filterParams, setFilterParams] = useSearchParams({
    q: "",
    role: "[]",
    salary: "",
    experience: "",
  });

  // Retrieving filter parameters from the URL query
  const q = filterParams.get("q") || "";
  const role = filterParams.get("role")
    ? JSON.parse(filterParams.get("role"))
    : [];
  const experience = Number(filterParams.get("experience")) || null;
  const salary = Number(filterParams.get("salary")) || null;

  // Event handler for role filter change
  const handleRoleChange = (e) => {
    const selectedRoles = e.target.value;
    if (!selectedRoles.length) {
      refetchJobs();
    }
    // Updating role filter in URL query
    setFilterParams(
      (prev) => {
        prev.set("role", JSON.stringify(selectedRoles));
        return prev;
      },
      { replace: true }
    );
    // Filtering jobs based on selected roles and updating Redux store
    const newJobs = jobs.filter((job) => selectedRoles.includes(job.jobRole));
    dispatch(setJobs(newJobs));
  };

  // Event handler for experience filter change
  const handleExperienceChange = (e) => {
    const selectedExperience = e.target.value;
    if (!selectedExperience) {
      refetchJobs();
    }
    // Updating experience filter in URL query
    setFilterParams(
      (prev) => {
        prev.set("experience", selectedExperience);
        return prev;
      },
      { replace: true }
    );
    // Filtering jobs based on selected experience and updating Redux store
    const newJobs = jobs.filter((job) => job.minExp === selectedExperience);
    dispatch(setJobs(newJobs));
  };

  // Event handler for salary filter change
  const handleSalaryChange = (e) => {
    const selectedSalary = e.target.value;
    if (!selectedSalary) {
      refetchJobs();
    }
    // Updating salary filter in URL query
    setFilterParams(
      (prev) => {
        prev.set("salary", selectedSalary);
        return prev;
      },
      { replace: true }
    );
    // Filtering jobs based on selected salary and updating Redux store
    const newJobs = jobs.filter((job) => job.minJdSalary >= selectedSalary);
    dispatch(setJobs(newJobs));
  };

  // Event handler for search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    if (!query) {
      refetchJobs();
    }
    // Updating search query in URL query
    setFilterParams(
      (prev) => {
        prev.set("q", query);
        return prev;
      },
      { replace: true }
    );
    // Filtering jobs based on search query and updating Redux store
    const newJobs = jobs.filter((job) =>
      job?.companyName?.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setJobs(newJobs));
  };

  // Event handler to clear all filters
  const clearFilters = () => {
    setFilterParams({});
    refetchJobs();
  };

  return (
    <Box my={4} width={"100%"}>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel size="small" id="demo-multiple-chip-label">
          Roles
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={role}
          size="small"
          onChange={handleRoleChange}
          input={<OutlinedInput label="Name" />}
        >
          {roles.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ textTransform: "capitalize" }}
            >
              {name} Engineer
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel size="small" id="demo-simple-select-label">
          Experience
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          label="Experience"
          value={experience}
          onChange={handleExperienceChange}
        >
          {experiences.map((exp, index) => (
            <MenuItem key={index} value={exp}>
              {exp} Years
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <InputLabel size="small" id="demo-simple-select-label">
          Minimum Base Pay Salary
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          value={salary}
          label="Minimum Base Pay Salary"
          onChange={handleSalaryChange}
        >
          {salaries.map((sal, index) => (
            <MenuItem key={index} value={sal}>
              {sal} LPA
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <TextField
          label="Search Company Name"
          size="small"
          value={q}
          onChange={handleSearch}
        />
      </FormControl>
      <Button sx={{ m: 1 }} variant="outlined" onClick={clearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};
