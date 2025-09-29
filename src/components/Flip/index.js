
function matrix2dTo3d(matrix2d) {
    const [a, b, c, d, tx, ty] = matrix2d;

    // 构造3D矩阵，Z轴保持不变
    const matrix3d = [
        a,  b,  0,  0,  // 第一列
        c,  d,  0,  0,  // 第二列
        0,  0,  1,  0,  // 第三列
        tx, ty, 0,  1   // 第四列
    ];

    return matrix3d;
}

const getTransformMatrix=(transform)=>{
  const  prefixLength = transform.startsWith('matrix3d') ? 9 : 7;
  return transform.slice(prefixLength, -1).split(',').map(Number);
}
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
    const firstAnimateKeyframe = {...styles};
    const lastAnimateKeyframe = {...lastStyles};
    
    if(this.styles.includes('width')){
        firstAnimateKeyframe.width = `${firstRect.offsetWidth}px`;
        lastAnimateKeyframe.width = `${lastRect.offsetWidth}px`;
    }
    if(this.styles.includes('height')){
        firstAnimateKeyframe.height = `${firstRect.offsetHeight}px`;
        lastAnimateKeyframe.height = `${lastRect.offsetHeight}px`;
    }
    const is3D = transform.startsWith('matrix3d') || lastTransform.startsWith('matrix3d');
    const isSameSize = !is3D && firstRect.offsetWidth === lastRect.offsetWidth && 
                      firstRect.offsetHeight === lastRect.offsetHeight;
    let diffX = isSameSize ? firstRect.center.x - lastRect.center.x : firstRect.left - lastRect.left;
    let diffY = isSameSize ? firstRect.center.y - lastRect.center.y : firstRect.top - lastRect.top;

    // 兼容matrix和matrix3d的解析
    const matrixSize = is3D ? 16 : 6;
    let firstMatrix = getTransformMatrix(transform)
    let lastMatrix = getTransformMatrix(lastTransform)

    // 确保矩阵长度正确
    if (firstMatrix.length !== matrixSize){
      firstMatrix = matrix2dTo3d(firstMatrix)
    };
    if (lastMatrix.length !== matrixSize){
      lastMatrix = matrix2dTo3d(lastMatrix)
    }

    // 3D矩阵的位置索引不同
    const xIndex = is3D ? 12 : 4;
    const yIndex = is3D ? 13 : 5;
    
    diffX = transform === lastTransform ? lastMatrix[xIndex] + diffX : 0;
    diffY = transform === lastTransform ? lastMatrix[yIndex] + diffY : 0;

    if(this.styles.includes('position-x')){
        firstMatrix[xIndex] = firstMatrix[xIndex] + diffX;
    }else{
        firstMatrix[xIndex] = lastMatrix[xIndex];
    }

    if(this.styles.includes('position-y')){
        firstMatrix[yIndex] = firstMatrix[yIndex] + diffY;
    }else{
        firstMatrix[yIndex] = lastMatrix[yIndex];
    }

    if(!this.styles.includes('transform')){
      const matrix = lastMatrix.slice()
      matrix[xIndex] = firstMatrix[xIndex]
      matrix[yIndex] = firstMatrix[yIndex]
      firstMatrix = matrix;
    }

    firstAnimateKeyframe.transform = is3D ? 
        `matrix3d(${firstMatrix.join(',')})` : 
        `matrix(${firstMatrix.join(',')})`;

    return {
        firstAnimateKeyframe,
        lastAnimateKeyframe
    };
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
