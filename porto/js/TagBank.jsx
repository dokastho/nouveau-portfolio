import PropTypes from 'prop-types';
import React from 'react'
import Tag from './Tag';

class TagBank extends React.Component {

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
      <div>This is a tag bank</div>
      <Tag />
      </>
    );
  }
}

TagBank.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default TagBank
