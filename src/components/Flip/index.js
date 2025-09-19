
export class Flip {
  constructor(options = {}) {
    this.animateOption = options.animateOption || {}
    this.styles = options.styles || []
  }

  // 记录元素初始状态
  captureState(element) {
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    rect.offsetWidth=element.offsetWidth
    rect.offsetHeight=element.offsetHeight
    rect.center = {
        x:rect.left+rect.width/2,
        y:rect.top+rect.height/2
    }
    const state={
        transform: computedStyle.transform==='none'?'':computedStyle.transform,
        rect,
        styles:{}
    }
    this.styles.forEach(style=>{
        state.styles[style] = computedStyle[style]
    })
    return state
  }

 getKeyFrame(firstState, lastState) {
    const { rect:firstRect, transform, styles } = firstState;
    const { rect:lastRect, transform: lastTransform, styles: lastStyles } = lastState;
    const diffX = firstRect.center.x - lastRect.center.x;
    const diffY = firstRect.center.y - lastRect.center.y;
    return {
        firstAnimateKeyframe:{
            ...styles,
            width: `${firstRect.offsetWidth}px`,
            height: `${firstRect.offsetHeight}px`,
            transform: `translateX(${diffX}px) translateY(${diffY}px) ${transform}`
        },
        lastAnimateKeyframe: {
            ...lastStyles,
            width: `${lastRect.offsetWidth}px`,
            height: `${lastRect.offsetHeight}px`,
            transform: lastTransform
        }
    }
  }

  // 执行FLIP动画流程
  animate(element, firstState, lastState) {
    this.isRunning = true;
    const {firstAnimateKeyframe, lastAnimateKeyframe}=this.getKeyFrame(firstState,lastState)
    const animation = element.animate([
      firstAnimateKeyframe,
      lastAnimateKeyframe
    ], this.animateOption);

    return new Promise(resolve => {
        animation.onfinish = () => {
            this.isRunning = false;
            resolve();
        };
    });
  }

  captureFirstState(element){
    this.first = this.captureState(element);
  }

  async flip(element) {
    if (this.isRunning) {
      return;
    }
    const last = this.captureState(element);
    return this.animate(element, this.first, last);
  }
}
