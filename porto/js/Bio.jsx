import PropTypes from 'prop-types';
import React from 'react'

const componentId = "Bio";

class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      // a: props.a
    };
  }

  componentDidMount() {
    const { } = this.props;

    this.setState({});
  }

  render() {
    const { } = this.state;
    return (
      <>
      </>
    );
  }
}

Bio.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default Bio
