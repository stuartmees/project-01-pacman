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

![Screenshot 2019-04-08 at 19 10 33](https://user-images.githubusercontent.com/35113861/55746619-0c231080-5a32-11e9-9003-fa6e75bf9232.png)


https://stuartmees.github.io/project-01-pacman/

### Introduction
This is my re-creation of the classic Pac Man game. The aim of the game is to eat all of the PacDots and PowerDots on the board while gaining as many points as possible and while avoiding the ghosts.

If PacMan eats a PowerDot this turns the ghosts dark blue. Bonus points can be gained by eating the ghosts while they are blue.

### Controls
PacMan movements: ← ↑ → ↓ keys

### Game Instructions
1. The game begins with the instructions visible in the centre of the screen in a modal, and the main page behind faded out. This modal can be closed by clicking the x to reveal the main game page.

![Screenshot 2019-04-08 at 19 13 30](https://user-images.githubusercontent.com/35113861/55746747-7045d480-5a32-11e9-92f8-0f7a9a596338.png)


2. On the main game page the game maze is centred, on the right hand side it displays the score and lives left and on the left is the start and reset buttons. See above. At this point the keys will not move PacMan and there are no ghost visible in the pens in the centre.

3. When the start button is clicked, an event listener applies the relevant classes to the pens in the middle to make the ghosts appear there and the keys are enabled. Doing this also disables the start button so users cannot mistakingly press start twice and set multiple intervals for the ghosts movement. The reset button enables the user to reset the game without refreshing the page, which includes enabling the start button again and disabling the keys.

4. The user can now move PacMan and the ghosts leave their pens.

![Screenshot 2019-04-08 at 19 19 03](https://user-images.githubusercontent.com/35113861/55747042-3cb77a00-5a33-11e9-8e90-132935ebd48a.png)

4. As can be seen in the screen shot above the ghosts all follow PacMan. The ghosts and PacMan propagate by the relevant classes being moved to a new position on the game board. For PacMan this is done via an event listener on the arrow keys and for the ghosts this is done automatically via a function being run on an interval. During this phase the user must make PacMan avoid the ghosts and eat as many PacDots as possible to gain points. Whenever a PacDot is eaten the score is incremented by one and the UI is updated on the right hand side to display the current score.

5. When PacMan eat a PowerDot (one of the larger ones) the ghosts turn dark blue and the game enters Blue Phase. In this phase the ghosts run away from PacMan and if PacMan eats a ghost the user gains 200 points. This doubles for every consecutive ghost that is eaten in a given Blue Phase. When a blue ghost is eaten by PacMan it regenerates as its original colour in its pen and waits there till the end of the Blue Phase.

![Screenshot 2019-04-08 at 19 21 58](https://user-images.githubusercontent.com/35113861/55747217-a8014c00-5a33-11e9-9f6b-d0ca9e8bdd98.png)

5. After 5 seconds the Blue Phase ends. Blue ghosts that have not been eaten regenerate as their original ghost colour in the position they are in. Any ghosts that have been eaten and are therefore back in their pen are then released. All the ghosts now revert to chasing PacMan again.

6. If PacMan is caught by a ghost (outside of a Blue Phase), PacMan dies, and the the user loses a life. The lives left is decreased by one and the UI on the right had side is updated with the new number of lives left. If the user still has lives left the PacMan is regenerated back in his original position and the ghosts are put back in their pens (PacDots and PowerDots are not regenerated if already eaten and the score stays the same). The ghosts are released and the game continues. When PacMan loses his third life, the game is over and the user is presented with a message telling them!

![Screenshot 2019-04-08 at 19 23 19](https://user-images.githubusercontent.com/35113861/55747283-cbc49200-5a33-11e9-966b-67a9b5aeb0ea.png)

7. The notification has an 'x' bottom right which has an event listener attached to it that means when it is clicked the notification element's .none class is toggled to turn the display of it to 'none' so it disappears. The user can then click the reset button to play again.



## Process
_Describe the process of building the game. How did you get started? How did you manage your time? How would you do things next time?_

Initially I generated the boxes that make up the game grid using javascript that loops over a function for a certain number of times creating a div element and appending it to its parent. These boxes were stored in an array, gridBoxes.

These boxes would eventually make up the wall, the paths and the pens in the maze.

A basic maze was made by adding a .wall class to some of the gridBox elements.

First of all the arrow keys were made to move PacMan via an event listener. When the keys were pressed the relevant new position (gridBox) was calculated and the .pacman class was removed from the current gridBox to the new gridBox position, by referencing their array ids.

One ghost was then added to the DOM by adding the relevant ghost classes to the relevant gridBox. A function was run on an interval that generated a random direction to move and calculated the new index to move to on the grid the every 0.5s and then moved them in in that direction.

Logic was added to both the move functions for PacMan and the ghost that checked if they were able to move into the new position. This was checked by checking if the new position gridBox contained a class of .wall. If it did then PacMan would not move, and for the ghost, the ghost would not move, and then 0.5 seconds later a new direction was generated - this would continue until a direction was generated that did not move the ghost into the wall.

Logic was then aded to both the PacMan and ghost move functions that detected if the position they moved into contained both .ghost and .pacman classes and if it did this initiated a death function that deducted a live from the user, updated the UI and reset the game.

Next came the task of making the ghosts move towards PacMan. I thought about this in two parts: logic for working out the best direction to move in order to get nearer to PacMan and then the logic to check if that move is allowed.

The logic to check to see if a move was allowed was the same as was already in place. Only this time if a move wasn't possible, it could not just be left for the setInterval to try a random, and hopefully different direction. The function had to be made to try another direction straight away but it had to be told which direction to try next.

To decide which directions the ghost should try, and in what order they should try them I considered the column and rows of the gridBoxes.

If the difference in the row numbers of the ghost and PacMan was positive this meant that PacMan was above the ghost, and visa versa. If the difference in the column numbers of the ghost and PacMan was positive it meant PacMan was to the right of the ghost, and visa versa.

I use this understanding to, every time the ghost moved, detect which direction PacMan was in, compared to the ghost. I determined a set of arrays that specified the order of directions that the ghost should try depending on the orientation of PacMan at that moment. The ghost then loops through the relevant array, checking each direction in order, to see if that move is possible and then moves in the first direction that is allowed. This process is then repeated on every following move.

Once the maze was put in place the ghost moved around the maze towards PacMac. However, in certain situations the ghost just oscillated backwards and forwards between to positions. This was because the ghost tried to move towards PacMan but was prevented by a wall. Therefore the ghost would move one space away from PacMan. this freed up the space the ghost was in, which is now closer to PacMan than the ghost had moved into. Therefore, by the logic I gave the ghost it moved back into its original spot. This then just continued on repeat.

To avoid this I wanted to prevent the ghosts from changing their direction 180 degrees. I did this by assigning each direction the ghost was moving in (right, down, left, up) and number (1,2,3,4) via a 'data-direction' attribute. Then I added a condition to the function that checked if the ghost could make a move. This condition checked to see if the difference between the current direction and the new direction of the ghost was 2, and if it was the move was prevented and the ghost had to try a different direction.

Following this I added 3 more ghosts and set them all to move and decide on direction based on the same functions and logic.





### Challenges
_Describe the biggest challenges. How did you overcome them? Did you decide to pivot because of time constraints? What did you learn from these problems?_

### Wins
_Describe the wins. What are you most proud of? What did this project help you to understand the most?_

## Future features
_If you were to revisit this project in the future what features would you add?_
