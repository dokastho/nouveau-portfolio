import { useCurrentEditor } from "@tiptap/react";
import React from 'react'


const CSSEditorButton = ({ css }) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => { editor.chain().focus().selectParentNode().updateAttributes('div', { style: css }).run() }}
        className={editor.isActive('css-editor') ? 'is-active' : ''}
      >Set CSS</button >
    </>
  )
}

export default CSSEditorButton