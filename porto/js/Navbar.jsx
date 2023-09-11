import PropTypes from 'prop-types';
import React from 'react'
import { eduId } from './Education';
import { bioId } from './Bio';
import { expId } from './Experience';
import { prjId } from './Projects';

const componentIds = [bioId, eduId, expId, prjId]

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: bioId,
    }
    this.selectId = this.selectId.bind(this);
    this.updateTopicOnScroll = this.updateTopicOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateTopicOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateTopicOnScroll);
  }

  updateTopicOnScroll() {
    const currentHeight = window.scrollY;
    let componentHeight = 0;
    for (let index = 0; index < componentIds.length; index++) {
      const componentId = componentIds[index];
      const nextComponentHeight = componentHeight + document.getElementById(componentId).scrollHeight;
      if (currentHeight < nextComponentHeight && currentHeight > componentHeight) {
        this.selectId(componentId);
        return;
      }
      componentHeight = nextComponentHeight;
    }
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
                  <a href={`#${componentId}`} className='bare' key={componentId}>
                    <div
                      className={`navbar-item transition${selected === componentId ? ' selected' : ''}`}
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
