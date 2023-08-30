import PropTypes from 'prop-types';
import React from 'react'
import TagBank from './TagBank';

class Container extends React.Component {

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
        This is a container
        <TagBank />
      </div>
    );
  }
}

Container.propTypes = {
  // prop types go here
  // id: PropTypes.number.isRequired,
  // name: PropTypes.string.isRequired,
  // content: PropTypes.string,
  // tags: PropTypes.instanceOf(Array).isRequired,
};

export default Container

// name
// content
// tags