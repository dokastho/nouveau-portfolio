import { useCurrentEditor } from "@tiptap/react";
import React from 'react'


const CSSEditor = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null
  }

  return (
    <>
      <input
        type='textarea'
        onChange={(e) => { editor.chain().focus().setStyles(e.target.value).run() }}
        className={editor.isActive('css-editor') ? 'is-active' : ''}
      />
    </>
  )
}

export default CSSEditor