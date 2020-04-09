import { Behavior } from './Behavior';
import { SceneGraph } from '../SceneGraph';

export class BugBehavior1 extends Behavior {
    private walking : boolean;
    private frameCounter : number;
    //Direction 0 = Up, 1 = right, 2 = down, 3 = left
    private direction : number;

    public constructor(state : number, scene : SceneGraph, x : number, y : number){
        super(state, scene, x, y);
        this.walking = false;
        this.frameCounter = 0;
        this.direction = 0;
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

    public deadFrames() : void{
        this.frameCounter = 45;
    }

    public randomDirection() : void{
        this.direction = Math.floor(Math.random() * Math.floor(4));
        //Random number of frames from 0 to 300, so 0 to 5 seconds of walking in any direction
        this.frameCounter = Math.floor(Math.random() * Math.floor(300));
        this.setWalking();
    }

    public think(x : number, y : number) : number{
        if (this.getState() == 1){
            if (this.getWalking()){
                if (x <= 0 && this.direction == 3){
                    this.decrementFrames();
                    if (this.getFrameCounter() == 0){
                        this.doneWalking();
                    }
                    return 1;
                }else if (x >= this.getWidth() && this.direction == 1){
                    this.decrementFrames();
                    if (this.getFrameCounter() == 0){
                        this.doneWalking();
                    }
                    return 1;
                }else if (y <= 0 && this.direction == 0){
                    this.decrementFrames();
                    if (this.getFrameCounter() == 0){
                        this.doneWalking();
                    }
                    return 1;
                }else if (y >= this.getHeight() && this.direction == 2){
                    this.decrementFrames();
                    if (this.getFrameCounter() == 0){
                        this.doneWalking();
                    }
                    return 1;
                }else{
                    this.decrementFrames();
                    if (this.getFrameCounter() == 0){
                        this.doneWalking();
                    }
                    
                    return 2;
                }
            }else{
                this.randomDirection();
                this.setWalking();
                if (this.direction == 0){
                    return 0;
                }else if (this.direction == 1){
                    return -1;
                }else if (this.direction == 2){
                    return -2;
                }else{
                    return -3;
                }
            }
        }else{
            if (this.getFrameCounter() == 0){
                this.setState(-5);
                return -5;
            }else{
                this.decrementFrames();
            }
        }
    }

}