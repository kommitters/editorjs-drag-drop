/**
 * Mocks Editor.js instance object.
 */
const editor = {
  blocks: {
    getCurrentBlockIndex: jest.fn(() => 0),
    getBlocksCount: jest.fn(() => 2),
    move: jest.fn(),
  },
  configuration: {
    holder: 'editorjs',
  },
  toolbar: {
    close: jest.fn()
  }
};

export default editor;
