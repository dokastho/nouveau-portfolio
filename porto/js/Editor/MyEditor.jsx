import './editor-styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Focus from '@tiptap/extension-focus'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar'
import Div from './Div'
import RawHTML from './RawHTML'
import CSSEditorButton from './CSSEditor'

import PropTypes from 'prop-types';
import React from 'react'
import ContentHandler from './ContentHandler'


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
    mode: 'all',
  }),
  Typography,
  Div,
]

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      css: '',
      mounted: false,
    };
    this.handleCSSChange = this.handleCSSChange.bind(this);
    this.getCSS = this.getCSS.bind(this);
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
    const css = document.querySelector('div.has-focus')?.style.cssText;
    if (css !== null) {
      this.handleCSSChange(css);
    }
  }

  render() {
    const {
      content,
      css,
      mounted,
    } = this.state;
    const {
      handleChange,
    } = this.props;
    return (
      <div key={`is-mounted-${mounted}`} onClick={() => {this.getCSS()}}>
        <EditorProvider
          slotBefore={
            <>
              <MenuBar />
              <input 
                type='textarea'
                value={css}
                onChange={(e) => {this.handleCSSChange(e.target.value)}}
              />
              <CSSEditorButton
                css={css}
              />
            </>
          }
          slotAfter={
            <>
              <ContentHandler
                handleChange={handleChange}
              />
              <RawHTML />
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