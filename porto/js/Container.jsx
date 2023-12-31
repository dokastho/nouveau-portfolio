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
      hovering: false,
      selected: false,
    };
    this.updateContainer = this.updateContainer.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.setHover = this.setHover.bind(this);
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

  setHover(b) {
    this.setState({ hovering: b });
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
      container,
      hovering,
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
              <div className='container'>
                <div className='container-flex'>
                  <div className='container-colored-stripe' />
                  <div className='container-content'>
                    <EditContainer
                      containerContent={container}
                      updateContainer={this.updateContainer} z
                      deleteContainer={deleteContainer}
                      setTags={this.setTags}
                    />
                    <br />
                    <div className={`button ${ADMIN ? 'pointer' : 'normal'}`} onClick={() => { this.toggleSelect() }}>Done</div>
                  </div>
                </div>
                <div className='updator center'>
                  Updated {ts}
                </div>
              </div>
            </>
          ) : (
            <div
              key={`view-${created}-${id}`}
              className={`container ${ADMIN ? 'pointer raise transition' : 'normal'}`}
              onClick={ADMIN ? () => { this.toggleSelect() } : null}
              onMouseOver={() => { this.setHover(true) }}
              onMouseLeave={() => { this.setHover(false) }}
            >
              <div className='container-flex'>
                <div className='container-colored-stripe' />
                <div className='container-content'>
                  <HTMLWrapper content={content} />
                  <TagBank
                    key={`${id}-tag-bank-${tags.length}`}
                    tags={tags}
                    containerId={id}
                  />
                </div>
              </div>
              <div className={`updator center transition ${hovering ? 'show' : 'hide'}`}>
                Updated {ts}
              </div>
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
