window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 10 //Set the width of the game grid
  let position = 11 //Set the starting position and define the position variable to store the current position of pacman
  let score = 0 //Initialise player score variable
  const gridBoxes = [] //Initialise the array to store the gridBoxes in
  let keyCode //Initialise the keyCode variable to store the code of the key when pressed
  let interval //Initialise the  variable to store the setInterval method
  let newPosition //Initialise the newPOsition variable. This allows new position to be checked for validity beofre setting as position
  const numberOfBoxes = width*width

  const scoreElem = document.querySelector('#score')// Get the score element

  const walls = [0,1,2,3,4,5,6,7,8,9,10,16,19,20,21,22,23,26,29,36,40,46,49,50,59,60,69,70,73,74,75,76,77,79,80,89,90,91,92,93,94,95,96,97,98,99] //Store which grid boxes are wall

  const pacDots = [12,13,14,24,34,44,54,55,56,57,58,48,38,39,30] //Store where the Pacdot are positioned


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

  //Makes a pac dot element
  function makePacDot(dotIndex){
    const pacDot = document.createElement('span')
    gridBoxes[dotIndex].appendChild(pacDot)
    pacDot.classList.add('pac-dot')
  }

  function eatDot(node){
    if (node.classList.contains('pac-dot')){
      node.parentNode.removeChild(node)
      score++
      scoreElem.innerText = score
    }
  }

  //Universal function that moves Pacman in the correct direction when invoked
  function move(){
    const pacmanGridBox = gridBoxes[position]
    const player = gridBoxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    console.log(pacmanGridBox)
    pacmanGridBox.classList.add('pacman')
    pacmanGridBox.childNodes.forEach(eatDot)
  }


  function moveRight(){
    newPosition = position+1
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
    newPosition = position-1
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
    newPosition = position - width
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
    newPosition = position + width
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

  //When Pacman eats a dot reomve the Pacdot from the grid box and incxreas and update score.


  //   if (gridBox.contains(span) )
  //
  //   }
  // })



  pacDots.forEach(makePacDot)//Puts a Pacdot in the relevant grid boxes

  //Invoke the relevant move funtion depending on which arrow key is pressed.
  document.addEventListener('keydown', function(e){
    keyCode = e.keyCode

    if (keyCode===39){
      // clearInterval(interval)
      moveRight()
      // interval = setInterval(moveRight, 200)
    } else if (keyCode===37){
      // clearInterval(interval)
      moveLeft()
      // interval = setInterval(moveLeft, 200)
    } else if (keyCode===40){
      // clearInterval(interval)
      moveDown()
      // interval = setInterval(moveDown, 200)
    } else if (keyCode===38){
      // clearInterval(interval)
      moveUp()
      // interval = setInterval(moveUp, 200)
    }
  })

})
