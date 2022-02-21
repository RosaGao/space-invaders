import Tank from './model/Tank.js'
import Invader from './model/Invader.js'
import Missile from './model/Missile.js'

class Game {

    play() {

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");    

        let numInvader = 0;
        let isGameOver = false;

        const tank = new Tank(
            canvas.width / 2 - 25, canvas.height - 60, 50, 50
        );


        // store missile inventory
        const supply = [];
        const enemy = [];
        // list of current invaders and missiles on canvas
        const missiles = [];
        const invaders = [];

        // set up fixed intervals for invaders to appear
        let intID = null; 
        const bgm = new Audio("assets/music.mpeg");
        let shootEffect = new Audio("assets/shoot.wav");

        for(let i = 0; i < 10; i++) {
            supply.push(new Missile(tank.x, tank.y, 20, 20));
            enemy.push(new Invader(50, 50));
        }

        function invaderAppear() {
            if(!intID || isGameOver) 
                return;
            invaders.push(enemy.shift());
            enemy.push(new Invader(50, 50));

            // add randomness to the frequency at which invaders appear
            if(invaders.length < 2) {
                setTimeout(invaderAppear.bind(this), Math.random() * 6000 + 1000); 
            }
            
        }

        document.addEventListener('keydown', shoot.bind(this));

        function shoot(event) {
            if(!intID && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
                intID = setInterval(invaderAppear.bind(this), 10000);
                bgm.play();
                bgm.loop = true;
            }

            if(intID && event.key === ' ') {
                if(!shootEffect.muted) {
                    shootEffect.play();
                }
                let missile = supply.shift();
                if(missile) {
                    missile.x = tank.missileSpotX;
                    missiles.push(missile);
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#DAA520";
            ctx.fillText (`Invaders shot down: ${numInvader}`, 5, 20);
    
            tank.draw(ctx);
            tank.move(canvas.width);
    
            if(!isGameOver) {
                ctx.fillText (`Missiles remaining: ${supply.length}`, 5, 40);
    
                invaders.forEach((invader)=> {
                    if(invader) {
                        if(invader.visible) {
                            invader.draw(ctx);
                            if(!invader.move(canvas.height) || invader.collideTank(tank)) {
                                clearInterval(intID);
                                invader.visible = false;
                                isGameOver = true;
                            }
                        } else {
                            invaders.splice(invaders.indexOf(invader), 1);
                            invader = null;
                        }
                    }
                });
    
                missiles.forEach((missile) => {
                    if (missile) {
                        if(missile.visible) {
                            missile.draw(ctx);
                            if(!missile.move() && supply.length < 10) {
                                supply.push(new Missile(tank.x, tank.y, 20, 20));
                            }
                        } else {
                            missiles.splice(missiles.indexOf(missile), 1);
                            missile = null;
                        }
                    }
                });
    
                missiles.forEach((missile) =>{
                    invaders.forEach((invader) => {
    
                        if(invader && missile && invader.collideMissile(missile)) {
                            numInvader++;
                            if(supply.length < 10) {
                                supply.push(new Missile(tank.x, tank.y, 20, 20));
                            }
                        }
                        
                    });
                })
    
                window.requestAnimationFrame(draw);
    
            } else {
    
                ctx.fillText(`Game Over!`, 5, 40);
                bgm.pause();
                shootEffect.muted = true;
                ctx.clearRect(tank.x, tank.y, tank.width, tank.height);
                tank.x = canvas.width / 2 - 25;
                tank.y = canvas.height - 60;
                tank.draw(ctx);
    
            }
            
        }

        draw();
    
    }

}

export default Game;