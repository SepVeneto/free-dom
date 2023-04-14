import { UnwrapNestedRefs } from 'vue-demi';
import { clamp, snapToGrid } from '../util';

const MIN_SIZE = 20;

export function useResize (
  startX: number,
  startY: number,
  rect: UnwrapNestedRefs<any>,
  dot: string,
  diagonal: boolean,
  snapGrid?: [number, number],
  callbacks?: any,
) {
  const isT = dot ? /t/.test(dot) : false;
  const isL = dot ? /l/.test(dot) : false;
  const isB = dot ? /b/.test(dot) : false;
  const isR = dot ? /r/.test(dot) : false;
  const isDiagonal = dot ? dot.length === 2 : false;

  const { width: cWidth, height: cHeight, x, y } = rect;

  const move = (mouseEvt: MouseEvent) => {
    const { clientX, clientY } = mouseEvt;
    let deltaX = clientX - startX;
    let deltaY = clientY - startY;
    if (Array.isArray(snapGrid)) {
      [deltaX, deltaY] = snapToGrid(snapGrid, deltaX, deltaY);
    }

    const rate = cWidth / cHeight;
    const newWidth = cWidth + (isL ? -deltaX : isR ? deltaX : 0);
    const newHeight = cHeight + (isT ? -deltaY : isB ? deltaY : 0);
    if (isDiagonal && diagonal) {
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        rect.x = x + (isL ? deltaX : 0);
        rect.width = clamp(newWidth, MIN_SIZE);

        rect.height = clamp(newWidth / rate, MIN_SIZE);
      } else {
        rect.y = y + (isT ? deltaY : 0);
        rect.height = clamp(newHeight, MIN_SIZE);

        rect.width = clamp(newHeight * rate, MIN_SIZE);
      }
    } else {
      rect.x = x + (isL ? deltaX : 0);
      rect.y = y + (isT ? deltaY : 0);
      rect.width = clamp(newWidth, MIN_SIZE);
      rect.height = clamp(newHeight, MIN_SIZE);
    }
    callbacks && callbacks.onMove && callbacks.onMove();
  };
  const up = () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    callbacks && callbacks.onMove && callbacks.onUp();
  };
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
}
