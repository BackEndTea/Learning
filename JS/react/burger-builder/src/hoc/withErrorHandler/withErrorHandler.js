import React from 'react';
import Modal from "../../components/UI/Modal/Modal";

import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useAxiosInterceptors(axios);

    const clearErrorHandler = () => setError(null);

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
