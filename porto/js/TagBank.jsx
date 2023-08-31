import PropTypes from 'prop-types';
import React from 'react'
import Tag from './Tag';

class TagBank extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      tags,
      containerId,
    } = this.props;
    return (
      <>
        <div className='tag-bank'>
          {
            tags.map((tag) => {
              return (
                <Tag key={`${containerId}-tag-${tag.name}`} tag={tag} />
              )
            })
          }
        </div>
      </>
    );
  }
}

TagBank.propTypes = {
  // prop types go here
  containerId: PropTypes.number.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
};

export default TagBank
