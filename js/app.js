window.addEventListener('DOMContentLoaded', function(){

  console.log('JS Loaded')

  const width = 30
  let position = 0
  const boxes = []

  for(let i=0; i<(width*width); i++){
    const box = document.createElement('div')
    const game = document.querySelector('.game')
    game.appendChild(box)
    box.classList.add('box')
    boxes.push(box)
  }

  // const boxes = document.querySelectorAll('.box')
  console.log(boxes)
  boxes[position].classList.add('pacman')

  function move(){
    const player = boxes.find(box => box.classList.contains('pacman'))
    player.classList.remove('pacman')
    boxes[position].classList.add('pacman')
  }

  document.addEventListener('keydown', function(e){
    const keycode = e.keyCode
    console.log(keycode)
    if (keycode===39){
      position++
      move()
    } else if (keycode===37){
      position--
      move()
    } else if (keycode===40){
      position = position + width
      move()
    } else if (keycode===38){
      position = position - width
      move()
    }
  })

  //
  //

}
)
