import React from 'react';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null
      };

      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error:null});
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(res => res,
        error => this.setState({error:error})
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

    clearErrorHandler = () => {
      this.setState({error: null});
    };

    render() {
      const error = this.state.error;
      return (
        <React.Fragment>
          <Modal
            modalClosed={this.clearErrorHandler}
            show={error}
          >
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props}>{this.props.children}</WrappedComponent>
        </React.Fragment>
      );
    }
  }
};

export default withErrorHandler;
