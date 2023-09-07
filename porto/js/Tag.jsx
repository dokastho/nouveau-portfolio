import PropTypes from 'prop-types';
import React from 'react'

class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      tag: {
        name: '',
        colorHex: '',
      }
    };
  }

  componentDidMount() {
    const {
      tag
    } = this.props;

    this.setState({
      tag
    });
  }

  render() {
    const {
      tag
    } = this.state;
    const {
      name,
      colorHex,
    } = tag;
    return (
      <>
        <div className='tag' style={{ background: `#${colorHex}20`, color: `#${colorHex}` }}>
          {name}
        </div>
      </>
    );
  }
}

Tag.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
  tag: PropTypes.instanceOf(Object).isRequired,
};

export default Tag
