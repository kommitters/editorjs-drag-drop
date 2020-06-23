import './index.css';

/**
 * Drag/Drop feature for Editor.js.
 *
 * @typedef {Object} DragDrop
 * @description Feature's initialization class.
 * @property {Object} api — Editor.js API
 * @property {HTMLElement} holder — DOM element where the editor is initialized.
 * @property {Number} startBlock - Dragged block position.
 * @property {Number} endBlock - Position where the dragged block is gonna be placed.
 * @property {Function} setDragListener - Sets the drag events listener.
 * @property {Function} setDropListener - Sets the drop events listener.
 */
export default class DragDrop {
  /**
   * @param editor: object
   *   editor — Editor.js instance object
   */
  constructor(editor) {
    this.editor = editor;
    this.api = this.editor.blocks;
    this.holder = document.getElementById(this.editor.configuration.holder);

    this.startBlock = null;
    this.endBlock = null;

    this.setDragListener();
    this.setDropListener();
  }

  /**
   * Sets the drag events listener.
   */
  setDragListener() {
    const settingsButton = this.holder.querySelector('.ce-toolbar__settings-btn');

    settingsButton.setAttribute('draggable', 'true');
    settingsButton.addEventListener('dragstart', () => {
      this.startBlock = this.api.getCurrentBlockIndex();
    });
  }

  /**
   * Sets the drop events listener.
   */
  setDropListener() {
    document.addEventListener('drop', (event) => {
      const { target } = event;
      if (this.holder.contains(target)) {
        const dropTarget = this.getDropTarget(target);
        if (dropTarget) {
          this.endBlock = this.getTargetPosition(dropTarget);
          this.moveBlocks();
        }
      }
    });
  }

  /**
   * Returns the closest block DOM element to the drop event target.
   *
   * @param {HTMLElement} target  DOM element which received the drop event.
   * @returns {HTMLElement}
   */
  getDropTarget(target) {
    return target.classList.contains('ce-block')
      ? target
      : target.closest('.ce-block');
  }

  /**
   * Returns the target position in the child subtree.
   *
   * @param {HTMLElement} target  DOM element which received the drop event.
   * @returns {Number}
   */
  getTargetPosition(target) {
    return Array.from(target.parentNode.children).indexOf(target);
  }

  /**
   * Moves the dragged element to the drop position.
   *
   * @see {@link https://editorjs.io/blocks#move}
   */
  moveBlocks() {
    this.api.move(this.endBlock, this.startBlock);
  }
}
