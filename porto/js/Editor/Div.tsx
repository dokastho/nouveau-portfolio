
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      div: {
        /**
         * wrap in div node
         */
        setDiv: () => ReturnType,
        /**
         * lift from div node
         */
        unsetBlockquote: () => ReturnType,
      }
    }
  }
