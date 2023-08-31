import React from 'react'
import Loading from './Loading';
import Bio from './Bio';
import Education from './Education';
import { bioId } from './Bio';
import { eduId } from './Education';

const ADMIN = document.getElementById("admin").content === "True";

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
    this.updateContainer = this.updateContainer.bind(this);
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
        return response.json();
      })
      .then((data) => {
        this.setState({
          containers: data,
        });
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

  updateContainer(container) {
    const {
      name,
      content,
      id
    } = container;
    fetch(`/api/v1/containers/update/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content, id }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          containers: data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      containers,
    } = this.state;

    const containerFunctions = {
      createContainer: this.createContainer,
      deleteContainer: this.deleteContainer,
      updateContainer: this.updateContainer,
    }

    const bioContainers = containers.filter((container) => container.topic === bioId);
    const eduContainers = containers.filter((container) => container.topic === eduId);

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
          <Bio
            key={`bio-loaded-${bioContainers.length}`}
            containerFunctions={containerFunctions}
            containers={bioContainers}
          />
          <Education
            key={`edu-loaded-${eduContainers.length}`}
            containerFunctions={containerFunctions}
            containers={eduContainers}
          />

        </div>
      </>
    );
  }
}

export default Bootstrapper
export {ADMIN}
