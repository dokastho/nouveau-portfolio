import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class Image extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.setLoaded = this.setLoaded.bind(this);
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      loaded
    } = this.state;
    const {
      uuid,
      imgClass,
      OnClick,
      OnDoubleClick,
      args,
    } = this.props;
    return (
      <div className={imgClass}>
        {
          loaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <img
          src={uuid}
          className={`photo ${loaded ? 'loaded' : 'loading-invis'}`}
          onLoad={() => { this.setLoaded() }}
          onClick={() => { OnClick ? OnClick(args) : null }}
          onDoubleClick={() => { OnDoubleClick ? OnDoubleClick(args) : null }}
        />
      </div>
    );
  }
}

Image.defaultProps = {
  imgClass: 'photo-slot'
}

Image.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  args: PropTypes.instanceOf(Object),
  // onClick
};

export default Image
