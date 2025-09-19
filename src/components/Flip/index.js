
export class Flip {
  constructor(options = {}) {
    this.animateOptions = options.animateOptions || {}
    this.action = options.action || []
  }

  // 记录元素初始状态
  captureState(element) {
    const state={
        transform: style.transform
    }
    this.action.forEach(act=>{
        if(['size','position'].includes(act)){
            state.rect=element.getBoundingClientRect()
        }else{
            state[action]=window.getComputedStyle(element)[action]
        }
    })
    return state
  }

  // 执行FLIP动画流程
  animate(element, firstState, lastState) {
    let transform = ''
    if(this.action.includes('position')){
        const invertX = firstState.rect.left - lastState.rect.left;
        const invertY = firstState.rect.top - lastState.rect.top;
        transform = `translate(${invertX}px, ${invertY}px)`
    }
    if(this.action.includes('size')){
        const invertScaleX = firstState.rect.width / lastState.rect.width;
        const invertScaleY = firstState.rect.height / lastState.rect.height;
        transform += ` scale(${invertScaleX}, ${invertScaleY})`
    }
    if(transform){
        element.style.transformOrigin = '0 0';
    }

    Object.keys(firstState).forEach(key => {
      if(key !== 'rect'){
        element.style[key] = firstState[key];
      }
    });
    // 触发重绘
    element.getBoundingClientRect();

    // 播放正向动画
    return new Promise(resolve => {
      element.style.transition = `
        transform ${this.duration}ms ${this.easing},
        opacity ${this.duration}ms ${this.easing}
      `;
      
      requestAnimationFrame(() => {
        element.style.transform = '';
        element.style.opacity = '';
        
        const onTransitionEnd = () => {
          element.removeEventListener('transitionend', onTransitionEnd);
          element.style.transition = '';
          resolve();
        };
        
        element.addEventListener('transitionend', onTransitionEnd);
      });
    });
  }

  captureFirstState(element){
    this.first = this.captureState(element);
  }

  // 封装快捷方法
  async flip(element) {
    const last = this.captureState(element);
    return this.animate(element, this.first, last);
  }
}
