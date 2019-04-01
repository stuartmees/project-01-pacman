window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 10 //Set the width of the game grid
  let position = 11 //Set the starting position and define the position variable to store the current position of pacman
  let ghostDirection
  let pacmanDirection
  let redGhostPosition = 44
  let yellowGhostPosition = 45
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

  function startingSetup(){
    gridBoxes[redGhostPosition].classList.add('red')
    gridBoxes[yellowGhostPosition].classList.add('yellow')
    gridBoxes[redGhostPosition].classList.add('ghost')
    gridBoxes[yellowGhostPosition].classList.add('ghost')
    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , 500)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , 500)
  }


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

  function endBlueGhost(){
    gridBoxes[redGhostPosition].classList.remove('blue')
    gridBoxes[yellowGhostPosition].classList.remove('blue')
    clearInterval(blueGhostYellowInterval)
    clearInterval(blueGhostRedInterval)
    powerScore = 200
    startingSetup()
    ghostInitiate('red', redGhostPosition)
    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , 500)
    ghostInitiate('yellow', yellowGhostPosition)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , 500)
  }

  function startBlueGhost(pacmanGridBox){
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    pacmanGridBox.classList.remove('power-dot')
    gridBoxes[redGhostPosition].classList.add('blue')
    gridBoxes[yellowGhostPosition].classList.add('blue')
    blueGhostDirection('yellow', yellowGhostPosition)
    blueGhostYellowInterval = setInterval(function(){
      blueGhostDirection('yellow', yellowGhostPosition)
    }, 1000)
    blueGhostDirection('red', redGhostPosition)
    blueGhostRedInterval = setInterval(function(){
      blueGhostDirection('red', redGhostPosition)
    }, 1000)
    setTimeout(endBlueGhost, 10000)
  }
  //Universal function that moves Pacman in the correct direction when invoked
  function move(){
    const pacmanGridBox = gridBoxes[position]

    const player = gridBoxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    pacmanGridBox.classList.add('pacman')

    pacmanGridBox.setAttribute('data-direction', pacmanDirection)

    if ((pacmanGridBox.classList.contains('ghost')) && (!pacmanGridBox.classList.contains('blue'))) ghostReset()

    if (pacmanGridBox.classList.contains('pac-dot')){
      pacmanGridBox.classList.remove('pac-dot')
      score++
      scoreElem.innerText = score
    }

    if (pacmanGridBox.classList.contains('power-dot')) startBlueGhost(pacmanGridBox)

    if ((pacmanGridBox.classList.contains('blue'))){
      score = score + powerScore
      powerScore = powerScore*2
      scoreElem.innerText = score
      if (pacmanGridBox.classList.contains('yellow')){
        clearInterval(blueGhostYellowInterval)
        pacmanGridBox.classList.remove('blue','yellow','ghost')
        yellowGhostPosition = 45
      }
      if (pacmanGridBox.classList.contains('red')){
        clearInterval(blueGhostRedInterval)
        pacmanGridBox.classList.remove('blue','red','ghost')
        redGhostPosition = 44
      }
    }
  }


  function moveRight(){
    let newPosition = position+1
    newPosition = (newPosition % width === 0) ? (newPosition - width):newPosition
    if(gridBoxes[newPosition].classList.contains('wall')){
      return
    } else {
      position = newPosition
      pacmanDirection = 'forward'
      move()
    }
  }


  function moveLeft(){
    let newPosition = position-1
    newPosition = ((newPosition+1) % width === 0) ? (newPosition + width):(newPosition)
    if(gridBoxes[newPosition].classList.contains('wall')){
      return
    } else {
      position = newPosition
      pacmanDirection = 'backward'
      move()
    }
  }

  function moveUp(){
    let newPosition = position - width
    if (newPosition < width){
      newPosition = newPosition + (numberOfBoxes-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      return
    } else {
      position = newPosition
      pacmanDirection = 'up'
      move()
    }
  }

  function moveDown(){
    let newPosition = position + width
    if (newPosition>=(numberOfBoxes-width) && newPosition<numberOfBoxes){
      newPosition = newPosition-(numberOfBoxes-width)
    }
    if(gridBoxes[newPosition].classList.contains('wall')){
      return
    } else {
      position = newPosition
      pacmanDirection = 'down'
      move()
    }
  }

  function ghostSetUp(){
    livesElem.innerText = lives
    scoreElem.innerText = score
    position = 11
    redGhostPosition = 44
    yellowGhostPosition = 45
    gridBoxes[position].classList.add('pacman')
    gridBoxes[redGhostPosition].classList.add('red')
    gridBoxes[yellowGhostPosition].classList.add('yellow')
    gridBoxes[redGhostPosition].classList.add('ghost')
    gridBoxes[yellowGhostPosition].classList.add('ghost')
    pacDots.forEach(function(pacDotIndex){
      if (!gridBoxes[pacDotIndex].classList.contains('pac-dot')) gridBoxes[pacDotIndex].classList.add('pac-dot')
    })
    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , 500)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , 500)
  }

  function ghostReset(){
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    gridBoxes[position].classList.remove('pacman')
    gridBoxes[redGhostPosition].classList.remove('red')
    gridBoxes[yellowGhostPosition].classList.remove('yellow')
    gridBoxes[redGhostPosition].classList.remove('ghost')
    gridBoxes[yellowGhostPosition].classList.remove('ghost')
    lives--
    score = 0
    if (lives>0){
      setTimeout(ghostSetUp, 2000)
    } else {
      livesElem.innerText = 'Game Over!'
    }
  }

  function ghostMove(ghostClass, ghostPosition, newPosition){
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('ghost'))){
      gridBoxes[ghostPosition].classList.remove(ghostClass, 'ghost')
      ghostPosition = newPosition
      gridBoxes[ghostPosition].classList.add(ghostClass, 'ghost')
      gridBoxes[ghostPosition].setAttribute('data-direction', ghostDirection)
      if (gridBoxes[ghostPosition].classList.contains('pacman')){
        ghostReset()
      }
      if (ghostClass === 'red') return redGhostPosition = ghostPosition
      if (ghostClass === 'yellow') return yellowGhostPosition = ghostPosition
    }
  }

  function ghostInitiate(ghostClass, ghostPosition){
    const direction = Math.floor(Math.random()*4)
    switch(direction){
      case 0: {
        const newPosition = ghostPosition +1
        ghostDirection = 'forward'
        ghostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 1: {
        const newPosition = ghostPosition- 1
        ghostDirection = 'backward'
        ghostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 2: {
        const newPosition = ghostPosition - width
        ghostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 3: {
        const newPosition = ghostPosition+width
        ghostMove(ghostClass, ghostPosition, newPosition)
        break
      }
    }
  }

  function blueGhostMove(ghostClass, ghostPosition, newPosition){
    if ((!gridBoxes[newPosition].classList.contains('wall')) && (!gridBoxes[newPosition].classList.contains('ghost'))){
      gridBoxes[ghostPosition].classList.remove('ghost', 'blue')
      gridBoxes[ghostPosition].classList.remove(ghostClass)
      ghostPosition = newPosition
      gridBoxes[ghostPosition].classList.add('ghost', 'blue')
      gridBoxes[ghostPosition].classList.add(ghostClass)
      if (ghostClass==='red') return redGhostPosition = ghostPosition
      if (ghostClass ==='yellow') return yellowGhostPosition = ghostPosition
    }
  }

  function blueGhostDirection(ghostClass, ghostPosition){
    const direction = Math.floor(Math.random()*4)
    switch(direction){
      case 0: {
        const newPosition = ghostPosition+1
        blueGhostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 1: {
        const newPosition = ghostPosition-1
        blueGhostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 2: {
        const newPosition = ghostPosition-width
        blueGhostMove(ghostClass, ghostPosition, newPosition)
        break
      }
      case 3: {
        const newPosition = ghostPosition+width
        blueGhostMove(ghostClass, ghostPosition, newPosition)
        break
      }
    }
  }

  startingSetup()

  //Invoke the relevant move funtion depending on which arrow key is pressed.
  document.addEventListener('keydown', function(e){
    keyCode = e.keyCode
    switch(keyCode){
      case 39:
        moveRight()
        break
      case 37:
        moveLeft()
        break
      case 40:
        moveDown()
        break
      case 38:
        moveUp()
        break
    }
  })


})
