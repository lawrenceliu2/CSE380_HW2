import { Behavior } from './Behavior';
import { SceneGraph } from '../SceneGraph';

export class BugBehavior3 extends Behavior {
    private walking : boolean;
    //Direction 0 = Up, 1 = right, 2 = down, 3 = left
    private direction : number;

    public constructor(state : number, scene : SceneGraph, x : number, y : number){
        super(state, scene, x, y);
        this.walking = false;
        this.direction = 0;
    }

    public getWalking() : boolean{
        return this.walking;
    }

    public setWalking() : void{
        this.walking = true;
    }

    public doneWalking() : void{
        this.walking = false;
    }

    //x and y are the coordinates of the player sprite
    public getAngle(x: number, y : number){
        //theta is now from -PI to PI in radians
        let theta = Math.atan2((y - this.getScene().getPlayerY()), (x - this.getScene().getPlayerX()));
        /*//theta is now in degrees, from -180 to 180 degrees
        theta = theta * 180 / Math.PI;

        //account for negative degrees, now we can have any angle towards the mouse
        if (theta < 0){
            theta = 360 + theta;
        }*/

        return theta;

    }

    //x and y are player bug coordinates, this.getScene().getPlayerX() is the mouse coordinates. My bad for confusing naming lol
    public think3(x : number, y : number) : Array<number>{
        //pythagorean theorem to determine distance to mouse
        let a = Math.abs(x - this.getScene().getPlayerX());
        let b = Math.abs(y - this.getScene().getPlayerY());
        let c = Math.pow(a, 2) + Math.pow(b, 2);
        c = Math.sqrt(c);
        //c is now the distance from player bug to mouse

        //If distance to mouse <= 20, gotta move there
        if (c >= 5){
            let angle = this.getAngle(x, y);
            return [Math.cos(angle), Math.sin(angle)];
        }else{
            return null;
        }
    }

}