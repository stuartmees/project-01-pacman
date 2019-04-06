# project-01-pacman

### Timeframe
7 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* git


## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

![Screenshot 2019-04-05 at 10 31 37](https://user-images.githubusercontent.com/35113861/55618310-17561200-578e-11e9-8e62-899c9c98ed17.png)


https://stuartmees.github.io/project-01-pacman/

### Introduction
This is my re-creation of the classic Pac Man game. The aim of the game is to eat all of the PacDots and PowerDots on the board while gaining as many points as possible and while avoiding the ghosts.

If PacMan eats a PowerDot this turns the ghosts dark blue. Bonus points can be gained by eating the ghosts while they are blue.

### Controls
PacMan movements: ← ↑ → ↓ keys

### Game Instructions
1. The game begins with the instructions on the left, and on the right hand side it displays the score as 0 and the lives left as 3. Below these there is a start button. The game board in the middle shows PacMan but there are no ghosts in the pen area in the middle and the keyboard keys are disabled. See above.

2. When the start button is clicked, an event listener applies the relevant classes to the pens in the middle to make the ghosts appear there and the keys are enabled. This event listener also changes the start button to a reset button, by toggling .none class on the two HTML elements, which controls the display of them. This reset button enables the user to reset the game without refreshing the page.

![Screenshot 2019-04-05 at 10 43 10](https://user-images.githubusercontent.com/35113861/55618949-a57ec800-578f-11e9-8e50-a525844bc565.png)

3. The user can now move PacMan and the ghosts leave their pens.

![Screenshot 2019-04-05 at 10 47 43](https://user-images.githubusercontent.com/35113861/55619354-69983280-5790-11e9-8825-40c020d5ed3b.png)

3. As can be seen in the screen shot above the ghosts all follow PacMan. The ghosts and PacMan propagate by the relevant classes being moved to a new position on the game board. For PacMan this is done via an event listener on the arrow keys and for the ghosts this is done automatically via a function being run on an interval. During this phase the user must make PacMan avoid the ghosts and eat as many PacDots as possible to gain points. Whenever a PacDot is eaten the score is incremented by one and the UI is updated on the right hand side to display the current score.

4. When PacMan eat a PowerDot (one of the larger ones) the ghosts turn dark blue and the game enters Blue Phase. In this phase the ghosts run away from PacMan and if PacMan eats a ghost the user gains 200 points. This doubles for every consecutive ghost that is eaten in a given Blue Phase. When a blue ghost is eaten by PacMan it regenerates as its original colour in its pen and waits there till the end of the Blue Phase.

![Screenshot 2019-04-05 at 11 18 39](https://user-images.githubusercontent.com/35113861/55621156-a36b3800-5794-11e9-8fcb-8b62ccdd7b4d.png)

5. After 5 seconds the Blue Phase ends. Blue ghosts that have not been eaten regenerate as their original ghost colour in the position they are in. Any ghosts that have been eaten and are therefore back in their pen are then released. All the ghosts now revert to chasing PacMan again.

6. If PacMan is caught by a ghost (outside of a Blue Phase), PacMan dies, and the the user loses a life. The lives left is decreased by one and the UI on the right had side is updated with the new number of lives left. If the user still has lives left the PacMan is regenerated back in his original position and the ghosts are put back in their pens (PacDots and PowerDots are not regenerated if already eaten and the score stays the same). The ghosts are released and the game continues. When PacMan loses his third life, the game is over and the user is presented with a message telling them!

![Screenshot 2019-04-05 at 11 25 05](https://user-images.githubusercontent.com/35113861/55621483-86833480-5795-11e9-9dc1-5ac70ac946d2.png)

7. The notification has an 'x' bottom right which has an event listener attached to it that means when it is clicked the notification element's .none class is toggled to turn the display of it to 'none' so it disappears. The user can then click the reset button to play again.



## Process
_Describe the process of building the game. How did you get started? How did you manage your time? How would you do things next time?_

Initially I generated the boxes that make up the game grid using javascript that looped over is a for loop a certain number of times creating a div element and appending it to its parent. these boxes were stored in an array, gridBoxes.

These boxes would eventually make up the wall and the paths in the maze.

A basic maze was made by adding a .wall class to some of the gridBox elements.

First of all the arrow keys were made to move PacMan via an event listener. When the keys were pressed the relevant new position (gridBox) was calculated and the .pacman class was removed from the current gridBox to the new gridBox position, by referencing their array ids.

One ghost was then added to the DOM by adding the relevant ghost classes to the relevant gridBox. A function was run on an interval that generated a random direction to move and calculated the new index to move to on the grid the every 0.5s and then moved them in in that direction.

Logic was added to both the move functions for PacMan and the ghost that checked if they were able to move into the new position. This was checked by checking if the new position gridBox contained a class of .wall. If it did then PacMan would just not move, and for the ghost, the ghost would not move, and then 0.5 seconds later a new direction was generated - this would continue until a direction was generated that did not move the ghost into the wall.

Next came the task of making them move towards PacMan. I thought about this in two parts: logic for working out the best direction to move in to get nearer to PacMan and then the logic to check if that move is allowed and if not how to check another direction and what direction to check.

To decide which directions the ghost should try, and in what order they should try them i considered the column and rows of the gridBoxes.

### Challenges
_Describe the biggest challenges. How did you overcome them? Did you decide to pivot because of time constraints? What did you learn from these problems?_

### Wins
_Describe the wins. What are you most proud of? What did this project help you to understand the most?_

## Future features
_If you were to revisit this project in the future what features would you add?_
