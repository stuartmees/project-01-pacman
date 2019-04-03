window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 10 //Set the width of the game grid
  let position = 64 //Set the starting position and define the position variable to store the current position of pacman
  let ghostDirection
  let newGhostDirection
  let pacmanDirection
  let redGhostPosition = 44
  let yellowGhostPosition = 45
  // let pinkGhostPosition = 43
  let newPosition = 0
  let score = 0 //Initialise player score variable
  let lives = 10
  let powerScore = 200
  const gridBoxes = [] //Initialise the array to store the gridBoxes in
  let keyCode //Initialise the keyCode variable to store the code of the key when pressed
  // let interval //Initialise the  variable to store the setInterval method
  // let newPosition //Initialise the newPOsition variable. This allows new position to be checked for validity beofre setting as position
  const numberOfBoxes = width*width
  let isBlueGhostPhase = false
  let redGhostInterval
  let yellowGhostInterval
  // let pinkGhostInterval


  const scoreElem = document.querySelector('#score')// Get the score element
  const livesElem  = document.querySelector('#lives')// Get the lives element

  const walls = [0,1,2,3,4,5,6,7,8,9,10,19,20,22,23,24,25,26,27,29,40,42,47,49,50,52,53,54,55,56,57,59,60,69,70,72,73,76,77,79,80,89,90,91,92,93,94,95,96,97,98,99] //Store which grid boxes are wall

  const powerDots = [11,18,81,88]

  //Creates the grid boxes and adds them to the game grid
  for(let i=0; i<(numberOfBoxes); i++){
    const gridBox = document.createElement('div')
    const grid = document.querySelector('.game')
    grid.appendChild(gridBox)
    gridBox.classList.add('box')
    gridBoxes.push(gridBox)
  }

  gridBoxes[position].classList.add('pacman')//Puts Pacman wherever the the position dictates
  //Sets the relvant grid boxes as part of the wall
  walls.forEach((wallIndex) => gridBoxes[wallIndex].classList.add('wall'))

  //not done in setup() as it is to be used on endBLueGhost
  powerDots.forEach(function(dotIndex){
    gridBoxes[dotIndex].classList.add('power-dot')
  })

  //not done in setup() as it is to be used on endBLueGhost
  livesElem.innerText = lives

  function setup(){
    gridBoxes[redGhostPosition].classList.add('red')
    gridBoxes[yellowGhostPosition].classList.add('yellow')
    // gridBoxes[pinkGhostPosition].classList.add('pink')
    if (!gridBoxes[redGhostPosition].classList.contains('ghost')) gridBoxes[redGhostPosition].classList.add('ghost')
    if (!gridBoxes[yellowGhostPosition].classList.contains('ghost')) gridBoxes[yellowGhostPosition].classList.add('ghost')
    // if (!gridBoxes[pinkGhostPosition].classList.contains('ghost')) gridBoxes[pinkGhostPosition].classList.add('ghost')
    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , 1000)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , 1000)
    // pinkGhostInterval = setInterval(function(){
    //   ghostInitiate('pink', pinkGhostPosition)
    // } , 1000)
  }

  setup()

  //not done in setup() as it is to be used on endBLueGhost
  gridBoxes.forEach(function(box){
    if (box.classList.length===1) box.classList.add('pac-dot')
  })

  //Universal function that moves Pacman in the correct direction when invoked
  function move(){
    const pacmanGridBox = gridBoxes[position]
    const player = gridBoxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    player.removeAttribute('data-direction')
    pacmanGridBox.classList.add('pacman')


    pacmanGridBox.setAttribute('data-direction', pacmanDirection.toString())

    if ((pacmanGridBox.classList.contains('ghost')) && (!pacmanGridBox.classList.contains('blue'))) deathClear()

    if (pacmanGridBox.classList.contains('pac-dot')){
      pacmanGridBox.classList.remove('pac-dot')
      score++
      scoreElem.innerText = score
    }

    if (pacmanGridBox.classList.contains('power-dot')) startBlueGhostPhase(pacmanGridBox)

    if ((pacmanGridBox.classList.contains('blue'))){
      score = score + powerScore
      powerScore = powerScore*2
      scoreElem.innerText = score
      if (pacmanGridBox.classList.contains('yellow')){
        clearInterval(yellowGhostInterval)
        pacmanGridBox.classList.remove('blue','yellow','ghost')
        yellowGhostPosition = 45
      }
      if (pacmanGridBox.classList.contains('red')){
        clearInterval(redGhostInterval)
        pacmanGridBox.classList.remove('blue','red','ghost')
        redGhostPosition = 44
      }
      if (pacmanGridBox.classList.contains('pink')){
        clearInterval(redGhostInterval)
        pacmanGridBox.classList.remove('blue','pink','ghost')
        redGhostPosition = 43
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
      pacmanDirection = 1
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
      pacmanDirection = 3
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
      pacmanDirection = 4
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
      pacmanDirection = 2
      move()
    }
  }

  function deathSetUp(){
    livesElem.innerText = lives
    scoreElem.innerText = score
    position = 65
    redGhostPosition = 44
    yellowGhostPosition = 45
    gridBoxes[position].classList.add('pacman')
    gridBoxes[redGhostPosition].classList.add('red', 'ghost')
    gridBoxes[yellowGhostPosition].classList.add('yellow', 'ghost')
    console.log(redGhostPosition, yellowGhostPosition)
    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , 1000)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , 1000)
  }

  function deathClear(){
    gridBoxes[position].classList.remove('pacman')
    gridBoxes[redGhostPosition].classList.remove('red', 'ghost')
    gridBoxes[redGhostPosition].removeAttribute('data-direction')
    gridBoxes[yellowGhostPosition].classList.remove('yellow', 'ghost')
    gridBoxes[yellowGhostPosition].removeAttribute('data-direction')
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    lives--
    if (lives>0){
      deathSetUp()
    } else {
      livesElem.innerText = 'Game Over!'
    }
  }

  function ghostMove(ghostClass, ghostPosition, newPosition){
    gridBoxes[ghostPosition].classList.remove(ghostClass, 'ghost')
    gridBoxes[ghostPosition].removeAttribute('data-direction')
    if (isBlueGhostPhase) gridBoxes[ghostPosition].classList.remove('blue')
    ghostPosition = newPosition
    gridBoxes[ghostPosition].classList.add(ghostClass, 'ghost')
    gridBoxes[ghostPosition].setAttribute('data-direction', newGhostDirection.toString())
    if (isBlueGhostPhase) gridBoxes[ghostPosition].classList.add('blue')

    if (ghostClass === 'red') redGhostPosition = ghostPosition
    if (ghostClass === 'yellow') yellowGhostPosition = ghostPosition

    if (gridBoxes[ghostPosition].classList.contains('pacman')){
      deathClear()
    }
  }

  function ghostInitiate(ghostClass, ghostPosition){

    const xDist = (position%width)-(ghostPosition%width)
    const yDist = Math.floor(ghostPosition/width)-Math.floor(position/width)
    ghostDirection = parseInt(gridBoxes[ghostPosition].getAttribute('data-direction'))
    let directions = []
    let options = []

    const canMove = function() {
      console.log(newPosition)
      console.log(gridBoxes[newPosition])
      return (
        (!gridBoxes[newPosition].classList.contains('wall')) &&  (!gridBoxes[newPosition].classList.contains('ghost')) && Math.abs(newGhostDirection-ghostDirection) !== 2
      )
    }

    const moveIncrement = function(){
      let currentOptIndex = 0
      newPosition = ghostPosition + options[currentOptIndex]
      newGhostDirection = directions[currentOptIndex]
      while(!canMove()) {
        currentOptIndex++
        newPosition = ghostPosition + options[currentOptIndex]
        console.log(newPosition)
        newGhostDirection = directions[currentOptIndex]
      }
    }

    const moveIncrementReverse = function(){
      let currentOptIndex = 3
      newPosition = ghostPosition + options[currentOptIndex]
      newGhostDirection = directions[currentOptIndex]
      while(!canMove()) {
        currentOptIndex--
        newPosition = ghostPosition + options[currentOptIndex]
        newGhostDirection = directions[currentOptIndex]
      }
    }

    const moveChooser = function(){
      if (xDist>yDist) {
        console.log(newPosition)
        moveIncrement()
      } else {
        moveIncrementReverse()
      }
    }


    if ((Math.abs(xDist)>0) && (Math.abs(yDist)>0)){

      if (Math.abs(xDist)>(Math.abs(yDist))){
        options = [+1,-width, +width, -1]
        directions = [1, 4, 2, 3]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()
        moveChooser()
      }

      if (Math.abs(xDist)<(Math.abs(yDist))){
        options = [+width,-1, +1, -width]
        directions = [2, 3, 1, 4]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()
        moveChooser()
      }

      if (Math.abs(xDist) === Math.abs(yDist)){
        options = [-width, +1, +width, -1]
        directions = [4, 1, 2, 3]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()

        if (xDist>0){
          moveIncrement()
        } else {
          moveIncrementReverse()
        }
      }
    }


    if ((xDist>0 && yDist<0) || (xDist<0 && yDist>0)){

      if (Math.abs(xDist)>(Math.abs(yDist))){
        options = [+1, +width, -width, -1]
        directions = [1, 2, 4, 3]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()
        moveChooser()
      }

      if (Math.abs(xDist)<(Math.abs(yDist))){
        options = [+width,+1, -1, -width]
        directions = [2, 1, 3, 4]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()
        moveChooser()
      }

      if (Math.abs(xDist)===Math.abs(yDist)){
        options = [+width, +1, -width, -1]
        directions = [2, 1, 4, 3]
        if (isBlueGhostPhase) options.reverse()
        if (isBlueGhostPhase) directions.reverse()

        if (xDist>0){
          moveIncrement()
        } else {
          moveIncrementReverse()
        }
      }
    }

    if (yDist===0){
      options = [+1, -width, +width, -1]
      directions = [1, 4, 2, 3]
      if (isBlueGhostPhase) options.reverse()
      if (isBlueGhostPhase) directions.reverse()

      if (xDist>0){
        newPosition = ghostPosition + options[0]
        newGhostDirection = directions[0]
        if (!canMove()) {
          let randomIndex = Math.floor(Math.random()*2)+1
          newPosition = ghostPosition + options[randomIndex]
          newGhostDirection = directions[randomIndex]
          if (!canMove()){
            randomIndex = (randomIndex===1) ? 2:1
            newPosition = ghostPosition + options[randomIndex]
            newGhostDirection = directions[randomIndex]
            if (!canMove()){
              newPosition = ghostPosition + options[3]
              newGhostDirection = directions[3]
            }
          }
        }
      } else {
        newPosition = ghostPosition + options[3]
        newGhostDirection = directions[3]
        if (!canMove()) {
          let randomIndex = Math.floor(Math.random()*2)+1
          newPosition = ghostPosition + options[randomIndex]
          newGhostDirection = directions[randomIndex]
          if (!canMove()){
            randomIndex = (randomIndex===1) ? 2:1
            newPosition = ghostPosition + options[randomIndex]
            newGhostDirection = directions[randomIndex]
            if (!canMove()){
              newPosition = ghostPosition + options[0]
              newGhostDirection = directions[0]
            }
          }
        }
      }
    }

    if (xDist===0){
      options = [-width,-1, +1, +width]
      directions = [4, 3, 1, 2]
      if (isBlueGhostPhase) options.reverse()
      if (isBlueGhostPhase) directions.reverse()

      if (yDist>0){
        newPosition = ghostPosition + options[0]
        newGhostDirection = directions[0]
        if (!canMove()) {
          let randomIndex = Math.floor(Math.random()*2)+1
          newPosition = ghostPosition + options[randomIndex]
          newGhostDirection = directions[randomIndex]
          if (!canMove()){
            randomIndex = (randomIndex===1) ? 2:1
            newPosition = ghostPosition + options[randomIndex]
            newGhostDirection = directions[randomIndex]
            if (!canMove()){
              newPosition = ghostPosition + options[3]
              newGhostDirection = directions[3]
            }
          }
        }
      } else {
        newPosition = ghostPosition + options[3]
        newGhostDirection = directions[3]
        if (!canMove()) {
          let randomIndex = Math.floor(Math.random()*2)+1
          newPosition = ghostPosition + options[randomIndex]
          newGhostDirection = directions[randomIndex]
          if (!canMove()){
            randomIndex = (randomIndex===1) ? 2:1
            newPosition = ghostPosition + options[randomIndex]
            newGhostDirection = directions[randomIndex]
            if (!canMove()){
              newPosition = ghostPosition + options[0]
              newGhostDirection = directions[0]
            }
          }
        }
      }
    }

    ghostMove(ghostClass, ghostPosition, newPosition)
  }

  function endBlueGhostPhase(){
    gridBoxes[redGhostPosition].classList.remove('blue')
    gridBoxes[yellowGhostPosition].classList.remove('blue')
    powerScore = 200
    isBlueGhostPhase = false
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    setup()
  }

  function startBlueGhostPhase(pacmanGridBox){
    pacmanGridBox.classList.remove('power-dot')
    if (!gridBoxes[redGhostPosition].classList.contains('blue'))    gridBoxes[redGhostPosition].classList.add('blue')
    if (!gridBoxes[yellowGhostPosition].classList.contains('blue')) gridBoxes[yellowGhostPosition].classList.add('blue')
    isBlueGhostPhase = true
    setTimeout(endBlueGhostPhase, 5000)
  }

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
