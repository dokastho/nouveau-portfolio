import { useCurrentEditor } from "@tiptap/react";
import React from 'react'


function AddImage({ url, callback }) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null
  }

  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
    callback(null);
  }
}

export default AddImage