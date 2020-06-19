import DragDrop from '../src/index';
import editor from './fixtures/editor';

describe('DragDrop', () => {
  const content = '<div id="editorjs">'
  + '<div id="first" class="ce-block"> First </div> <div id="second" class="ce-block"> Second </div>'
  + '<div class="ce-toolbar__settings-btn">Drag</div></div>';
  document.body.innerHTML = content;

  let dragDrop;
  let button;

  beforeEach(() => {
    dragDrop = new DragDrop(editor);
    button = dragDrop.holder.querySelector('.ce-toolbar__settings-btn');
    button.dispatchEvent(new Event('dragstart'));
  });

  it('executes getCurrentBlockIndex when button is dragged', () => {
    expect(editor.blocks.getCurrentBlockIndex).toBeCalled();
    expect(dragDrop.startBlock).toEqual(0);
  });

  const getTargetPosition = jest.spyOn(DragDrop.prototype, 'getTargetPosition');

  it('executes move when button is dropped', () => {
    const target = document.getElementById('second');
    target.dispatchEvent(new Event('drop', { bubbles: true }));
    expect(getTargetPosition).toBeCalled();
    expect(dragDrop.endBlock).toEqual(1);
    expect(editor.blocks.move).toBeCalledWith(1, 0);
  });
});
