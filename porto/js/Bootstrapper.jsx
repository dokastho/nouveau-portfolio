import React from 'react'
import Loading from './Loading';

class Bootstrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      loaded: {
        _bootstrapper: false,
        _bio: true,
        _container: true,
        _projects: true,
      },
    };
  }

  componentDidMount() {
    fetch("/api/v1/containers/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          containers: data,
          loaded: {
            _bootstrapper: true,
            _bio: prevState.loaded._bio,
            _container: prevState.loaded._container,
            _projects: prevState.loaded._projects,
          }
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      containers,
    } = this.state;
    let isLoaded = true;
    Object.keys(loaded).forEach(key => {
      isLoaded = isLoaded && loaded[key];
    });
    return (
      <>
        {
          isLoaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={isLoaded ? 'loaded' : 'loading'}>
          hello world
        </div>
      </>
    );
  }
}

export default Bootstrapper
