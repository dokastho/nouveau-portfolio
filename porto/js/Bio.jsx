import PropTypes from 'prop-types';
import React from 'react'
import Container from './Container';

const componentId = "Bio";

class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      // a: props.a
      containers: [],
    };
  }

  componentDidMount() {
    const {
      containers
    } = this.props;

    this.setState({ containers });
  }

  render() {
    const {
      containers
    } = this.state;
    return (
      <>
        {
          containers.map((container) => {
            return (
              <Container key={`bio-container-${container.id}`} container={container} />
            )
          })
        }
      </>
    );
  }
}

Bio.propTypes = {
  // prop types go here
  containers: PropTypes.instanceOf(Object).isRequired,
};

export default Bio;
export { componentId as bioId }
