import PropTypes from 'prop-types';
import React from 'react'

class NewContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Untitled Container',
      content: '',
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
      topic,
    } = this.state;
    const {
      createContainer
    } = this.props;
    return (
      <>
        <div className='button center' onClick={() => { createContainer({ name, content, topic }) }}>Create a new {topic} container</div>
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
