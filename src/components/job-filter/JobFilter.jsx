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
  const jobs = useAppSelector((state) => state.jobs.value);
  const dispatch = useAppDispatch();

  const [filterParams, setFilterParams] = useSearchParams({
    q: "",
    role: "[]",
    salary: "",
    experience: "",
  });

  const q = filterParams.get("q") || "";
  const role = filterParams.get("role")
    ? JSON.parse(filterParams.get("role"))
    : [];
  const experience = Number(filterParams.get("experience")) || null;
  const salary = Number(filterParams.get("salary")) || null;

  const handleRoleChange = (e) => {
    const selectedRoles = e.target.value;
    if (!selectedRoles.length) {
      refetchJobs();
    }
    setFilterParams(
      (prev) => {
        prev.set("role", JSON.stringify(selectedRoles));
        return prev;
      },
      { replace: true }
    );
    const newJobs = jobs.filter((job) => selectedRoles.includes(job.jobRole));
    dispatch(setJobs(newJobs));
  };

  const handleExperienceChange = (e) => {
    const selectedExperience = e.target.value;
    if (!selectedExperience) {
      refetchJobs();
    }
    setFilterParams(
      (prev) => {
        prev.set("experience", selectedExperience);
        return prev;
      },
      { replace: true }
    );
    const newJobs = jobs.filter((job) => job.minExp === selectedExperience);
    dispatch(setJobs(newJobs));
  };

  const handleSalaryChange = (e) => {
    const selectedSalary = e.target.value;
    if (!selectedSalary) {
      refetchJobs();
    }
    setFilterParams(
      (prev) => {
        prev.set("salary", selectedSalary);
        return prev;
      },
      { replace: true }
    );
    const newJobs = jobs.filter((job) => job.minJdSalary >= selectedSalary);
    dispatch(setJobs(newJobs));
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    if (!query) {
      refetchJobs();
    }
    setFilterParams(
      (prev) => {
        prev.set("q", query);
        return prev;
      },
      { replace: true }
    );
    const newJobs = jobs.filter((job) =>
      job?.companyName?.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setJobs(newJobs));
  };

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
