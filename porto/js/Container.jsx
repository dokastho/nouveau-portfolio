import PropTypes from 'prop-types';
import React from 'react'
import TagBank from './TagBank';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      id: 0
    };
    this.updateContainer = this.updateContainer.bind(this);
  }

  componentDidMount() {
    const { container } = this.props;
    const {
      name,
      content,
      id
    } = container;

    this.setState({
      name,
      content,
      id
    });
  }

  updateContainer() {
    const {
      name,
      content,
      id
    } = this.state;
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
      .catch((error) => console.log(error));
  }

  render() {
    const {
      name,
      content
    } = this.state;
    return (
      <>
        <div className='container'>
          <h1 className='container-name'>{name}</h1>
          <div className='container-content'>{content}</div>
          <TagBank />
        </div>
      </>
    );
  }
}

Container.propTypes = {
  // prop types go here
  container: PropTypes.instanceOf(Object).isRequired,
  // tags: PropTypes.instanceOf(Array).isRequired,
};

export default Container

// name
// content
// tags