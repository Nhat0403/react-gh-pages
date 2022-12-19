import { useCallback, useState } from "react";

const useFecth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // hàm lấy dữ liệu từ API
  const fetchAPI = useCallback(async (url, data) => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const response = await fetch(url);
      // trả về lỗi
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      data(responseData);
      console.log(`responseData: ` + responseData);
    } catch (error) {
      setFetchError(error);
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, fetchError, fetchAPI };
};

export default useFecth;
