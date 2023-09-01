import PropTypes from 'prop-types';
import React from 'react'
import EditTag from './EditTag';
import NewTag from './NewTag';

class EditTagBank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
    this.createTag = this.createTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.setTag = this.setTag.bind(this);
  }

  componentDidMount() {
    const {
      tags
    } = this.props;
    this.setState({ tags });
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
      id
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
        body: JSON.stringify({ id }),
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
      tags
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
