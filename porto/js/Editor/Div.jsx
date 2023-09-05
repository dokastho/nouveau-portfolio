import { Node } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/react'
import React from 'react'

const Div = Node.create({
  name: 'div',

  priority: 1000,

  addOptions: {
    HTMLAttributes: {
      class: "placeholder",
      style: "",
    },
  },

  addAttributes() {
    return {
      style: {
        // Set the color attribute according to the value of the `data-color` attribute
        parseHTML: element => element.getAttribute('style'),
      }
    }
  },

  content: 'block+',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      { tag: 'div' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setDiv: () => ({ commands }) => {
        return commands.wrapIn(this.name)
      },
      unsetDiv: () => ({ commands }) => {
        return commands.lift(this.name)
      },
      setStyles: (styleString) => ({ commands }) => {
        return commands.updateAttributes(this.name, { style: styleString });
      }
    }
  },
});

export default Div