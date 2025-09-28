
export class Flip {
  constructor(options = {}) {
    this.animateOption = options.animateOption || {}
    this.styles = options.styles || ['position-x','position-y','width','height']
    this.name = options.name
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
    if(!state.transform){
      state.transform='matrix(1, 0, 0, 1, 0, 0)'
    }
    this.styles.forEach(style=>{
      if(!['position-x','position-y','transform'].includes(style)){
        state.styles[style] = computedStyle[style]
      }
    })
    return state
  }

 getKeyFrame(firstState, lastState) {
    const { rect:firstRect, transform, styles } = firstState;
    const { rect:lastRect, transform: lastTransform, styles: lastStyles } = lastState;
    const firstAnimateKeyframe ={...styles}
    const lastAnimateKeyframe ={...lastStyles}
    if(this.styles.includes('width')){
      firstAnimateKeyframe.width = `${firstRect.offsetWidth}px`
      lastAnimateKeyframe.width = `${lastRect.offsetWidth}px`
    }
    if(this.styles.includes('height')){
      firstAnimateKeyframe.height = `${firstRect.offsetHeight}px`
      lastAnimateKeyframe.height = `${lastRect.offsetHeight}px`
    }
    const isSameSize=firstRect.offsetWidth===lastRect.offsetWidth && firstRect.offsetHeight===lastRect.offsetHeight;
    let diffX = isSameSize?firstRect.center.x - lastRect.center.x:firstRect.left - lastRect.left;
    let diffY = isSameSize?firstRect.center.y - lastRect.center.y:firstRect.top - lastRect.top;
    let firstMatrix = transform.slice(7,-1).split(',').map(Number)
    const lastMatrix = lastTransform.slice(7,-1).split(',').map(Number)
    diffX=lastMatrix[4]+diffX
    diffY=lastMatrix[5]+diffY
    if(this.styles.includes('position-x')){
      firstMatrix[4] = firstMatrix[4] + diffX
    }else{
      firstMatrix[4] = lastMatrix[4]
    }
    if(this.styles.includes('position-y')){
      firstMatrix[5] = firstMatrix[5] + diffY
    }else{
      firstMatrix[5] = lastMatrix[5]
    }
    if(!this.styles.includes('transform')){
      firstMatrix =[...lastMatrix.slice(0,4),firstMatrix[4],firstMatrix[5]]
    }
    firstAnimateKeyframe.transform = `matrix(${firstMatrix.join(',')})`
    return {
        firstAnimateKeyframe,
        lastAnimateKeyframe
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
