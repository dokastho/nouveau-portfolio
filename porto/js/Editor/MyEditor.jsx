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
import React from 'react'


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

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EditorProvider slotBefore={<><MenuBar /><CSSEditor /></>} slotAfter={<RawHTML />} extensions={extensions} content={content}></EditorProvider>
    )
  }
}