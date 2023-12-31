import PropTypes from 'prop-types';
import React from 'react'
import Container from './Container';
import NewContainer from './NewContainer';
import { ADMIN } from './Bootstrapper';

const componentId = "Education";

class Education extends React.Component {

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
      containerFunctions,
    } = this.props;

    const {
      createContainer,
      deleteContainer,
    } = containerFunctions;

    return (
      <>
        <div className='education-wrapper' id={componentId}>
          {
            containers.map((container) => {
              return (
                <Container
                  key={`${componentId}-container-${container.id}`}
                  container={container}
                  deleteContainer={deleteContainer}
                />
              )
            })
          }
          {
            ADMIN ? <NewContainer
              key={`${componentId}-container-new`}
              createContainer={createContainer}
              topic={componentId}
            /> : null
          }
        </div>
      </>
    );
  }
}

Education.propTypes = {
  // prop types go here
  containers: PropTypes.instanceOf(Object).isRequired,
  containerFunctions: PropTypes.instanceOf(Object).isRequired,
};

export default Education;
export { componentId as eduId }
