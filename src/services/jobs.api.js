import api from "./api.config";

export const getJobs = async (payload) =>
  await api.post("/adhoc/getSampleJdJSON", payload);
