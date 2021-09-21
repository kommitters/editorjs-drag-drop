![](https://badgen.net/badge/Editor.js/v2.0/blue)

# EditorJS Drag/Drop Plugin

Drag/Drop feature for [Editor.js](https://editorjs.io).

![](assets/demo.gif)

## Installation

### Install via NPM

Get the package

```shell
$ npm i --save-dev editorjs-drag-drop
```

Include module at your application

```javascript
import DragDrop from 'editorjs-drag-drop';
```

## Usage

```javascript
const editor = new EditorJS({
  onReady: () => {
    new DragDrop(editor);
  },
});
```

Select the block, drag the toolbar settings button and drop it at the desired position.

If you're already using [editorjs-undo](https://github.com/kommitters/editorjs-undo), then your code will look somewhat like this:

```javascript
const editor = new EditorJS({
  onReady: () => {
    new Undo({ editor });
    new DragDrop(editor);
  },
});
```
### Usage with [react-editor-js](https://github.com/Jungwoo-An/react-editor-js).

If you are using [react-editor-js](https://github.com/Jungwoo-An/react-editor-js), you could create a function to handle the onReady property, the function will store the DragDrop instance. Then, you must call the function in onReady in the editorJS instance.   

```javascript
const handleReady = (editor) => {
  new DragDrop(editor);
};

class ReactEditor extends Component {
  render() {
    return (
      <EditorJs
        onReady = { handleReady }
        tools = { ... }
      />
    )
  }
}
```
**Note:** If you are already using [editorjs-undo](https://github.com/kommitters/editorjs-undo) your handleReady function must have the editorjs-undo instance.

```javascript
const handleReady = (editor) => {
  new Undo({ editor });
  new DragDrop(editor);
};

```

## Development

**Development mode**

```shell
$ yarn build:dev
```

**Production release**

1. Create a production bundle

```shell
$ yarn build
```

2. Commit `dist/bundle.js`

**Run tests**

```shell
$ yarn test
```

## Code of conduct
We welcome everyone to contribute. Make sure you have read the [CODE_OF_CONDUCT][coc] before.

## Contributing
For information on how to contribute, please refer to our [CONTRIBUTING][contributing] guide.

## Changelog
Features and bug fixes are listed in the [CHANGELOG][changelog] file.

## License
This library is licensed under an MIT license. See [LICENSE][license] for details.

## Acknowledgements
Made with 💙 by [kommitters Open Source](https://kommit.co)

[license]: https://github.com/kommitters/editorjs-drag-drop/blob/master/LICENSE
[coc]: https://github.com/kommitters/editorjs-drag-drop/blob/master/CODE_OF_CONDUCT.md
[changelog]: https://github.com/kommitters/editorjs-drag-drop/blob/master/CHANGELOG.md
[contributing]: https://github.com/kommitters/editorjs-drag-drop/blob/master/CONTRIBUTING.md
