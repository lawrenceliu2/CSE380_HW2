import {SceneGraph} from '../scene/SceneGraph'

export class GamePhysics {
    constructor() {

    }

    update(sceneGraph : SceneGraph) : void {
        // UPDATE ALL OBJECT POSITIONS ACCORDING TO THEIR VELOCITIES
        // BUT MAKE SURE TO PERFORM COLLISION DETECTION AS WELL
        // NOTE, FOR THIS YOU SHOULD MAKE SURE EACH SCENE OBJECT
        // HAS A BOUNDING VOLUME LIKE EITHER AN AABB OR A CIRCLE

        //Just going to use this for collision detection
        let temp = sceneGraph.getNearby();
        if (temp != null){
            for (let sprite of temp){
                if (sprite.getBehavior().getState() == 1){
                    sprite.setState("DEATH");
                    sprite.getBehavior().deadFrames();
                    sprite.getBehavior().setState(-1);
                }else if (sprite.getBehavior().getState() == 2){
                    if (sceneGraph.getMantis().getBehavior().getState() != 10){
                        sceneGraph.getMantis().getBehavior().setRuns(sprite.getPosition().getX(), sprite.getPosition().getY());
                        sceneGraph.getMantis().getBehavior().setState(10);
                    }
                }
            }
        }
    }
}