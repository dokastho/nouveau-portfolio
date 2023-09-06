import PropTypes from 'prop-types';
import React from 'react'

class HTMLWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      content
    } = this.props;
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  }
}

HTMLWrapper.propTypes = {
  // prop types go here
  content: PropTypes.string.isRequired,
};

export default HTMLWrapper
