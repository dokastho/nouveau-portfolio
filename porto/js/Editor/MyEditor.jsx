import './editor-styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Focus from '@tiptap/extension-focus'
import Image from '@tiptap/extension-image'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar'
import Div from './Div'
import RawHTML from './RawHTML'
import CSSEditorButton from './CSSEditor'

import PropTypes from 'prop-types';
import React from 'react'
import ContentHandler from './ContentHandler'
import ImageMenu from './ImageMenu'
import AddImage from './AddImage'


const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Focus.configure({
    className: 'has-focus',
    mode: 'deepest',
  }),
  Typography,
  Image,
  Div,
]

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      css: '',
      mounted: false,
      url: null,
    };
    this.handleCSSChange = this.handleCSSChange.bind(this);
    this.getCSS = this.getCSS.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }

  componentDidMount() {
    const {
      content,
    } = this.props;
    const mounted = true;
    this.setState({
      content,
      mounted,
    });
  }

  handleCSSChange(css) {
    this.setState({ css });
  }

  getCSS() {
    const css = document.querySelector('*.has-focus')?.parentElement.style.cssText;
    if (css !== null) {
      this.handleCSSChange(css);
    }
  }

  setUrl(url) {
    this.setState({ url });
  }

  render() {
    const {
      content,
      css,
      mounted,
      url,
    } = this.state;
    const {
      handleChange,
    } = this.props;
    return (
      <div key={`is-mounted-${mounted}`} onClick={() => { this.getCSS() }}>
        <EditorProvider
          slotBefore={
            <>
              <MenuBar />
              <CSSEditorButton
                css={css}
              />
              <ImageMenu callback={this.setUrl} />
              <AddImage url={url} callback={this.setUrl} />
            </>
          }
          slotAfter={
            <>
              <ContentHandler
                handleChange={handleChange}
              />
              <div className='extra-container-info'>
                <textarea
                  className='css-editor'
                  value={css}
                  onChange={(e) => { this.handleCSSChange(e.target.value) }}
                />
                <RawHTML />
              </div>
            </>
          }
          extensions={extensions}
          content={content}>
        </EditorProvider>
      </div>
    )
  }
}

MyEditor.propTypes = {
  content: PropTypes.string.isRequired,
  // handleChange
}

export default MyEditor