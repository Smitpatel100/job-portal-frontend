import api from "../api/axios";

export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data.data.content;  // extract here
};

export const createJob = async (jobData) => {
  return await api.post("/jobs", jobData);
};
