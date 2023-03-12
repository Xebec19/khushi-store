import axios from "axios";

const useHttp = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 3000,
  });

  return instance;
};

export default useHttp;
