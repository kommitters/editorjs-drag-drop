/**
 * Mocks Editor.js instance object.
 */
const editor = {
  blocks: {
    getCurrentBlockIndex: jest.fn(() => 0),
    getBlocksCount: jest.fn(() => 2),
    move: jest.fn(),
    getBlockByIndex: () => ({ holder: document.createElement("fake-html") }),
    update: () => { },
  },
  configuration: {
    holder: 'editorjs',
  },
  toolbar: {
    close: jest.fn()
  },
  save: () => new Promise((resolve) => resolve({
    "time": 1652202399816,
    "blocks": [
      {
        "id": "O7gb30g_c9",
        "type": "paragraph",
        "data": {
          "text": " Second "
        }
      }
    ],
    "version": "2.24.3"
  }))
};

export default editor;
