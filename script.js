let WIDTH = 800;
let HEIGHT = 600;
let lives = 10; // Add a variable to keep track of the number of lives

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let livesText; // Add a variable to display the number of lives

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Add an input listener for the ball
    ball.setInteractive();
    ball.on('pointerdown', function () {
        // Reduce the ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Increase the speed by 10%
        yspeed *= 1.1;
        xspeed *= 1.1;
    });

    // Display the number of lives on the screen
    livesText = this.add.text(16, 16, 'Lives: ' + lives, { fontSize: '32px', fill: '#FFF' });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    // The || sign means "or"
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        // Multiplying by -1 will "flip" the direction
        yspeed *= -1;
        lives--; // Reduce the number of lives by 1
        livesText.setText('Lives: ' + lives); // Update the displayed number of lives
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        lives--; // Reduce the number of lives by 1
        livesText.setText('Lives: ' + lives); // Update the displayed number of lives
    }

    // End the game when the number of lives reaches 0
    if (lives <= 0) {
        this.scene.pause();
        livesText.setText('Game Over');
    }
}

