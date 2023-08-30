import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class Bootstrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetch("/api/v1/containers/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          containers: data,
          loaded: true
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      containers,
    } = this.state;
    return (
      <>
        {
          loaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={loaded ? 'loaded' : 'loading'}>
          hello world
        </div>
      </>
    );
  }
}

export default Bootstrapper
