import PropTypes from 'prop-types';
import React from 'react'

class Tag extends React.Component {

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
      <div>
        This is a tag
      </div>
      </>
    );
  }
}

Tag.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default Tag
