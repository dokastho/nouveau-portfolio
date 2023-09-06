import PropTypes from 'prop-types';
import React from 'react'
import { eduId } from './Education';
import { bioId } from './Bio';

const componentIds = [bioId, eduId]

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: bioId,
    }
    this.selectId = this.selectId.bind(this);
  }

  selectId(componentId) {
    this.setState({ selected: componentId });
  }

  render() {
    const {
      selected
    } = this.state;
    return (
      <>
        <div className='navbar-container'>
          <div className='navbar'>
            {
              componentIds.map((componentId) => {
                return (
                  <a href={`#${componentId}`} key={componentId}>
                    <div
                      className={`navbar-item${selected === componentId ? ' selected' : ''}`}
                      onClick={() => { this.selectId(componentId) }}
                    >
                      {componentId}
                    </div>
                  </a>
                )
              })
            }
          </div>
        </div>
      </>
    );
  }
}

Navbar.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

export default Navbar
