import { useCurrentEditor } from "@tiptap/react"
import React from 'react'

const ContentHandler = ({handleChange}) => {
  const { editor } = useCurrentEditor()

  editor.on('update', ({ editor }) => {
    handleChange('content', editor.getHTML());
  })

  if (!editor) {
    return null
  }
  return (<>
  {/* this functional component only exists to interface with the API */}
  </>)
}

export default ContentHandler