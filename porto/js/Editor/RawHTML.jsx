import { useCurrentEditor } from "@tiptap/react"
import React from 'react'

const RawHTML = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }
  return (
    <>
      <div className='raw-html'>
        {editor.getHTML()}
      </div>
    </>
  )
}

export default RawHTML