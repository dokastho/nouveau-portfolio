import PropTypes from 'prop-types';
import React from 'react'

class Bootstrapper extends React.Component {

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
        hello world
      </div>
    );
  }
}

export default Bootstrapper
