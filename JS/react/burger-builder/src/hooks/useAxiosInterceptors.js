import { useEffect, useState } from 'react';

const useAxiosInterceptors = (axios) => {
  const [error, setError] = useState(null);

  const requestInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const responseInterceptor = axios.interceptors.response.use(res => res,
    err => setError(err)
  );
  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.request.eject(responseInterceptor);
    }
    // eslint-disable-next-line
  }, []);

  return [error, setError];
};

export default useAxiosInterceptors;
