window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 10
  let position = 11
  const gridBoxes = []
  let keycode
  let interval
  let newPosition

  const walls = [0,1,2,3,4,5,6,7,8,9,10,16,19,20,21,22,23,26,29,36,40,46,49,50,59,60,69,70,73,74,75,76,77,79,80,89,90,91,92,93,94,95,96,97,98,99]

  const pacDots = [12,13,14,24,34,44,54,55,56,57,58,48,38,39,30]


  //Creates the grid boxes and adds them to the grid
  for(let i=0; i<(width*width); i++){
    const gridBox = document.createElement('div')
    const grid = document.querySelector('.game')
    grid.appendChild(gridBox)
    gridBox.classList.add('box')
    gridBoxes.push(gridBox)
  }

  gridBoxes[position].classList.add('pacman')

  walls.forEach(function(wallIndex){
    gridBoxes[wallIndex].classList.add('wall')
  })

  pacDots.forEach(function(dotIndex){
    const pacDot = document.createElement('span')
    gridBoxes[dotIndex].appendChild(pacDot)
    pacDot.classList.add('pac-dot')
  })

  function move(){
    const player = gridBoxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    gridBoxes[position].classList.add('pacman')
  }

  function moveRight(){
    newPosition = position+1
    newPosition = (newPosition % width === 0) ? (newPosition - width):newPosition
    if(gridBoxes[newPosition].classList.contains('wall')){
      clearInterval(interval)
    } else {
      position = newPosition
      move()
    }
  }


  function moveLeft(){
    newPosition = position-1
    newPosition = ((newPosition+1) % width === 0) ? (newPosition + width):(newPosition)
    if(gridBoxes[newPosition].classList.contains('wall')){
      clearInterval(interval)
    } else {
      position = newPosition
      move()
    }
  }

  function moveUp(){
    newPosition = position - width
    if (newPosition < width){
      newPosition = newPosition + (width*width-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      clearInterval(interval)
    } else {
      position = newPosition
      move()
    }
  }

  function moveDown(){
    newPosition = position + width
    if (newPosition>=(width*width-width) && newPosition<(width*width)){
      newPosition = newPosition-(width*width-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      clearInterval(interval)
    } else {
      position = newPosition
      move()
    }
  }


  document.addEventListener('keydown', function(e){
    keycode = e.keyCode

    if (keycode===39){
      clearInterval(interval)
      moveRight()
      interval = setInterval(moveRight, 200)
    } else if (keycode===37){
      clearInterval(interval)
      moveLeft()
      interval = setInterval(moveLeft, 200)
    } else if (keycode===40){
      clearInterval(interval)
      moveDown()
      interval = setInterval(moveDown, 200)
    } else if (keycode===38){
      clearInterval(interval)
      moveUp()
      interval = setInterval(moveUp, 200)
    }
  })

}
)
