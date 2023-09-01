import PropTypes from 'prop-types';
import React from 'react'

class NewTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Untitled Tag',
      colorHex: null,
    };
  }

  componentDidMount() {
    const { topic } = this.props;
    this.setState({ topic });
  }

  render() {
    const {
      name,
      colorHex
    } = this.state;
    const {
      creatTag
    } = this.props;
    return (
      <>
        <div className='create-tag pointer' onClick={() => { creatTag({name, colorHex }) }}>Create a new tag</div>
      </>
    );
  }
}

NewTag.propTypes = {
  // prop types go here
  containerId: PropTypes.number.isRequired,
  // createTag
};

export default NewTag
