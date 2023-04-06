import { useState, useEffect, useCallback } from "react";
import { API_KEY } from "@env";
import axios from "axios";

const sleep = async (delay) => new Promise((res) => setTimeout(res, delay));

const useFetch = ({ endpoint, queryObj, delay = 0 }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...queryObj,
    },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      await sleep(delay + 1000); // Sleep is added because api is rate limited to serve 1 req/sec
      const { data } = await axios.request(options);
      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error !! " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, reFetch: fetchData };
};

export default useFetch;
