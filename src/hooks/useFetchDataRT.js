import { useEffect, useState } from "react";

export default function useFetchDataRT(request) {
  const [isDataUpdate, setIsDataUpdate] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    request
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [isDataUpdate]);
  return {
    setIsDataUpdate,
    data,
  };
}
