window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 10 //Set the width of the game grid
  let position = 11 //Set the starting position and define the position variable to store the current position of pacman
  let redGhostPosition = 44
  let yellowGhostPosition = 45
  let blueGhostYellowPosition
  let blueGhostRedPosition
  let score = 0 //Initialise player score variable
  let lives = 3
  let powerScore = 200
  const gridBoxes = [] //Initialise the array to store the gridBoxes in
  let keyCode //Initialise the keyCode variable to store the code of the key when pressed
  // let interval //Initialise the  variable to store the setInterval method
  // let newPosition //Initialise the newPOsition variable. This allows new position to be checked for validity beofre setting as position
  const numberOfBoxes = width*width

  let redGhostInterval
  let yellowGhostInterval
  let blueGhostYellowInterval
  let blueGhostRedInterval

  const scoreElem = document.querySelector('#score')// Get the score element
  const livesElem  = document.querySelector('#lives')// Get the lives element

  const walls = [0,1,2,3,4,5,6,7,8,9,10,19,20,29,40,43,46,49,50,53,54,55,56,59,60,69,70,79,80,89,90,91,92,93,94,95,96,97,98,99] //Store which grid boxes are wall

  const pacDots = [12,13,14,24] //Store where the Pacdot are positioned

  const powerDots = [88]


  //Creates the grid boxes and adds them to the game grid
  for(let i=0; i<(numberOfBoxes); i++){
    const gridBox = document.createElement('div')
    const grid = document.querySelector('.game')
    grid.appendChild(gridBox)
    gridBox.classList.add('box')
    gridBoxes.push(gridBox)
  }

  gridBoxes[position].classList.add('pacman')//Puts Pacman wherever the the position dictates

  gridBoxes[redGhostPosition].classList.add('red-ghost')//Puts redGhost wherever  redGhost position dictates
  gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')

  //Sets the relvant grid boxes as part of the wall
  walls.forEach((wallIndex) => gridBoxes[wallIndex].classList.add('wall'))

  livesElem.innerText = lives

  //Makes a pac dot element
  pacDots.forEach(function(dotIndex){
    gridBoxes[dotIndex].classList.add('pac-dot')
  })

  powerDots.forEach(function(dotIndex){
    gridBoxes[dotIndex].classList.add('power-dot')
  })

  // function eatDot(pacmanGridBox){
  //   pacmanGridBox.classList.remove('pac-dot')
  //   score++
  //   scoreElem.innerText = score
  // }

  function endBlueGhost(){
    gridBoxes[blueGhostRedPosition].classList.remove('blue-ghost-red')
    gridBoxes[blueGhostYellowPosition].classList.remove('blue-ghost-yellow')
    clearInterval(blueGhostYellowInterval)
    clearInterval(blueGhostRedInterval)
    yellowGhostPosition = blueGhostYellowPosition
    redGhostPosition = blueGhostRedPosition
    blueGhostRedPosition = null
    blueGhostYellowPosition = null
    gridBoxes[redGhostPosition].classList.add('red-ghost')
    gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
    powerScore = 200
    redGhostMove()
    redGhostInterval = setInterval(redGhostMove, 500)
    yellowGhostMove()
    yellowGhostInterval = setInterval(yellowGhostMove, 500)
  }

  function startBlueGhost(pacmanGridBox){
    pacmanGridBox.classList.remove('power-dot')
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    blueGhostYellowPosition = yellowGhostPosition
    blueGhostRedPosition = redGhostPosition
    gridBoxes[redGhostPosition].classList.remove('red-ghost')
    gridBoxes[blueGhostRedPosition].classList.add('blue-ghost-red')
    gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
    gridBoxes[blueGhostYellowPosition].classList.add('blue-ghost-yellow')
    yellowGhostPosition = null
    redGhostPosition = null
    blueGhostYellowMove()
    blueGhostYellowInterval = setInterval(blueGhostYellowMove, 1000)
    blueGhostRedMove()
    blueGhostRedInterval = setInterval(blueGhostRedMove, 1000)
    setTimeout(endBlueGhost, 10000)
  }
  //Universal function that moves Pacman in the correct direction when invoked
  function move(){
    const pacmanGridBox = gridBoxes[position]
    const player = gridBoxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    pacmanGridBox.classList.add('pacman')
    if (pacmanGridBox.classList.contains('pac-dot')){
      pacmanGridBox.classList.remove('pac-dot')
      score++
      scoreElem.innerText = score
    }
    if (pacmanGridBox.classList.contains('power-dot')) startBlueGhost(pacmanGridBox)
    if ((pacmanGridBox.classList.contains('blue-ghost-yellow')) || (pacmanGridBox.classList.contains('blue-ghost-red'))){
      score = score + powerScore
      powerScore = powerScore*2
      scoreElem.innerText = score
      if (pacmanGridBox.classList.contains('blue-ghost-yellow')){
        clearInterval(blueGhostYellowInterval)
        const blueGhostYellow = gridBoxes.find(box => box.classList.contains('blue-ghost-yellow'))
        blueGhostYellow.classList.remove('blue-ghost-yellow')
        blueGhostYellowPosition = 45
      }
      if (pacmanGridBox.classList.contains('blue-ghost-red')){
        clearInterval(blueGhostRedInterval)
        const blueGhostRed = gridBoxes.find(box => box.classList.contains('blue-ghost-red'))
        blueGhostRed.classList.remove('blue-ghost-red')
        blueGhostRedPosition = 44
      }
    }
    if ((!!redGhostPosition && !!yellowGhostPosition) && ((gridBoxes[redGhostPosition].classList.contains('pacman') || gridBoxes[yellowGhostPosition].classList.contains('pacman')))) {
      ghostReset()
    }
  }


  function moveRight(){
    let newPosition = position+1
    newPosition = (newPosition % width === 0) ? (newPosition - width):newPosition
    if(gridBoxes[newPosition].classList.contains('wall')){
      // clearInterval(interval)
      return
    } else {
      position = newPosition
      move()
    }
  }


  function moveLeft(){
    let newPosition = position-1
    newPosition = ((newPosition+1) % width === 0) ? (newPosition + width):(newPosition)
    if(gridBoxes[newPosition].classList.contains('wall')){
      // clearInterval(interval)
      return
    } else {
      position = newPosition
      move()
    }
  }

  function moveUp(){
    let newPosition = position - width
    if (newPosition < width){
      newPosition = newPosition + (numberOfBoxes-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      // clearInterval(interval)
      return
    } else {
      position = newPosition
      move()
    }
  }

  function moveDown(){
    let newPosition = position + width
    if (newPosition>=(numberOfBoxes-width) && newPosition<numberOfBoxes){
      newPosition = newPosition-(numberOfBoxes-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      // clearInterval(interval)
      return
    } else {
      position = newPosition
      move()
    }
  }

  function ghostSetUp(){
    livesElem.innerText = lives
    scoreElem.innerText = score
    position = 11
    redGhostPosition = 65
    yellowGhostPosition = 66
    gridBoxes[position].classList.add('pacman')
    gridBoxes[redGhostPosition].classList.add('red-ghost')
    gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
    pacDots.forEach(function(pacDotIndex){
      if (!gridBoxes[pacDotIndex].classList.contains('pac-dot')) gridBoxes[pacDotIndex].classList.add('pac-dot')
    })
    redGhostInterval = setInterval(redGhostMove, 1000)
    yellowGhostInterval = setInterval(yellowGhostMove, 1000)
  }

  function ghostReset(){
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    gridBoxes[position].classList.remove('pacman')
    gridBoxes[redGhostPosition].classList.remove('red-ghost')
    gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
    lives--
    score = 0
    if (lives>0){
      setTimeout(ghostSetUp, 2000)
    } else {
      livesElem.innerText = 'Game Over!'
    }
  }



  function redGhostMoveRight(){
    const newPosition = redGhostPosition+1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('yellow-ghost'))){
      gridBoxes[redGhostPosition].classList.remove('red-ghost')
      redGhostPosition++
      gridBoxes[redGhostPosition].classList.add('red-ghost')
      if (gridBoxes[redGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function redGhostMoveLeft(){
    const newPosition = redGhostPosition -1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('yellow-ghost'))){
      gridBoxes[redGhostPosition].classList.remove('red-ghost')
      redGhostPosition--
      gridBoxes[redGhostPosition].classList.add('red-ghost')
      if (gridBoxes[redGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function redGhostMoveUp(){
    const newPosition  = redGhostPosition-width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('yellow-ghost'))){
      gridBoxes[redGhostPosition].classList.remove('red-ghost')
      redGhostPosition = redGhostPosition - width
      gridBoxes[redGhostPosition].classList.add('red-ghost')
      if (gridBoxes[redGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function redGhostMoveDown(){
    const newPosition = redGhostPosition+width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('yellow-ghost'))){
      gridBoxes[redGhostPosition].classList.remove('red-ghost')
      redGhostPosition = redGhostPosition + width
      gridBoxes[redGhostPosition].classList.add('red-ghost')
      if (gridBoxes[redGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function redGhostMove(){
    const xDist = (position%width)-(redGhostPosition%width)
    const yDist = Math.floor(redGhostPosition/width)-Math.floor(position/width)
    let direction

    if (xDist>0 && yDist>0){
      direction = (xDist>yDist) ? 0 : 2
    }

    if (xDist<0 && yDist<0){
      direction = (xDist<yDist) ? 2 : 3
    }

    if (xDist>0 && yDist<0){
      direction = (xDist>Math.abs(yDist)) ? 0 : 3
    }

    if (xDist<0 && yDist>0){
      direction = (Math.abs(xDist)>yDist) ? 1 : 2
    }

    switch(direction){
      case 0: redGhostMoveRight()
        break
      case 1: redGhostMoveLeft()
        break
      case 2: redGhostMoveUp()
        break
      case 3: redGhostMoveDown()
        break
    }
  }

  function yellowGhostMoveRight(){
    const newPosition = yellowGhostPosition+1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('red-ghost'))){
      gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
      yellowGhostPosition++
      gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
      if (gridBoxes[yellowGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function yellowGhostMoveLeft(){
    const newPosition = yellowGhostPosition-1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('red-ghost'))){
      gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
      yellowGhostPosition--
      gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
      if (gridBoxes[yellowGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function yellowGhostMoveUp(){
    const newPosition  = yellowGhostPosition-width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('red-ghost'))){
      gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
      yellowGhostPosition = yellowGhostPosition - width
      gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
      if (gridBoxes[yellowGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function yellowGhostMoveDown(){
    const newPosition = yellowGhostPosition+width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('red-ghost'))){
      gridBoxes[yellowGhostPosition].classList.remove('yellow-ghost')
      yellowGhostPosition = yellowGhostPosition + width
      gridBoxes[yellowGhostPosition].classList.add('yellow-ghost')
      if (gridBoxes[yellowGhostPosition].classList.contains('pacman')){
        ghostReset()
      }
    }
  }

  function yellowGhostMove(){
    const direction = Math.floor(Math.random()*4)
    switch(direction){
      case 0: yellowGhostMoveRight()
        break
      case 1: yellowGhostMoveLeft()
        break
      case 2: yellowGhostMoveUp()
        break
      case 3: yellowGhostMoveDown()
        break
    }
  }

  function blueGhostYellowMoveRight(){
    const newPosition = blueGhostYellowPosition+1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-yellow'))){
      gridBoxes[blueGhostYellowPosition].classList.remove('blue-ghost-yellow')
      blueGhostYellowPosition++
      gridBoxes[blueGhostYellowPosition].classList.add('blue-ghost-yellow')
    }
  }

  function blueGhostYellowMoveLeft(){
    const newPosition = blueGhostYellowPosition-1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-yellow'))){
      gridBoxes[blueGhostYellowPosition].classList.remove('blue-ghost-yellow')
      blueGhostYellowPosition--
      gridBoxes[blueGhostYellowPosition].classList.add('blue-ghost-yellow')
    }
  }

  function blueGhostYellowMoveUp(){
    const newPosition  = blueGhostYellowPosition-width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-yellow'))){
      gridBoxes[blueGhostYellowPosition].classList.remove('blue-ghost-yellow')
      blueGhostYellowPosition = blueGhostYellowPosition - width
      gridBoxes[blueGhostYellowPosition].classList.add('blue-ghost-yellow')
    }
  }

  function blueGhostYellowMoveDown(){
    const newPosition = blueGhostYellowPosition+width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-yellow'))){
      gridBoxes[blueGhostYellowPosition].classList.remove('blue-ghost-yellow')
      blueGhostYellowPosition = blueGhostYellowPosition + width
      gridBoxes[blueGhostYellowPosition].classList.add('blue-ghost-yellow')
    }
  }

  function blueGhostYellowMove(){
    const direction = Math.floor(Math.random()*4)
    switch(direction){
      case 0: blueGhostYellowMoveRight()
        break
      case 1: blueGhostYellowMoveLeft()
        break
      case 2: blueGhostYellowMoveUp()
        break
      case 3: blueGhostYellowMoveDown()
        break
    }
  }

  function blueGhostRedMoveRight(){
    const newPosition = blueGhostRedPosition+1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-red'))){
      gridBoxes[blueGhostRedPosition].classList.remove('blue-ghost-red')
      blueGhostRedPosition++
      gridBoxes[blueGhostRedPosition].classList.add('blue-ghost-red')
    }
  }

  function blueGhostRedMoveLeft(){
    const newPosition = blueGhostRedPosition -1
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-red'))){
      gridBoxes[blueGhostRedPosition].classList.remove('blue-ghost-red')
      blueGhostRedPosition--
      gridBoxes[blueGhostRedPosition].classList.add('blue-ghost-red')
    }
  }

  function blueGhostRedMoveUp(){
    const newPosition  = blueGhostRedPosition-width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-red'))){
      gridBoxes[blueGhostRedPosition].classList.remove('blue-ghost-red')
      blueGhostRedPosition = blueGhostRedPosition - width
      gridBoxes[blueGhostRedPosition].classList.add('blue-ghost-red')
    }
  }

  function blueGhostRedMoveDown(){
    const newPosition = blueGhostRedPosition+width
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('blue-ghost-red'))){
      gridBoxes[blueGhostRedPosition].classList.remove('blue-ghost-red')
      blueGhostRedPosition = blueGhostRedPosition + width
      gridBoxes[blueGhostRedPosition].classList.add('blue-ghost-red')
    }
  }

  function blueGhostRedMove(){
    const direction = Math.floor(Math.random()*4)
    switch(direction){
      case 0: blueGhostRedMoveRight()
        break
      case 1: blueGhostRedMoveLeft()
        break
      case 2: blueGhostRedMoveUp()
        break
      case 3: blueGhostRedMoveDown()
        break
    }
  }

  redGhostInterval = setInterval(redGhostMove, 500)
  yellowGhostInterval = setInterval(yellowGhostMove, 500)

  //Invoke the relevant move funtion depending on which arrow key is pressed.
  document.addEventListener('keydown', function(e){
    keyCode = e.keyCode
    switch(keyCode){
      case 39:
        // clearInterval(interval)
        moveRight()
        // interval = setInterval(moveRight, 200)
        break
      case 37:
        // clearInterval(interval)
        moveLeft()
        // interval = setInterval(moveLeft, 200)
        break
      case 40:
        // clearInterval(interval)
        moveDown()
        // interval = setInterval(moveDown, 200)
        break
      case 38:
        // clearInterval(interval)
        moveUp()
        // interval = setInterval(moveUp, 200)
        break
    }
  })


})
