window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  let isBlueGhostPhase
  let newPosition = 0
  const width = 24 //Set the width of the game grid
  const numberOfBoxes = width*width
  let powerScore
  const gridBoxes = [] //Initialise the array to store the gridBoxes in
  const interval = 400

  let score//Initialise player score variable
  let keyCode //Initialise the keyCode variable to store the code of the key when pressed
  let lives
  let position//Set the starting position and define the position variable to store the current position of pacman

  let redGhostInterval
  let yellowGhostInterval
  let pinkGhostInterval
  let aquaGhostInterval

  let ghostDirection
  let newGhostDirection
  let pacmanDirection
  let redGhostPosition

  let yellowGhostPosition
  let pinkGhostPosition
  let aquaGhostPosition
  let bluePhaseTimeout


  //Store relevant elements in variables
  const scoreElem = document.querySelector('#score')// Get the score element
  const livesElem  = document.querySelector('#lives')// Get the lives elemen
  const reset = document.getElementById('reset')// Get the reset button
  const start = document.getElementById('start')// Get the start button
  const grid = document.querySelector('.game')
  const gameOver = document.querySelector('.game-over')
  const close = document.querySelector('.far')
  const welcomeOk = document.querySelector('#welcome-ok')
  const welcome = document.querySelector('.welcome')


  const walls = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,35,36,48,72,96,120,144,168,192,216,240,264,288,312,323,324,336,360,384,408,432,456,480,504,528,552,23,47,71,95,119,143,167,191,215,239,251,252,263,273,278,287,297,302,311,335,359,383,407,431,455,479,503,527,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,274,275,277,298,299,300,276,301,223,224,225,343,344,345,271,295,370,394,418,442,491,492,491,492,323,324,348,372,350,351,352,280,304,230,231,232,157,181,205,203,227,83,107,131,155,84,133,183,184,185,186,234,258,282,306,330,354,378,402,398,399,400,401,389,390,391,392,173,197,221,245,269,293,317,341,174,175,176,177,75,76,78,79,80,81,130,123,124,125,126,127,128,147,171,195,219,267,291,315,339,363,387,388,435,436,438,439,440,441,483,484,486,487,488,489,506,532,533,534,536,537,539,540,542,543,545,546,547,525,445,494,495,496,497,499,500,447,448,449,450,451,452,187,188,212,236,260,284,308,332,380,404,428,134,135,136,137,139,140,86,87,88,89,91,92,28,29,30,31,28,29,30,31,40,41,42,43,142,190,214,238,190,214,238,382,406,430,454,478,361,385,409,433,457,266,290,314,121,169,193,217,50,74,69,93,285,309,333,420,444,468,33,38,179,396,535,538,541,544,166,39,32,34,37,145]


  //Store which grid boxes are wall

  const pen = [274,298,301,277]

  const powerDots = [25,46,529,550]

  //Creates the grid boxes and adds them to the game grid
  for(let i=0; i<(numberOfBoxes); i++){
    const gridBox = document.createElement('div')
    grid.appendChild(gridBox)
    gridBox.classList.add('box')
    gridBoxes.push(gridBox)
  }

  //Time out frunction to end the blue ghost isBlueGhostPhase
  function bluePhaseTimeoutFunction(){
    bluePhaseTimeout = setTimeout(endBlueGhostPhase, 5000)
  }

  //Function to control initial set up=============================
  const setup = function(){
    isBlueGhostPhase = false
    powerScore = 200
    redGhostPosition = 274
    yellowGhostPosition = 298
    pinkGhostPosition = 301
    aquaGhostPosition = 277
    score = 0
    lives = 1
    position = 289
    livesElem.innerText = lives
    scoreElem.innerText = score
    walls.forEach((wallIndex) => gridBoxes[wallIndex].classList.add('wall'))
    pen.forEach((penIndex) => gridBoxes[penIndex].classList.add('pen'))
    gridBoxes[position].classList.add('pacman')
    powerDots.forEach(function(dotIndex){
      gridBoxes[dotIndex].classList.add('power-dot')
    })

    gridBoxes.forEach(function(box){
      if (box.classList.length===1) box.classList.add('pac-dot')
    })

    const pinkPen = gridBoxes[301]
    const aquaPen = gridBoxes[277]
    const redPen = gridBoxes[274]
    const yellowPen = gridBoxes[298]

    pinkPen.classList.add('pink-pen')
    redPen.classList.add('red-pen')
    yellowPen.classList.add('yellow-pen')
    aquaPen.classList.add('aqua-pen')

  }

  function starter(){
    gridBoxes[redGhostPosition].setAttribute('data-direction', 1)
    gridBoxes[yellowGhostPosition].setAttribute('data-direction', 1)
    gridBoxes[pinkGhostPosition].setAttribute('data-direction', 1)
    gridBoxes[aquaGhostPosition].setAttribute('data-direction', 1)
    gridBoxes[redGhostPosition].classList.add('ghost')
    gridBoxes[yellowGhostPosition].classList.add('ghost')
    gridBoxes[pinkGhostPosition].classList.add('ghost')
    gridBoxes[aquaGhostPosition].classList.add('ghost')
    gridBoxes[redGhostPosition].classList.add('red')
    gridBoxes[yellowGhostPosition].classList.add('yellow')
    gridBoxes[pinkGhostPosition].classList.add('pink')
    gridBoxes[aquaGhostPosition].classList.add('aqua')

    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , interval)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , interval)
    pinkGhostInterval = setInterval(function(){
      ghostInitiate('pink', pinkGhostPosition)
    } , interval)
    aquaGhostInterval = setInterval(function(){
      ghostInitiate('aqua', aquaGhostPosition)
    } , interval)

  }

  setup()

  //Functions to control Pacman movement=============================
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
        yellowGhostPosition = 298
        gridBoxes[yellowGhostPosition].classList.add('yellow', 'ghost')
      }
      if (pacmanGridBox.classList.contains('red')){
        clearInterval(redGhostInterval)
        pacmanGridBox.classList.remove('blue','red','ghost')
        redGhostPosition = 274
        gridBoxes[redGhostPosition].classList.add('red', 'ghost')
      }
      if (pacmanGridBox.classList.contains('pink')){
        clearInterval(pinkGhostInterval)
        pacmanGridBox.classList.remove('blue','pink','ghost')
        pinkGhostPosition = 301
        gridBoxes[pinkGhostPosition].classList.add('pink', 'ghost')
      }
      if (pacmanGridBox.classList.contains('aqua')){
        clearInterval(aquaGhostInterval)
        pacmanGridBox.classList.remove('blue','aqua','ghost')
        aquaGhostPosition = 277
        gridBoxes[aquaGhostPosition].classList.add('aqua', 'ghost')
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

  //Functions to control events on pacman death=============================
  function deathSetUp(){
    livesElem.innerText = lives
    scoreElem.innerText = score
    position = 289
    redGhostPosition = 274
    yellowGhostPosition = 298
    pinkGhostPosition = 301
    aquaGhostPosition = 277
    gridBoxes[position].classList.add('pacman')
    gridBoxes[redGhostPosition].classList.add('red', 'ghost')
    gridBoxes[yellowGhostPosition].classList.add('yellow', 'ghost')
    gridBoxes[pinkGhostPosition].classList.add('pink', 'ghost')
    gridBoxes[aquaGhostPosition].classList.add('aqua', 'ghost')

    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , interval)
    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , interval)
    pinkGhostInterval = setInterval(function(){
      ghostInitiate('pink', pinkGhostPosition)
    } , interval)
    aquaGhostInterval = setInterval(function(){
      ghostInitiate('aqua', aquaGhostPosition)
    } , interval)
  }

  function deathClear(){
    gridBoxes[position].classList.remove('pacman')
    gridBoxes[redGhostPosition].classList.remove('red', 'ghost')
    gridBoxes[redGhostPosition].removeAttribute('data-direction')
    gridBoxes[yellowGhostPosition].classList.remove('yellow', 'ghost')
    gridBoxes[yellowGhostPosition].removeAttribute('data-direction')
    gridBoxes[pinkGhostPosition].classList.remove('pink', 'ghost')
    gridBoxes[pinkGhostPosition].removeAttribute('data-direction')
    gridBoxes[aquaGhostPosition].classList.remove('aqua', 'ghost')
    gridBoxes[aquaGhostPosition].removeAttribute('data-direction')
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    clearInterval(pinkGhostInterval)
    clearInterval(aquaGhostInterval)
    lives--
    if (lives>0){
      setTimeout(deathSetUp, 2000)
    } else {
      gameOver.classList.toggle('none')
    }
  }

  //Functions to control ghost movement=============================
  function ghostMove(ghostClass, ghostPosition, newPosition){
    gridBoxes[ghostPosition].classList.remove(ghostClass, 'ghost')
    gridBoxes[ghostPosition].removeAttribute('data-direction')
    if  (isBlueGhostPhase) gridBoxes[ghostPosition].classList.remove('blue')


    ghostPosition = newPosition
    gridBoxes[ghostPosition].classList.add(ghostClass, 'ghost')
    if (isBlueGhostPhase) gridBoxes[ghostPosition].classList.add('blue')
    gridBoxes[ghostPosition].setAttribute('data-direction', newGhostDirection.toString())

    if (ghostClass === 'red') redGhostPosition = ghostPosition
    if (ghostClass === 'yellow') yellowGhostPosition = ghostPosition
    if (ghostClass === 'pink') pinkGhostPosition = ghostPosition
    if (ghostClass === 'aqua') aquaGhostPosition = ghostPosition

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
      return (
        gridBoxes[newPosition] &&
        (!gridBoxes[newPosition].classList.contains('wall')) && Math.abs(newGhostDirection-ghostDirection) !== 2
        // && ((!gridBoxes[newPosition].classList.contains('ghost')))
      )
    }

    const moveIncrement = function(){
      let currentOptIndex = 0
      newPosition = ghostPosition + options[currentOptIndex]
      newGhostDirection = directions[currentOptIndex]

      // newPosition = newPosition%width===0 && newGhostDirection === +1 ? newPosition - width : newPosition
      // newPosition = newPosition%width === width-1 && newGhostDirection === -1 ? newPosition + width : newPosition

      while(!canMove()) {
        currentOptIndex++
        newPosition = ghostPosition + options[currentOptIndex]
        newGhostDirection = directions[currentOptIndex]

        // newPosition = ((newPosition%width===0) && (newGhostDirection === +1)) ? newPosition - width : newPosition
        // newPosition = (((newPosition+1)%width === 0) && (newGhostDirection === -1)) ? newPosition + width : newPosition
      }
    }

    const moveIncrementReverse = function(){
      let currentOptIndex = 3
      newPosition = ghostPosition + options[currentOptIndex]
      newGhostDirection = directions[currentOptIndex]

      // newPosition = ((newPosition%width===0) && (newGhostDirection === +1)) ? newPosition - width : newPosition
      // newPosition = (((newPosition+1)%width === 0) && (newGhostDirection === -1)) ? newPosition + width : newPosition

      while(!canMove()) {
        currentOptIndex--
        newPosition = ghostPosition + options[currentOptIndex]
        newGhostDirection = directions[currentOptIndex]

        // newPosition = ((newPosition%width===0) && (newGhostDirection === +1)) ? newPosition - width : newPosition
        // newPosition = (((newPosition+1)%width === 0) && (newGhostDirection === -1)) ? newPosition + width : newPosition
      }
    }

    const moveChooser = function(){
      if (xDist>yDist) {
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

    function downPropogate(){
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

    function upPropogate(){
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
    }

    if (yDist===0){
      options = [+1, -width, +width, -1]
      directions = [1, 4, 2, 3]
      if (isBlueGhostPhase) options.reverse()
      if (isBlueGhostPhase) directions.reverse()

      if (xDist>0){
        upPropogate()
      } else {
        downPropogate()
      }
    }

    if (xDist===0){
      options = [-width,-1, +1, +width]
      directions = [4, 3, 1, 2]
      if (isBlueGhostPhase) options.reverse()
      if (isBlueGhostPhase) directions.reverse()

      if (yDist>0){
        upPropogate()
      } else {
        downPropogate()
      }
    }

    ghostMove(ghostClass, ghostPosition, newPosition)
  }

  function endBlueGhostPhase(){
    isBlueGhostPhase = false

    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    clearInterval(pinkGhostInterval)
    clearInterval(aquaGhostInterval)

    if (gridBoxes[redGhostPosition].classList.contains('blue')) gridBoxes[redGhostPosition].classList.remove('blue')

    if (gridBoxes[yellowGhostPosition].classList.contains('blue')) gridBoxes[yellowGhostPosition].classList.remove('blue')


    if (gridBoxes[pinkGhostPosition].classList.contains('blue')) gridBoxes[pinkGhostPosition].classList.remove('blue')


    if (gridBoxes[aquaGhostPosition].classList.contains('blue'))
      gridBoxes[aquaGhostPosition].classList.remove('blue')


    redGhostInterval = setInterval(function(){
      ghostInitiate('red', redGhostPosition)
    } , interval)

    yellowGhostInterval = setInterval(function(){
      ghostInitiate('yellow', yellowGhostPosition)
    } , interval)

    pinkGhostInterval = setInterval(function(){
      ghostInitiate('pink', pinkGhostPosition)
    } , interval)

    aquaGhostInterval = setInterval(function(){
      ghostInitiate('aqua', aquaGhostPosition)
    } , interval)

    powerScore = 200
  }

  function startBlueGhostPhase(pacmanGridBox){
    clearTimeout(bluePhaseTimeout)
    isBlueGhostPhase = true
    pacmanGridBox.classList.remove('power-dot')
    gridBoxes[redGhostPosition].classList.add('blue')
    gridBoxes[yellowGhostPosition].classList.add('blue')
    gridBoxes[pinkGhostPosition].classList.add('blue')
    gridBoxes[aquaGhostPosition].classList.add('blue')
    // if (document.querySelectorAll('blue').length === 0){
    //   endBlueGhostPhase()
    // } else {
    bluePhaseTimeoutFunction()
  }

  //Invoke the relevant Pacman move funtion depending on which arrow key is pressed.
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

  //Event listeners=============================
  reset.onclick = function(){
    gridBoxes[position].classList.remove('pacman')
    gridBoxes[redGhostPosition].classList.remove('red', 'ghost', 'blue')
    gridBoxes[redGhostPosition].removeAttribute('data-direction')
    gridBoxes[yellowGhostPosition].classList.remove('yellow', 'ghost','blue')
    gridBoxes[yellowGhostPosition].removeAttribute('data-direction','blue')
    gridBoxes[pinkGhostPosition].classList.remove('pink', 'ghost','blue')
    gridBoxes[pinkGhostPosition].removeAttribute('data-direction')
    gridBoxes[aquaGhostPosition].classList.remove('aqua', 'ghost','blue')
    gridBoxes[aquaGhostPosition].removeAttribute('data-direction')
    clearInterval(redGhostInterval)
    clearInterval(yellowGhostInterval)
    clearInterval(pinkGhostInterval)
    clearInterval(aquaGhostInterval)
    reset.classList.toggle('none')
    start.classList.toggle('none')
    setup()
  }

  start.addEventListener('click', function(){
    starter()
  })

  close.addEventListener('click', () => {
    gameOver.classList.toggle('none')
  })

  welcomeOk.addEventListener('click', () => {
    welcome.classList.toggle('none')
  })
})
