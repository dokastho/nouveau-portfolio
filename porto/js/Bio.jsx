import PropTypes from 'prop-types';
import React from 'react'

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
      <div>
      </div>
    );
  }
}

Bio.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default Bio
