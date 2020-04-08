import { Behavior } from './Behavior';
import { SceneGraph } from '../SceneGraph';

export class BugBehavior2 extends Behavior {
    private walking : boolean;
    private frameCounter : number;
    //Direction 0 = Up, 1 = right, 2 = down, 3 = left
    private direction : number;
    private cooldown : number;

    public constructor(state : number, scene : SceneGraph, x : number, y : number){
        super(state, scene, x, y);
        this.walking = false;
        this.frameCounter = 0;
        //Direction 0 = Up, 1 = right, 2 = down, 3 = left
        this.direction = Math.floor(Math.random() * Math.floor(4));
        this.cooldown = 0;
    }

    public getWalking() : boolean{
        return this.walking;
    }

    public setWalking() : void{
        this.walking = true;
    }

    public getFrameCounter() : number{
        return this.frameCounter;
    }

    public decrementFrames() : void{
        this.frameCounter -= 1;
    }

    public doneWalking() : void{
        this.walking = false;
    }

    public getCooldown() : number{
        return this.cooldown;
    }

    public decrementCooldown() : void{
        this.cooldown -= 1;
    }

    public refreshCooldown() : void{
        this.cooldown = 120;
    }

    public changeDirection() : void{
        if (this.direction == 0){
            this.direction = 2;
        }else if (this.direction == 1){
            this.direction = 3;
        }else if (this.direction == 2){
            this.direction = 0;
        }else{
            this.direction = 1;
        }
    }

    public think(x : number, y : number) : number{
        if (this.getWalking()){
            if (x <= 0 && this.direction == 3){
                this.decrementFrames();
                if (this.getFrameCounter() == 0){
                    this.doneWalking();
                    this.refreshCooldown();
                }
                return 1;
            }else if (x >= this.getWidth() && this.direction == 1){
                this.decrementFrames();
                if (this.getFrameCounter() == 0){
                    this.doneWalking();
                    this.refreshCooldown();
                }
                return 1;
            }else if (y <= 0 && this.direction == 0){
                this.decrementFrames();
                if (this.getFrameCounter() == 0){
                    this.doneWalking();
                    this.refreshCooldown();
                }
                return 1;
            }else if (y >= this.getHeight() && this.direction == 2){
                this.decrementFrames();
                if (this.getFrameCounter() == 0){
                    this.doneWalking();
                    this.refreshCooldown();
                }
                return 1;
            }else{
                this.decrementFrames();
                if (this.getFrameCounter() == 0){
                    this.doneWalking();
                    this.refreshCooldown();
                }
                
                return 2;
            }
        }else{
            if (this.cooldown == 0){
                this.changeDirection();
                this.setWalking();
                this.frameCounter = 60;
                switch (this.direction){
                    case 0:
                        return 0;
                    case 1:
                        return -1;
                    case 2:
                        return -2;
                    case 3:
                        return -3;
                }
            }else{
                this.decrementCooldown();
                return 1;
            }
        }
    }

}