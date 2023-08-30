import PropTypes from 'prop-types';
import React from 'react'
import Container from './Container';

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
    const {
      containers
    } = this.props;

    this.setState({ containers });
  }

  render() {
    const { } = this.state;
    return (
      <>
        <Container />
      </>
    );
  }
}

Bio.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default Bio
