/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.tabIndex = 1;
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        canvas.addEventListener("keydown", this.dHandler);
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        let mousePressX : number = event.clientX;
        let mousePressY : number = event.clientY;
        let sprite : AnimatedSprite = this.scene.getSpriteAt(mousePressX + this.scene.getViewport().getX(), mousePressY + this.scene.getViewport().getY());
        console.log("mousePressX: " + mousePressX); //+ this.scene.getViewport().getX());
        console.log("mousePressY: " + mousePressY); //+ this.scene.getViewport().getY());
        console.log("sprite: " + sprite);
        if (sprite != null) {
            // START DRAGGING IT
            this.spriteToDrag = sprite;
            this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
            this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
        }
    }
    
    public mouseMoveHandler = (event : MouseEvent) : void => {
        if (this.spriteToDrag != null) {
            this.spriteToDrag.getPosition().set(event.clientX + this.dragOffsetX, 
                                                event.clientY + this.dragOffsetY, 
                                                this.spriteToDrag.getPosition().getZ(), 
                                                this.spriteToDrag.getPosition().getW());
        }
    }

    public mouseUpHandler = (event : MouseEvent) : void => {
        this.spriteToDrag = null;
    }

    public dHandler = (event : KeyboardEvent) : void => {
        let worldWidth : number = this.scene.getTiledLayers()[0].getColumns() * this.scene.getTiledLayers()[0].getTileSet().getTileWidth();
        let worldHeight : number = this.scene.getTiledLayers()[0].getRows() * this.scene.getTiledLayers()[0].getTileSet().getTileHeight();

        if (event.keyCode == 68){
            console.log("KEY PRESSED: d");
            if (this.scene.getViewport().getX() + 100 >= worldWidth - this.scene.getViewport().getWidth()){
                this.scene.getViewport().setPosition(worldWidth - this.scene.getViewport().getWidth(), this.scene.getViewport().getY());
            }else{
                this.scene.getViewport().inc(100, 0);
            }
        }
        else if (event.keyCode == 65){
            console.log("KEY PRESSED: a");
            if (this.scene.getViewport().getX() - 100 <= 0){
                this.scene.getViewport().setPosition(0, this.scene.getViewport().getY());
            }else{
                this.scene.getViewport().inc(-100, 0);
            }
        }
        else if (event.keyCode == 87){
            console.log("KEY PRESSED: w");
            if (this.scene.getViewport().getY() - 100 <= 0){
                this.scene.getViewport().setPosition(this.scene.getViewport().getX(), 0);
            }else{
                this.scene.getViewport().inc(0, -100);
            }
        }
        else if (event.keyCode == 83){
            console.log("KEY PRESSED: s");
            if (this.scene.getViewport().getY() + 100 >= worldHeight - this.scene.getViewport().getHeight()){
                this.scene.getViewport().setPosition(this.scene.getViewport().getX(), worldHeight - this.scene.getViewport().getHeight());
            }else{
                this.scene.getViewport().inc(0, 100);
            }
        }
    }
}