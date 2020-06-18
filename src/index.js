import './index.css';

export default class DragDrop {
  constructor(editor) {
    this.editor = editor;
    this.api = this.editor.blocks;
    this.holder = document.getElementById(this.editor.configuration.holder);

    this.startBlock = null;
    this.endBlock = null;

    this.setDragListener();
    this.setDropListener();
  }

  setDragListener() {
    const settingsButton = this.holder.querySelector('.ce-toolbar__settings-btn');

    settingsButton.setAttribute('draggable', 'true');
    settingsButton.addEventListener('dragstart', () => {
      this.startBlock = this.api.getCurrentBlockIndex();
    });
  }

  setDropListener() {
    document.addEventListener('drop', (el) => {
      const { target } = el;
      if (this.holder.contains(target)) {
        const dropTarget = this.getDropTarget(target);
        if (dropTarget) {
          this.endBlock = this.getTargetPosition(dropTarget);
          this.moveBlocks();
        }
      }
    });
  }

  getDropTarget(target) {
    return target.classList.contains('ce-block')
      ? target
      : target.closest('.ce-block');
  }

  getTargetPosition(target) {
    return Array.from(target.parentNode.children).indexOf(target);
  }

  moveBlocks() {
    this.api.move(this.endBlock, this.startBlock);
  }
}
