const canvas = document.getElementById("myCanvas");

class Ball {
  ctx;
  horizontal;
  vertical;
  radius;
  moveHorizontal;
  moveVertical;

  constructor(ctx, horizontal, vertical, radius, moveHorizontal, moveVertical) {
    this.ctx = ctx;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.radius = radius;
    this.moveHorizontal = moveHorizontal;
    this.moveVertical = moveVertical;
  };

  draw(fillStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle
    this.ctx.arc(this.horizontal, this.vertical, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  };

  moveBall() {
    if (this.vertical + this.moveVertical > canvas.height - this.radius || this.vertical + this.moveVertical < this.radius) {
      this.moveVertical = -this.moveVertical;
    }

    if (this.horizontal + this.moveHorizontal > canvas.width - this.radius || this.horizontal + this.moveHorizontal < this.radius) {
      this.moveHorizontal = -this.moveHorizontal;
    }

    this.horizontal += this.moveHorizontal;
    this.vertical += this.moveVertical;
  };
};

function init() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const randomNumberOfBalls = getRandomArbitrary(10, 20);

  const balls = [];
  
  for (let i = 0; i < 5; i++) {
    const randomBallRaidus = getRandomArbitrary(10, 20);
    const horizontal = getRandomArbitrary(randomBallRaidus, canvas.width - randomBallRaidus);
    const vertical = getRandomArbitrary(randomBallRaidus, canvas.height - randomBallRaidus);

    const ball = new Ball(
      ctx,
      horizontal,
      vertical,
      randomBallRaidus,
      getRandomDistanceToMove(),
      getRandomDistanceToMove(),
    );
    balls.push(ball);
  };

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball, i) => {
      let color = 'black';
      for (let j = 0; j < balls.length; j++) {
        if (i == j) {
          continue;
        }
        const d = Math.sqrt(Math.pow(balls[i].horizontal - balls[j].horizontal, 2) + Math.pow(balls[i].vertical - balls[j].vertical, 2))

        if (balls[i].radius + balls[j].radius > d) {
          color = 'red'
          break;
        } 
      }
      ball.draw(color);
      ball.moveBall();
    });
  }, 1000 / 60);
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function getRandomDistanceToMove() {
  return getRandomArbitrary(1, 10) % 2 === 0 ? getRandomArbitrary(1, 4) : getRandomArbitrary(-4, -1);
};



init();
