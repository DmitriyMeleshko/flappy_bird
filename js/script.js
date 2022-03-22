const width 		= 900;
const height 		= 600;
const groundHeight 	= 150;
const wallWidth 	= 50;
const wallOffset 	= wallWidth * 2;
const gapHeight 	= 75;
const wallColor 	= 'rgb(200, 0, 0)';
const wallsCount 	= (width / (wallWidth + wallOffset)) + 1;

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
	return randomInt(gapHeight, height - (gapHeight + gapHeight * 2 + groundHeight));
};

const walls = [];

for (let i = 0; i < wallsCount; ++i) {
	walls.push({
		wallPositionX: (wallWidth + wallOffset) * i,
		gapPositionY:  randomGapPositionY(),
	});
}

const fps  = 60.0;
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
		wall.wallPositionX -= wallWidth / (1000.0 / fps);

		if (wall.wallPositionX + wallWidth <= 0) {
			wall.wallPositionX += width + wallWidth + wallOffset;
			wall.gapPositionY   = randomGapPositionY();
		}
	}
}, 1000.0 / fps);