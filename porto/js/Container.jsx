import PropTypes from 'prop-types';
import React from 'react'
import TagBank from './TagBank';
import { ADMIN } from './Bootstrapper';
import EditContainer from './EditContainer';

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      id: 0,
      selected: false,
    };
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  componentDidMount() {
    const { container } = this.props;
    const {
      name,
      content,
      id
    } = container;

    this.setState({
      name,
      content,
      id
    });
  }

  toggleSelect() {
    const {
      selected
    } = this.state;
    this.setState({ selected: !selected });
  }

  render() {
    const {
      name,
      content,
      id,
      selected
    } = this.state;
    const {
      updateContainer,
      deleteContainer,
    } = this.props;
    return (
      <>
        {
          selected ? (
            <>
            <EditContainer
              content={{ name, content, id }}
              updateContainer={updateContainer}
              deleteContainer={deleteContainer}
            />
            <div className='pointer' onClick={() => { this.toggleSelect() }}>Done</div>
            </>
          ) : (
            <div className='container pointer' onClick={ADMIN ? () => { this.toggleSelect() } : null}>
              <h1 className='container-name'>{name}</h1>
              <div className='container-content'>{content}</div>
              <TagBank />
            </div>
          )
        }
      </>
    );
  }
}

Container.propTypes = {
  // prop types go here
  container: PropTypes.instanceOf(Object).isRequired,
  // tags: PropTypes.instanceOf(Array).isRequired,
};

export default Container

// name
// content
// tags