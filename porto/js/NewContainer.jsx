import PropTypes from 'prop-types';
import React from 'react'
import { ADMIN } from './Bootstrapper';

class NewContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Untitled Container',
      content: '',
      css: '',
      topic: ''
    };
  }

  componentDidMount() {
    const { topic } = this.props;
    this.setState({ topic });
  }

  render() {
    const {
      name,
      content,
      css,
      topic,
    } = this.state;
    const {
      createContainer
    } = this.props;
    return (
      <>
        <div className={`create-container ${ADMIN ? 'pointer' : 'normal'}`} onClick={() => { createContainer({name, content, css, topic}) }}>Create a new container</div>
      </>
    );
  }
}

NewContainer.propTypes = {
  // prop types go here
  topic: PropTypes.string.isRequired,
  // createContainer
};

export default NewContainer
