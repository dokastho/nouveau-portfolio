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
      ts: '',
      selected: false,
    };
    this.updateContainer = this.updateContainer.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  componentDidMount() {
    const { container } = this.props;
    const {
      name,
      content,
      id,
      ts,
      created,
    } = container;

    this.setState({
      name,
      content,
      id,
      ts,
      created,
    });
  }

  toggleSelect() {
    const {
      selected
    } = this.state;
    this.setState({ selected: !selected });
  }

  updateContainer(container) {
    const {
      name,
      content,
      id
    } = container;
    fetch(`/api/v1/containers/update/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content, id }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const {
          name,
          content,
          id,
          ts,
          created,
        } = data;
        this.setState({
          name,
          content,
          id,
          ts,
          created,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      name,
      content,
      id,
      ts,
      created,
      selected,
    } = this.state;
    const {
      deleteContainer,
    } = this.props;
    return (
      <>
        {
          selected ? (
            <>
              <EditContainer
                containerContent={{ name, content, id }}
                updateContainer={this.updateContainer}
                deleteContainer={deleteContainer}
              />
              <div>Updated {ts}</div>
              <div className='pointer' onClick={() => { this.toggleSelect() }}>Done</div>
            </>
          ) : (
            <div key={created} className='container pointer' onClick={ADMIN ? () => { this.toggleSelect() } : null}>
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
