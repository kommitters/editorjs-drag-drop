const editor = {
  blocks: {
    getCurrentBlockIndex: jest.fn(() => 0),
    move: jest.fn(),
  },
  configuration: {
    holder: 'editorjs',
  },
};

export default editor;
