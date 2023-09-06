import PropTypes from 'prop-types';
import React from 'react'
import TagBank from './TagBank';
import { ADMIN } from './Bootstrapper';
import EditContainer from './EditContainer';
import HTMLWrapper from './HTMLWrapper'

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      container: {
        name: '',
        content: '',
        id: 0,
        ts: '',
        created: '',
        tags: [],
      },
      selected: false,
    };
    this.updateContainer = this.updateContainer.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.setTags = this.setTags.bind(this);
  }

  componentDidMount() {
    const {
      container
    } = this.props;

    this.setState({
      container
    });
  }

  toggleSelect() {
    const {
      selected
    } = this.state;
    this.setState({ selected: !selected });
  }

  setTags(tags) {
    const {
      container
    } = this.state;
    container.tags = tags;
    this.setState({ container });
  }

  updateContainer(container) {
    const {
      name,
      content,
      id,
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
        this.setState({
          container: data
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      selected,
      container
    } = this.state;
    const {
      name,
      content,
      id,
      ts,
      created,
      tags,
    } = container;
    const {
      deleteContainer,
    } = this.props;
    return (
      <>
        {
          selected ? (
            <>
              <EditContainer
                containerContent={container}
                updateContainer={this.updateContainer}
                deleteContainer={deleteContainer}
                setTags={this.setTags}
              />
              <div className={`${ADMIN ? 'pointer' : 'normal'}`} onClick={() => { this.toggleSelect() }}>Done</div>
            </>
          ) : (
            <div key={`view-${created}`} className={`container ${ADMIN ? 'pointer' : 'normal'}`} onClick={ADMIN ? () => { this.toggleSelect() } : null}>
              <h1 className='container-name'>{name}</h1>
              <div className='container-content'>
                <HTMLWrapper content={content} />
              </div>
              <TagBank
                key={`${id}-tag-bank-${tags.length}`}
                tags={tags}
                containerId={id}
              />
            </div>
          )
        }
        <div>Updated {ts}</div>
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
