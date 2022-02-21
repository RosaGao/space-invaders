import Sprite from './Sprite.js'

const explosionEffect = new Audio("assets/explosion.wav");

class Invader extends Sprite {
    constructor(width, height) {
        let x = Math.floor(Math.random() * (481-width));
        let dy = Math.floor(Math.random() * 4 + 1);
        super(x, 0, width, height, -0.5, dy);
        this.visible = true;
        this.intervalID = null;
        this.jiggle();
    }

    jiggle() { 
        if(!this.intervalID) {
            this.intervalID = setInterval( () => {
                this.dx = this.dx === -0.5 ? 0.5 : -0.5;
            }, 100);
        }
    }

    draw(ctx) { 
        const img = new Image(50, 50);
        img.src = "assets/invader.png";
        super.draw(ctx, img);
    }

    move(canvasHeight) {
        super.move();
        if (this.y + this.height > canvasHeight) {
            clearInterval(this.intervalID);
            return false; 
        }
        return true;
    }


    collideTank(tank) {
        if (this.visible && this.intersects(tank)) {
            explosionEffect.play();
            this.visible = false;
            return true;
        }
        return false;
    }

    collideMissile(missile) {
        if(this.visible && this.intersects(missile)) {
            explosionEffect.play();
            this.visible = false;
            missile.collideInvader(this);
            return true; 
        }
        return false;
    }

}

export default Invader;