import PropTypes from 'prop-types';
import React from 'react'
import { bioId } from './Bio';
// import { expId } from './Bio';
// import { eduId } from './Bio';
// import { prjId } from './Bio';

class NewContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containerContent: {
        name: '',
        content: '',
        topic: ''
      },
      selected: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  componentDidMount() {
    const { topic } = this.props;
    const {
      containerContent
    } = this.state;

    containerContent.topic = topic;

    this.setState({ containerContent });
  }

  handleChange(key, val) {
    const {
      containerContent
    } = this.state;
    containerContent[key] = val;
    this.setState({ containerContent });
  }

  handleSubmit() {
    const {
      createContainer
    } = this.props;
    const {
      containerContent
    } = this.state;
    createContainer(containerContent);
    this.setState({
      containerContent: {
        name: '',
        content: '',
      },
      selected: false,
    })
  }

  toggleSelect() {
    const {
      selected
    } = this.state;
    if (selected) {
      this.setState({
        containerContent: {
          name: '',
          content: '',
        },
        selected: false,
      })
    } else {
      this.setState({
        selected: true,
      });
    } 
  }

  render() {
    const {
      selected,
      containerContent
    } = this.state;
    const {
      name,
      content,
    } = containerContent;
    return (
      <>
        {
          selected ? (
            <form onSubmit={this.handleSubmit}>
              <label>Name</label>
              <input type='text' value={name} required onChange={(e) => { this.handleChange('name', e.target.value) }} />
              <br />
              <label>Content</label>
              <div>placeholder</div>
              <br />
              <input type='button' value={'cancel'} onClick={() => {this.toggleSelect()}} />
              <br />
              <input type='submit' value={'Create'} />
            </form>
          ) : (
            <div className='create-container' onClick={() => { this.toggleSelect() }}>Create a new container</div>
          )
        }
      </>
    );
  }
}

NewContainer.propTypes = {
  // prop types go here
  topic: PropTypes.string.isRequired,
  // createContainer
};

export default NewContainer

// name
// content
// tags