import PropTypes from 'prop-types';
import React from 'react'
import AddImage from './AddImage';
import Image from '../Image';

class ImageMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      images: [],
      opened: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/images/get/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          images: data,
        });
      })
      .catch((error) => console.log(error));
  }

  openMenu() {
    this.setState({ opened: true });
  }

  closeMenu(id) {
    if (id !== 'out') {
      return;
    }
    this.setState({ opened: false });
  }

  selectImage(args) {
    const { uuid } = args;
    const { callback } = this.props;
    this.closeMenu('out');
    callback(`/static/img/upload/${uuid}`);
  }

  render() {
    const {
      images,
      opened,
    } = this.state;

    return (
      <>
        {
          opened ? (
            <div className='image-menu-background' id='out' onClick={(e) => {this.closeMenu(e.target.id)}}>
              <div className='image-menu'>
                {
                  images.map((uuid, key) => {
                    return (
                      <Image uuid={`/static/img/upload/${uuid}`} key={key} imgClass='thumbnail' OnDoubleClick={this.selectImage} args={{ uuid }} />
                    )
                  })
                }
                <Image uuid='/static/icon/upload.svg' imgClass='thumbnail pointer' OnClick={console.log("upload photo function")} args={{}} />
              </div>
            </div>
          ) : (
            <button onClick={() => this.openMenu()}>Add Image</button>
          )
        }
      </>
    );
  }
}

// callback

export default ImageMenu
