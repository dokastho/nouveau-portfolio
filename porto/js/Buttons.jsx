import PropTypes from 'prop-types';
import React from 'react'

class ConfirmatoryButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }

    this.setClicked = this.setClicked.bind(this);
  }

  setClicked(clicked) {
    this.setState({ clicked });
  }

  render() {
    const {
      clicked
    } = this.state;
    const {
      text,
      callback,
      args,
      id,
    } = this.props;
    return (
      <button
      id={id}
        className={`confirmatory ${clicked ? 'clicked' : ''}`}
        onClick={clicked ? () => { callback(args); this.setClicked(false) } : () => { this.setClicked(true) }}
        onMouseLeave={clicked ? () => { this.setClicked(false) } : null}
      >
        {text}{clicked ? '?' : null}
      </button>
    );
  }
}

ConfirmatoryButton.defaultProps = {
  args: {},
  id: "",
}

ConfirmatoryButton.propTypes = {
  text: PropTypes.string.isRequired,
  args: PropTypes.instanceOf(Object),
  id: PropTypes.string
  // callback
}

export default ConfirmatoryButton;
