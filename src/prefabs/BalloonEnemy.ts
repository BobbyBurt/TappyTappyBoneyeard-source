
/* START OF COMPILED CODE */

import Phaser from "phaser";
import EnemyPrefab from "./EnemyPrefab";
import Level from "~/scenes/Level";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BalloonEnemy extends EnemyPrefab {

	constructor(scene: Phaser.Scene, x?: number, y?: number, gunDirection?: GunDirection, parasol?:  boolean, mine?: boolean, alwaysFire?: boolean, shieldFront?: boolean, shieldBack?:boolean, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, gunDirection, parasol, mine, alwaysFire, shieldFront, shieldBack, 'balloon', texture || "soldiermid", frame);

		/* START-USER-CTR-CODE */

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private floatYTween!: Phaser.Tweens.Tween;
	private originalPosition = new Phaser.Geom.Point(0, 0);

	public balloon!: Phaser.GameObjects.Image;


	start()
	{
		this.body.allowGravity = false;

		this.originalPosition.setTo(this.x, this.y);

		let ninja = (this.scene.game.registry.get('ninja') ? '_1' : '');

	// create balloon
		this.balloon = this.scene.add.image(this.x, this.y - 30, 'balloon' + ninja);
		this.scene.physics.add.existing(this.balloon);
		this._scene.mainLayer.add(this.balloon);
		this.balloon.setDepth(-11);
		let _balloonBody = this.balloon.body as Phaser.Physics.Arcade.Body;
		_balloonBody.setAllowGravity(false);
		_balloonBody.setGravityY(-550);
		_balloonBody.setMaxVelocityY(60);

	// animation test
		this.anims.create
		({
			key: 'idle',
			frames:
			[
				{ key: 'soldieronballoon' + ninja }
			],
			frameRate: 16,
			repeat: -1
		});
		this.play('idle');

		this.floatYTween = this.scene.tweens.addCounter
		({
			// from: -2,
			// to: 2,
			from: 0,
			to: 0,
			duration: 1000,
			ease: Phaser.Math.Easing.Quadratic.InOut,
			yoyo: true,
			repeat: -1
		});
	}

	update(): void
	{
		if (!super.isFalling())
		{
			/* This is disabled so that chains are consistent. What I should do is have the enemy move to it's origin on hit.
			*/
			this.y = this.originalPosition.y + this.floatYTween.getValue();
			this.balloon.setY((this.originalPosition.y - 30) + this.floatYTween.getValue());
			super.offsetPropsFloat(this.floatYTween.getValue() / 2);
		}
		else
		{
			let _balloonBody = this.balloon.body as Phaser.Physics.Arcade.Body;
			_balloonBody.setAllowGravity(true);
				/** it would be best if super.hit() also triggered this behaviour. if there isn't a
				 * good way to do it then i can set up the balloon in EnemyPrefab, but it would 
				 * be better here if most enemies don't use it. */
		}
	}

	/** to be called upon scene reset, otherwise the update will still be called and likely 
	 * cause a crash.
	 * 
	 * Calls the same method in the parent class which has it's own update */
	removeUpdateListener()
	{
		this.scene.events.off(Phaser.Scenes.Events.UPDATE);
		this.scene.events.off(Phaser.Scenes.Events.UPDATE);
		super.removeUpdateListener();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
