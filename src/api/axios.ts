import axios from "axios";

const axiosInstance = axios.create({
  timeout: 1000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

const getRequest = async (url: string): Promise<any> =>
  await axiosInstance({
    method: "get",
    url: url,
  });

export { getRequest };
