import PropTypes from 'prop-types';
import React from 'react'

class EditTag extends React.Component {

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
        <div className='tag' style={{ background: `#${colorHex}` }}>
          {name}
        </div>
      </>
    );
  }
}

EditTag.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
  tag: PropTypes.instanceOf(Object).isRequired,
};

export default EditTag

// onclick will select and be able to be edited
// need update method here
// need delete button here
