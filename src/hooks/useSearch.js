import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const { default: axios } = require("api/axios");

export default function useSearch(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const handleFetchData = useRef({});
  const [url, setUrl] = useState(initialUrl);
  const isMounted = useRef(true);

  useEffect(() => {
    //
    isMounted.current = true;
    return () => {
      // unmounted component
      isMounted.current = false;
    };
  }, []);

  handleFetchData.current = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(url);
      if (isMounted.current) {
        setData(response.data || []);
        // setLoading(false);
      }
    } catch (error) {
      //   setLoading(false);
      //   setErrorMessage(`The error happend ${error}`);
      toast.error(`The error happend ${error}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    handleFetchData.current();
  }, [url]);

  return {
    setUrl,
    data,
  };
}
