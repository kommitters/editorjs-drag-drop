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
  constructor({
    configuration,
    blocks,
    toolbar,
    save,
  }, borderStyle) {
    this.toolbar = toolbar;
    this.borderStyle = borderStyle || '1px dashed #aaa';
    this.api = blocks;
    this.holder = typeof configuration.holder === 'string' ? document.getElementById(configuration.holder) : configuration.holder;
    this.readOnly = configuration.readOnly;
    this.startBlock = null;
    this.endBlock = null;
    this.save = save;

    this.setDragListener();
    this.setDropListener();
  }

  /**
   * Sets the cursor at the begining of the drag element
   */
  setElementCursor(element) {
    if (!element) return;
    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(element.childNodes[0], 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  }

  /**
   * Sets the drag events listener.
   */
  setDragListener() {
    if (!this.readOnly) {
      const settingsButton = this.holder.querySelector('.ce-toolbar__settings-btn');
      if (settingsButton) {
        this.initializeDragListener(settingsButton);
      } else {
        // If there's no settings button, we wait for it to be added to the DOM
        const observer = new MutationObserver((mutations, obs) => {
          const settingsButton = this.holder.querySelector(
            ".ce-toolbar__settings-btn"
          );
          if (settingsButton) {
            this.initializeDragListener(settingsButton);
            obs.disconnect();
          }
        });

        observer.observe(this.holder, {
          childList: true,
          subtree: true,
        });
      }
    }
  }

  initializeDragListener(settingsButton) {
    settingsButton.setAttribute("draggable", "true");
    settingsButton.addEventListener("dragstart", () => {
      this.startBlock = this.api.getCurrentBlockIndex();
    });
      settingsButton.addEventListener('drag', () => {
      this.toolbar.close(); // this closes the toolbar when we start the drag
      if (!this.isTheOnlyBlock()) {
          const allBlocks = this.holder.querySelectorAll('.ce-block');
          const blockFocused = this.holder.querySelector('.ce-block--drop-target');
          this.setElementCursor(blockFocused);
          this.setBorderBlocks(allBlocks, blockFocused);
        }
      });
    }
     
  /**
   * Sets dinamically the borders in the blocks when a block is dragged
   * @param {object} allBlocks Contains all the blocks in the holder
   * @param {HTMLElement} blockFocused Is the element where the dragged element will be dropped.
   */

  setBorderBlocks(allBlocks, blockFocused) {
    Object.values(allBlocks).forEach((block) => {
      const blockContent = block.querySelector('.ce-block__content');
      if (block !== blockFocused) {
        blockContent.style.removeProperty('border-top');
        blockContent.style.removeProperty('border-bottom');
      } else {
        const index = Object.keys(allBlocks).find((key) => allBlocks[key] === blockFocused);
        if (index > this.startBlock) blockContent.style.borderBottom = this.borderStyle;
        else blockContent.style.borderTop = this.borderStyle;
      }
    });
  }

  /**
   * Sets the drop events listener.
   */
  setDropListener() {
    document.addEventListener('drop', (event) => {
      const { target } = event;
      if (this.holder.contains(target) && this.startBlock !== null) {
        const dropTarget = this.getDropTarget(target);
        if (dropTarget) {
          const blockContent = dropTarget.querySelector('.ce-block__content');
          blockContent.style.removeProperty('border-top');
          blockContent.style.removeProperty('border-bottom');
          this.endBlock = this.getTargetPosition(dropTarget);
          this.moveBlocks();
        }
      }
      this.startBlock = null;
    });
  }

  /**
   * Notify core that read-only mode is suppoorted
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
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

  isTheOnlyBlock() {
    return this.api.getBlocksCount() === 1;
  }

  /**
   * Moves the dragged element to the drop position.
   *
   * @see {@link https://editorjs.io/blocks#move}
   */
  moveBlocks() {
    if (!this.isTheOnlyBlock()) {
      this.api.move(this.endBlock, this.startBlock);
    }
  }
}
