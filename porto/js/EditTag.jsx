import PropTypes from 'prop-types';
import React from 'react'
import Tag from './Tag';
import ConfirmatoryButton from './Buttons';

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      tag: {
        name: '',
        colorHex: '',
        id: 0,
      },
      selected: false,
      saveState: SAVED,
    };
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const {
      tag
    } = this.props;

    this.setState({
      tag
    });
  }

  handleChange(key, val) {
    const {
      tag
    } = this.state;
    tag[key] = val;
    this.setState({ tag, saveState: UNSAVED });
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
      tag
    } = this.state;
    const {
      name,
      colorHex,
      id
    } = tag;
    fetch(`/api/v1/tags/update/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, colorHex, id }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          tag: data,
          saveState: SAVED,
        });
      })
      .catch((error) => console.log(error));
  }

  toggleSelect() {
    const {
      selected
    } = this.state;
    if (selected) {
      const {
        setTag,
        index,
      } = this.props;
      const {
        tag
      } = this.state;
      setTag(tag, index);
    }
    this.setState({ selected: !selected });
  }

  render() {
    const {
      tag,
      selected,
      saveState,
    } = this.state;
    const {
      name,
      colorHex,
      id,
    } = tag;
    const {
      deleteTag,
      containerId,
    } = this.props;
    return (
      <>
        {
          selected ? (
            <>
              <div className='tag'>
                <label>Name</label>
                <input type='text' value={name} required onChange={(e) => { this.handleChange('name', e.target.value) }} />
                <br />
                <label>Color Hex Code</label>
                <input type='text' value={colorHex} required onChange={(e) => { this.handleChange('colorHex', e.target.value) }} />
                <br />
                <ConfirmatoryButton text={'Delete Tag'} callback={deleteTag} args={{ id }} />
                <br />
                <br />
                <div className='save-state'>{saveState}</div>
                <div className='pointer' onClick={() => { this.toggleSelect() }}>Done</div>
              </div>
            </>
          ) : (
            <div className='pointer' onClick={() => { this.toggleSelect() }}>
              <Tag key={`${containerId}-tag-${tag.id}`} tag={tag} />
            </div>
          )
        }

      </>
    );
  }
}

EditTag.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
  tag: PropTypes.instanceOf(Object).isRequired,
  containerId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  // setTag
};

export default EditTag
