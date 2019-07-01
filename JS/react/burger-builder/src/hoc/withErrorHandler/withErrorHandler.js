import React, { useEffect, useState } from 'react';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
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
    }, [requestInterceptor, responseInterceptor]);

    const clearErrorHandler = () => {
      setError(null);
    };

    return (
      <React.Fragment>
        <Modal
          modalClosed={clearErrorHandler}
          show={error}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}>{props.children}</WrappedComponent>
      </React.Fragment>
    );
  }
};

export default withErrorHandler;
