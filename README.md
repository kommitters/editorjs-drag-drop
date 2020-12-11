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


## Contributing and Development
Bug reports and pull requests are welcome on GitHub https://github.com/kommitters/editorjs-drag-drop. Everyone is welcome to participate in the project. If you are thinking about contributing to the project, please check our [Contributing Guide](https://github.com/kommitters/editorjs-drag-drop/blob/master/CONTRIBUTING.md).

## Changelog
See the [CHANGELOG](https://github.com/kommitters/editorjs-drag-drop/blob/master/CHANGELOG.md) for versions details.

## License
See [LICENSE](https://github.com/kommitters/editorjs-drag-drop/blob/master/LICENSE) for details.

## Credits
Made with 💙 by [kommit](https://kommit.co)
