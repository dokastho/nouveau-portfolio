import React from 'react'
import Loading from './Loading';
import Bio from './Bio';
import { bioId } from './Bio';

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

    this.createContainer = this.createContainer.bind(this);
    this.deleteContainer = this.deleteContainer.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/containers/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

  createContainer(container) {
    const {
      name,
      content,
      topic
    } = container;
    fetch(`/api/v1/containers/new/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content, topic }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          containers: prevState.containers.push(container)
        }));
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  deleteContainer(container) {
    const {
      id
    } = container;
    fetch(`/api/v1/containers/delete/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          containers: prevState.containers.filter((c) => c.id !== id)
        }));
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      containers,
    } = this.state;
    const bioContainers = containers.filter((container) => container.topic === bioId);
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
          <Bio key={`bio-loaded-${isLoaded}`} containers={bioContainers} />
        </div>
      </>
    );
  }
}

export default Bootstrapper
