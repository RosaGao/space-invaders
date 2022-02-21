import Sprite from './Sprite.js'

class Tank extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, 0, 0);
        this.displacement = 5;
        this.missileSpotX = this.x + this.width/2 - 10;

        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
    }

    keyDownHandler(event) {
        if(event.key === 'ArrowRight') {
            this.dx = this.displacement;
        } else if(event.key === 'ArrowLeft') {
            this.dx = -this.displacement;
        } else if(event.key === ' ') { 
            this.missileSpotX = this.x + this.width/2 - 10;
        }
    }

    keyUpHandler(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            this.dx = 0;
        }
    }

    move(canvasWidth) {
        super.move();
        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        } 
        if (this.x < 0) {
            this.x = 0;
        }
    }

    draw(ctx) {
        let img = new Image(50, 50);
        img.src = "assets/tank.png";
        super.draw(ctx, img);
    }
}

export default Tank;