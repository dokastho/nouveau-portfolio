import './editor-styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
// import Typography from '@tiptap/extension-typography'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar'
import Div from './Div'
import RawHTML from './RawHTML'
import CSSEditor from './CSSEditor'

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
  // Typography,
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
  }

  componentDidMount() {
    const {
      content,
      css,
    } = this.props;
    const mounted = true;
    this.setState({
      content,
      css,
      mounted,
    });
  }

  handleCSSChange(css) {
    this.setState({ css });

    const {
      handleChange
    } = this.props;
    handleChange('css', css);
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
      <div key={`is-mounted-${mounted}`}>
        <EditorProvider
          slotBefore={
            <>
              <MenuBar />
              <CSSEditor
                css={css}
                handleChange={this.handleCSSChange}
                key={css}
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
  css: PropTypes.string.isRequired,
  // handleChange
}

export default MyEditor