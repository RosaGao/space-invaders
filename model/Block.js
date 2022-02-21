class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx, src) {
        ctx.drawImage(src, this.x, this.y, this.width, this.height);
    }

    intersects(other) {
        if(this.width <=0 || other.width <=0 || this.height <=0 || other.height <=0) {
            return false;
        }
        return (
            (this.x < 0 || this.x < other.x + other.width) &&
            (this.y < 0 || this.y < other.y + other.height) &&
            (other.x < 0 || this.x + this.width > other.x) &&
            (other.y < 0 || this.y + this.height > other.y)
        );
    }
}

export default Block;
