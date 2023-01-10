import playerPrefab from "~/prefabs/playerPrefab";
import State from "states/State";
import StateController from "./StateController";

/** player is airborne */
export default class Dive implements State {

	name: playerStateName = 'dive';
	player: playerPrefab;
	stateController: StateController;
	
	constructor(_player:playerPrefab, _stateController:StateController)
	{
		this.player = _player;
		this.stateController = _stateController;
	}
	
	enter()
	{
		this.player.setTexture('bird1dive');

		this.player.body.setVelocityY(250);
	}
	
	update()
	{	
		if (this.player.onFloor)
		{
			this.stateController.setState('running');

			// TODO: groundcling transition
		}
	}
}