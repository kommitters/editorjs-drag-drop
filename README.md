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
