import PropTypes from 'prop-types';
import React from 'react'
import EditTag from './EditTag';
import NewTag from './NewTag';
import Tag from './Tag';

class EditTagBank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      availableTags: [],
    }
    this.createTag = this.createTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.setTag = this.setTag.bind(this);
  }

  componentDidMount() {
    const {
      tags,
      containerId,
    } = this.props;
    fetch(`/api/v1/tags/distinct/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ containerId }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          tags,
          availableTags: data,
        });
      })
      .catch((error) => console.log(error));
  }

  addTag(tag) {
    const {
      containerId,
    } = this.props;
    fetch(`/api/v1/tags/add/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ containerId, tagId: tag.id }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({
          tags: prevState.tags.push(tag),
          availableTags: prevState.availableTags.filter((t) => t.id !== tag.id),
        }));
      })
      .catch((error) => console.log(error));
  }

  createTag(tag) {
    const {
      containerId,
      setTags
    } = this.props;
    const {
      name,
      colorHex,
    } = tag;
    fetch(`/api/v1/tags/new/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, colorHex, containerId }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.log(error));
  }

  deleteTag(tag) {
    const {
      id,
      containerId
    } = tag;
    const {
      setTags
    } = this.props;
    fetch(`/api/v1/tags/delete/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({containerId, id}),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        const {
          tags
        } = this.state;
        const newTags = tags.filter((t) => t.id !== id);
        setTags(newTags);
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  setTag(tag, index) {
    const {
      tags
    } = this.state;
    const {
      setTags
    } = this.props;
    tags[index] = tag;
    setTags(tags);
  }

  render() {
    const {
      tags,
      availableTags,
    } = this.state;
    const {
      containerId,
    } = this.props;
    return (
      <>
        <div className='tag-bank'>
          {
            tags.map((tag, index) => {
              return (
                <EditTag
                  key={`${containerId}-tag-${tag.name}`}
                  tag={tag}
                  index={index}
                  setTag={this.setTag}
                  containerId={containerId}
                  deleteTag={this.deleteTag}
                />
              )
            })
          }
          <div>Available Tags</div>
          <hr />
          {
            availableTags.map((tag) => {
              return (
                <div key={`${containerId}-available-tag-${tag.id}`} className='pointer' onClick={() => { this.addTag(tag) }}>
                  <Tag tag={tag} />
                </div>
              )
            })
          }
          <NewTag createTag={this.createTag} containerId={containerId} />
        </div>
      </>
    );
  }
}

EditTagBank.propTypes = {
  // prop types go here
  containerId: PropTypes.number.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
};

export default EditTagBank
