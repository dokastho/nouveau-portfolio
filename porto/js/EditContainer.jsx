import PropTypes from 'prop-types';
import React from 'react'
import ConfirmatoryButton from './Buttons';
import EditTagBank from './EditTagBank';
import { EditorProvider } from '@tiptap/react';

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containerContent: {
        name: '',
        content: '',
        tags: [],
        id: 0,
      },
      saveState: SAVED,
    };
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const {
      containerContent
    } = this.props;

    this.setState({ containerContent });
  }

  handleChange(key, val) {
    const {
      containerContent
    } = this.state;
    containerContent[key] = val;
    this.setState({ containerContent, saveState: UNSAVED });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ saveState: SAVING });
      this.doSave();
    }, 1000);
  }

  doSave() {
    const {
      updateContainer
    } = this.props;
    const {
      containerContent
    } = this.state;
    updateContainer(containerContent);
    this.setState({
      saveState: SAVED,
    })
  }

  render() {
    const {
      containerContent,
      saveState
    } = this.state;
    const {
      name,
      content,
      id,
      tags,
    } = containerContent;
    const {
      deleteContainer,
      setTags,
    } = this.props;
    return (
      <>
        <label>Name</label>
        <input type='text' value={name} required onChange={(e) => { this.handleChange('name', e.target.value) }} />
        <br />
        <label>Content</label>
        <EditorProvider
          content={content}
        />
        <br />
        <ConfirmatoryButton
          text={'Delete Container'}
          callback={deleteContainer}
          args={{ id }}
        />
        <br />
        <br />
        <div className='save-state'>{saveState}</div>
        <EditTagBank
          key={`${id}-edit-tag-bank-${tags.length}`}
          containerId={id}
          tags={tags}
          setTags={setTags}
        />
      </>
    );
  }
}

EditContainer.propTypes = {
  // prop types go here
  containerContent: PropTypes.instanceOf(Object).isRequired,
  // updateContainer
  // deleteContainer
};

export default EditContainer

// could have delete function here and then remove the inefficient whole-state fetch from API