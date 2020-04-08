import { SceneGraph } from "../SceneGraph";

export abstract class Behavior{
    private state: number;
    private scene : SceneGraph;
    private worldWidth : number;
    private worldHeight : number;
    private runAway : boolean;

    //State is what behavior to do, 0 = nothing, 1 = random walk in direction, 2 = patrol back and forth in place then run, 3 = follow mouse

    public constructor(state: number, scene : SceneGraph, x : number, y : number){
        this.state = state;
        this.scene = scene;
        this.worldWidth = x;
        this.worldHeight = y;
        this.runAway = false;
    }

    public getRunning() : boolean{
        return this.runAway;
    }

    public changeRunning() : void{
        if (this.runAway){
            this.runAway = false;
        }else{
            this.runAway = true;
        }
    }

    public setState(state: number) : void{
        this.state = state;
    }

    public getState() : number{
        return this.state;
    }

    public getScene() : SceneGraph{
        return this.scene;
    }

    public getWidth() : number{
        return this.worldWidth;
    }

    public getHeight() : number{
        return this.worldHeight;
    }

    public think(x: number, y : number) : number{
        return 0;
    }
}