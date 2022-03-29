const width 		  = 900;
const height 		  = 600;
const groundHeight    = 150;
const wallWidth 	  = 50;
const wallOffset 	  = wallWidth * 2;
const gapHeight 	  = 75;
const wallColor 	  = 'rgb(200, 0, 0)';
const wallsCount 	  = (width / (wallWidth + wallOffset)) + 1;
const playerSize      = 30;
const playerDownSpeed = playerSize * 3;
const playerUpSpeed   = playerSize * 500;

const canvas = document.getElementById('screen');
const ctx 	 = canvas.getContext('2d');

const drawWall = (wallPositionX, gapPositionY) => {
	ctx.fillStyle = wallColor;
	ctx.fillRect(wallPositionX, 0, wallWidth, gapPositionY);
	ctx.fillRect(wallPositionX, gapPositionY + gapHeight, wallWidth, height - gapPositionY - gapHeight - groundHeight);
};

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const randomGapPositionY = () => {
	// return randomInt(gapHeight, height - (gapHeight + gapHeight * 2 + groundHeight));
	return randomInt(gapHeight, height - (gapHeight + gapHeight + groundHeight));
};

const walls = [];

for (let i = 0; i < wallsCount; ++i) {
	// walls.push({
	// 	wallPositionX: width + (wallWidth + wallOffset) * i,
	// 	gapPositionY:  randomGapPositionY(),
	// });
}

let playerPositionY = (height - groundHeight) / 2;

const fps  = 144.0;
const loop = setInterval(() => {
	// CLEAR CANVAS
	ctx.clearRect(0, 0, 1100, height);

	// DRAWS GROUND
	ctx.fillStyle = 'rgb(0, 200, 0)';
	ctx.fillRect(0, height - groundHeight, width, groundHeight);

	// DRAWS WALLS
	for (let wall of walls) {
		drawWall(wall.wallPositionX, wall.gapPositionY);
	}

	// MOVES WALLS
	for (let wall of walls) {
		wall.wallPositionX -= wallWidth / fps;

		if (wall.wallPositionX + wallWidth <= 0) {
			wall.wallPositionX += width + wallWidth + wallOffset;
			wall.gapPositionY   = randomGapPositionY();
		}
	}

	// ctx.fillStyle = 'rgb(0, 200, 200)';
	// ctx.fillRect((width / 2) - (playerSize), playerPositionY, playerSize, (height - groundHeight) / 2);

	// DRAWS PLAYER
	ctx.fillStyle = 'rgb(0, 0, 200)';
	ctx.fillRect((width / 2) - (playerSize / 2), playerPositionY - (playerSize / 2), playerSize, playerSize);
	
	// MOVES PLAYER
	playerPositionY += playerDownSpeed / fps;

	document.onkeydown = function upup(up)
{
    if (up.keyCode == '32')
    {
    playerPositionY -= playerUpSpeed / fps;
    }
};

	if (playerPositionY + playerSize / 2 >= height - groundHeight) {
		playerPositionY = height - groundHeight - playerSize / 2;
	}
    if (playerPositionY - playerSize / 2 <= 0) {
		playerPositionY = playerSize / 2;
	}

}, 1000.0 / fps);

