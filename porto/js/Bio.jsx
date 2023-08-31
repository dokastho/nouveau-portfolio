import PropTypes from 'prop-types';
import React from 'react'
import Container from './Container';
import NewContainer from './NewContainer';

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
    const {
      containerFunctions
    } = this.props;

    const {
      createContainer,
      deleteContainer,
    } = containerFunctions;

    return (
      <>
        {
          containers.map((container) => {
            return (
              <Container key={`${componentId}-container-${container.id}`} deleteContainer={deleteContainer} container={container} />
            )
          })
        }
        <NewContainer key={`${componentId}-container-new`} createContainer={createContainer} topic={componentId} />
      </>
    );
  }
}

Bio.propTypes = {
  // prop types go here
  containers: PropTypes.instanceOf(Object).isRequired,
  containerFunctions: PropTypes.instanceOf(Object).isRequired,
};

export default Bio;
export { componentId as bioId }
