import Sprite from "./Sprite.js";

class Missile extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height, 0, -2);
        this.visible = true;
    }


    collideInvader(invader) { 
        if(this.intersects(invader)) {
            this.visible = false;
        }
    }

    draw(ctx) {
        const img = new Image(20, 20);
        img.src = "assets/missile.png";
        if(this.visible) {
            super.draw(ctx, img); 
        }
    }

    move() {
        super.move();
        if(this.y < 0) {
            this.visible = false;
            return false; 
        }
        return true;
    }



}

export default Missile;