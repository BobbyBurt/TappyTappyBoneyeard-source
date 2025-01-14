
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import LevelIconPrefab from "../prefabs/LevelIconPrefab";
/* START-USER-IMPORTS */

import CameraUtil from "~/components/CameraUtil";
import InputManager from "~/components/InputManager";
import { getEarnedAward, getTotalAwards, levelRequiredAwards, levelScoreMilestones, mapPackDataSwap, mpLevelNames, mpLevelRequiredAwards } from "~/components/LevelScores";
import SoundManager from "~/components/SoundManager";
import cloudSaves from "~/API/cloudSaves";
import { newgroundsIOWrapper } from "~/API/newgroundsIOWrapper";

/* END-USER-IMPORTS */

export default class LevelSelect extends Phaser.Scene {

	constructor() {
		super("LevelSelect");

		/* START-USER-CTR-CODE */

		let _this = this;

	// setup gamepad
	// this.input.gamepad.on('down', function 
	// 		(pad:Phaser.Input.Gamepad.Gamepad, button:Phaser.Input.Gamepad.Button, index:number)
	// 		{
	// 			_this.gamepad = pad;
	// 		});

		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// bgColour
		const bgColour = this.add.rectangle(0, 0, 480, 270);
		bgColour.setOrigin(0, 0);
		bgColour.isFilled = true;
		bgColour.fillColor = 6966365;

		// levelPreviewImageOld
		const levelPreviewImageOld = this.add.image(318, 24, "preview-blank");
		levelPreviewImageOld.setOrigin(0, 0);
		levelPreviewImageOld.visible = false;

		// levelPreviewText
		const levelPreviewText = this.add.bitmapText(378, 71, "nokia", "Level not beat");
		levelPreviewText.setOrigin(0.5, 0.5);
		levelPreviewText.visible = false;
		levelPreviewText.tintFill = true;
		levelPreviewText.tintTopLeft = 9737364;
		levelPreviewText.tintTopRight = 9737364;
		levelPreviewText.tintBottomLeft = 9737364;
		levelPreviewText.tintBottomRight = 9737364;
		levelPreviewText.text = "Level not beat";
		levelPreviewText.fontSize = -8;

		// levelPreviewImage
		const levelPreviewImage = this.add.image(0, -23, "preview-blank");
		levelPreviewImage.setOrigin(0, 0);

		// levelPreviewImage_1
		const levelPreviewImage_1 = this.add.image(0, -23, "preview-refresher");
		levelPreviewImage_1.setOrigin(0, 0);
		levelPreviewImage_1.visible = false;

		// menuButtonContainer
		const menuButtonContainer = this.add.container(360, 159);

		// menuBack
		const menuBack = this.add.rectangle(0, 0, 75, 28);
		menuBack.setOrigin(0, 0);
		menuBack.isFilled = true;
		menuBack.fillColor = 10054789;
		menuBack.lineWidth = 3;
		menuButtonContainer.add(menuBack);

		// hintText_1
		const hintText_1 = this.add.bitmapText(30, 9, "nokia", "Menu");
		hintText_1.text = "Menu";
		hintText_1.fontSize = -8;
		hintText_1.maxWidth = 130;
		menuButtonContainer.add(hintText_1);

		// hintBack_5
		const hintBack_5 = this.add.rectangle(14, 11, 6, 1);
		hintBack_5.setOrigin(0, 0);
		hintBack_5.isFilled = true;
		menuButtonContainer.add(hintBack_5);

		// hintBack_1
		const hintBack_1 = this.add.rectangle(14, 13, 6, 1);
		hintBack_1.setOrigin(0, 0);
		hintBack_1.isFilled = true;
		menuButtonContainer.add(hintBack_1);

		// hintBack_3
		const hintBack_3 = this.add.rectangle(14, 15, 6, 1);
		hintBack_3.setOrigin(0, 0);
		hintBack_3.isFilled = true;
		menuButtonContainer.add(hintBack_3);

		// highscoreWindowContainer
		const highscoreWindowContainer = this.add.container(0, 0);
		highscoreWindowContainer.visible = false;

		// scoreBack
		const scoreBack = this.add.rectangle(41, 26, 250, 60);
		scoreBack.setOrigin(0, 0);
		scoreBack.alpha = 0.9;
		scoreBack.isFilled = true;
		scoreBack.fillColor = 6966365;
		highscoreWindowContainer.add(scoreBack);

		// highscoreMeter
		const highscoreMeter = this.add.image(51, 54, "white-px");
		highscoreMeter.scaleX = 50;
		highscoreMeter.scaleY = 10;
		highscoreMeter.setOrigin(0, 0);
		highscoreWindowContainer.add(highscoreMeter);

		// scoreMeter
		const scoreMeter = this.add.image(51, 54, "white-px");
		scoreMeter.scaleX = 228;
		scoreMeter.scaleY = 10;
		scoreMeter.setOrigin(0, 0);
		scoreMeter.tintFill = true;
		scoreMeter.tintTopRight = 16777215;
		scoreMeter.tintBottomLeft = 16777215;
		scoreMeter.tintBottomRight = 16777215;
		highscoreWindowContainer.add(scoreMeter);

		// bronzeIndicator
		const bronzeIndicator = this.add.rectangle(110, 54, 2, 12);
		bronzeIndicator.setOrigin(0, 0);
		bronzeIndicator.isFilled = true;
		bronzeIndicator.fillColor = 14658422;
		highscoreWindowContainer.add(bronzeIndicator);

		// bronzeMilestone
		const bronzeMilestone = this.add.bitmapText(113, 69, "nokia", "2000\n");
		bronzeMilestone.setOrigin(1, 0);
		bronzeMilestone.tintFill = true;
		bronzeMilestone.tintTopLeft = 14658422;
		bronzeMilestone.tintTopRight = 14658422;
		bronzeMilestone.tintBottomLeft = 14658422;
		bronzeMilestone.tintBottomRight = 14658422;
		bronzeMilestone.text = "2000\n";
		bronzeMilestone.fontSize = -8;
		bronzeMilestone.align = 2;
		highscoreWindowContainer.add(bronzeMilestone);

		// silverIndicator
		const silverIndicator = this.add.rectangle(201, 54, 2, 12);
		silverIndicator.setOrigin(0, 0);
		silverIndicator.isFilled = true;
		silverIndicator.fillColor = 13158600;
		highscoreWindowContainer.add(silverIndicator);

		// silverMilestone
		const silverMilestone = this.add.bitmapText(204, 69, "nokia", "4000\n");
		silverMilestone.setOrigin(1, 0);
		silverMilestone.tintFill = true;
		silverMilestone.tintTopLeft = 13158600;
		silverMilestone.tintTopRight = 13158600;
		silverMilestone.tintBottomLeft = 13158600;
		silverMilestone.tintBottomRight = 13158600;
		silverMilestone.text = "4000\n";
		silverMilestone.fontSize = -8;
		silverMilestone.align = 2;
		highscoreWindowContainer.add(silverMilestone);

		// goldIndicator
		const goldIndicator = this.add.rectangle(279, 54, 2, 12);
		goldIndicator.setOrigin(0, 0);
		goldIndicator.isFilled = true;
		goldIndicator.fillColor = 15983966;
		highscoreWindowContainer.add(goldIndicator);

		// goldMilestone
		const goldMilestone = this.add.bitmapText(282, 69, "nokia", "6000\n");
		goldMilestone.setOrigin(1, 0);
		goldMilestone.tintFill = true;
		goldMilestone.tintTopLeft = 15983966;
		goldMilestone.tintTopRight = 15983966;
		goldMilestone.tintBottomLeft = 15983966;
		goldMilestone.tintBottomRight = 15983966;
		goldMilestone.text = "6000\n";
		goldMilestone.fontSize = -8;
		goldMilestone.align = 2;
		highscoreWindowContainer.add(goldMilestone);

		// highscoreText
		const highscoreText = this.add.bitmapText(50, 34, "nokia", "Highscore: 3000\n");
		highscoreText.tintFill = true;
		highscoreText.text = "Highscore: 3000\n";
		highscoreText.fontSize = -10;
		highscoreWindowContainer.add(highscoreText);

		// scoreText
		const scoreText = this.add.bitmapText(171, 34, "nokia", "Highscore: 3000\n");
		scoreText.tintFill = true;
		scoreText.text = "Highscore: 3000\n";
		scoreText.fontSize = -10;
		highscoreWindowContainer.add(scoreText);

		// LockedWindowContainer
		const lockedWindowContainer = this.add.container(0, 0);

		// lockedWindowBack
		const lockedWindowBack = this.add.rectangle(41, 26, 250, 60);
		lockedWindowBack.setOrigin(0, 0);
		lockedWindowBack.alpha = 0.9;
		lockedWindowBack.isFilled = true;
		lockedWindowBack.fillColor = 6966365;
		lockedWindowContainer.add(lockedWindowBack);

		// lockedWindowHeader
		const lockedWindowHeader = this.add.bitmapText(62, 33, "nokia", "Needed for next unlock:\n");
		lockedWindowHeader.tintFill = true;
		lockedWindowHeader.text = "Needed for next unlock:\n";
		lockedWindowHeader.fontSize = -10;
		lockedWindowHeader.align = 1;
		lockedWindowContainer.add(lockedWindowHeader);

		// awardsNeededContainerGold
		const awardsNeededContainerGold = this.add.container(363, 69);
		lockedWindowContainer.add(awardsNeededContainerGold);

		// countGold
		const countGold = this.add.bitmapText(-0.25, 12, "nokia", "x 2\n");
		countGold.setOrigin(0, 1);
		countGold.tintFill = true;
		countGold.text = "x 2\n";
		countGold.fontSize = -14;
		awardsNeededContainerGold.add(countGold);

		// awardNeededIcon4
		const awardNeededIcon4 = this.add.image(-18, 0, "level-icon-small-gold");
		awardsNeededContainerGold.add(awardNeededIcon4);

		// headerGold
		const headerGold = this.add.bitmapText(-31, -21, "nokia", "gold\n");
		headerGold.alpha = 0.7;
		headerGold.alphaTopLeft = 0.7;
		headerGold.alphaTopRight = 0.7;
		headerGold.alphaBottomLeft = 0.7;
		headerGold.alphaBottomRight = 0.7;
		headerGold.tintFill = true;
		headerGold.text = "gold\n";
		headerGold.fontSize = -8;
		awardsNeededContainerGold.add(headerGold);

		// awardsNeededContainerSilver
		const awardsNeededContainerSilver = this.add.container(245, 70);
		lockedWindowContainer.add(awardsNeededContainerSilver);

		// countSilver
		const countSilver = this.add.bitmapText(-0.25, 12, "nokia", "x 2\n");
		countSilver.setOrigin(0, 1);
		countSilver.tintFill = true;
		countSilver.text = "x 2\n";
		countSilver.fontSize = -14;
		awardsNeededContainerSilver.add(countSilver);

		// awardNeededIcon3
		const awardNeededIcon3 = this.add.image(-18, 0, "level-icon-small-silver");
		awardsNeededContainerSilver.add(awardNeededIcon3);

		// headerSilver
		const headerSilver = this.add.bitmapText(-31, -21, "nokia", "silver\n");
		headerSilver.alpha = 0.7;
		headerSilver.alphaTopLeft = 0.7;
		headerSilver.alphaTopRight = 0.7;
		headerSilver.alphaBottomLeft = 0.7;
		headerSilver.alphaBottomRight = 0.7;
		headerSilver.tintFill = true;
		headerSilver.text = "silver\n";
		headerSilver.fontSize = -8;
		awardsNeededContainerSilver.add(headerSilver);

		// awardsNeededContainerBronze
		const awardsNeededContainerBronze = this.add.container(169, 70);
		lockedWindowContainer.add(awardsNeededContainerBronze);

		// countBronze
		const countBronze = this.add.bitmapText(-0.25, 12, "nokia", "x 2\n");
		countBronze.setOrigin(0, 1);
		countBronze.tintFill = true;
		countBronze.text = "x 2\n";
		countBronze.fontSize = -14;
		awardsNeededContainerBronze.add(countBronze);

		// awardNeededIcon2
		const awardNeededIcon2 = this.add.image(-18, 0, "level-icon-small-bronze");
		awardsNeededContainerBronze.add(awardNeededIcon2);

		// headerBronze
		const headerBronze = this.add.bitmapText(-31, -21, "nokia", "bronze\n");
		headerBronze.alpha = 0.7;
		headerBronze.alphaTopLeft = 0.7;
		headerBronze.alphaTopRight = 0.7;
		headerBronze.alphaBottomLeft = 0.7;
		headerBronze.alphaBottomRight = 0.7;
		headerBronze.tintFill = true;
		headerBronze.text = "bronze\n";
		headerBronze.fontSize = -8;
		awardsNeededContainerBronze.add(headerBronze);

		// awardsNeededContainerPlayed
		const awardsNeededContainerPlayed = this.add.container(93, 70);
		lockedWindowContainer.add(awardsNeededContainerPlayed);

		// countPlayed
		const countPlayed = this.add.bitmapText(-0.25, 12, "nokia", "x 2\n");
		countPlayed.setOrigin(0, 1);
		countPlayed.tintFill = true;
		countPlayed.text = "x 2\n";
		countPlayed.fontSize = -14;
		awardsNeededContainerPlayed.add(countPlayed);

		// awardNeededIcon1
		const awardNeededIcon1 = this.add.image(-18, 0, "level-icon-small-played");
		awardsNeededContainerPlayed.add(awardNeededIcon1);

		// headerPlayed
		const headerPlayed = this.add.bitmapText(-31, -21, "nokia", "completed\n");
		headerPlayed.alpha = 0.7;
		headerPlayed.alphaTopLeft = 0.7;
		headerPlayed.alphaTopRight = 0.7;
		headerPlayed.alphaBottomLeft = 0.7;
		headerPlayed.alphaBottomRight = 0.7;
		headerPlayed.tintFill = true;
		headerPlayed.text = "completed\n";
		headerPlayed.fontSize = -8;
		awardsNeededContainerPlayed.add(headerPlayed);

		// levelIconPrefab
		const levelIconPrefab = new LevelIconPrefab(this, 60, 123);
		this.add.existing(levelIconPrefab);

		// levelIconPrefab_1
		const levelIconPrefab_1 = new LevelIconPrefab(this, 105, 123);
		this.add.existing(levelIconPrefab_1);

		// levelIconPrefab_2
		const levelIconPrefab_2 = new LevelIconPrefab(this, 150, 123);
		this.add.existing(levelIconPrefab_2);

		// levelIconPrefab_3
		const levelIconPrefab_3 = new LevelIconPrefab(this, 195, 123);
		this.add.existing(levelIconPrefab_3);

		// levelIconPrefab_4
		const levelIconPrefab_4 = new LevelIconPrefab(this, 240, 123);
		this.add.existing(levelIconPrefab_4);

		// levelIconPrefab_5
		const levelIconPrefab_5 = new LevelIconPrefab(this, 285, 123);
		this.add.existing(levelIconPrefab_5);

		// levelIconPrefab_6
		const levelIconPrefab_6 = new LevelIconPrefab(this, 330, 123);
		this.add.existing(levelIconPrefab_6);

		// levelIconPrefab_7
		const levelIconPrefab_7 = new LevelIconPrefab(this, 375, 123);
		this.add.existing(levelIconPrefab_7);

		// levelIconPrefab_8
		const levelIconPrefab_8 = new LevelIconPrefab(this, 420, 123);
		this.add.existing(levelIconPrefab_8);

		// levelIconPrefab_9
		const levelIconPrefab_9 = new LevelIconPrefab(this, 105, 173);
		this.add.existing(levelIconPrefab_9);

		// levelIconPrefab_10
		const levelIconPrefab_10 = new LevelIconPrefab(this, 420, 173);
		this.add.existing(levelIconPrefab_10);
		levelIconPrefab_10.visible = false;

		// levelIconPrefab_11
		const levelIconPrefab_11 = new LevelIconPrefab(this, 375, 173);
		this.add.existing(levelIconPrefab_11);
		levelIconPrefab_11.visible = false;

		// levelIconPrefab_12
		const levelIconPrefab_12 = new LevelIconPrefab(this, 330, 173);
		this.add.existing(levelIconPrefab_12);

		// levelIconPrefab_13
		const levelIconPrefab_13 = new LevelIconPrefab(this, 60, 173);
		this.add.existing(levelIconPrefab_13);

		// levelIconPrefab_14
		const levelIconPrefab_14 = new LevelIconPrefab(this, 285, 173);
		this.add.existing(levelIconPrefab_14);

		// levelIconPrefab_15
		const levelIconPrefab_15 = new LevelIconPrefab(this, 240, 173);
		this.add.existing(levelIconPrefab_15);

		// levelIconPrefab_16
		const levelIconPrefab_16 = new LevelIconPrefab(this, 195, 173);
		this.add.existing(levelIconPrefab_16);

		// levelIconPrefab_17
		const levelIconPrefab_17 = new LevelIconPrefab(this, 150, 174);
		this.add.existing(levelIconPrefab_17);

		// levelIconPrefab_18
		const levelIconPrefab_18 = new LevelIconPrefab(this, 105, 221);
		this.add.existing(levelIconPrefab_18);

		// levelIconPrefab_19
		const levelIconPrefab_19 = new LevelIconPrefab(this, 420, 221);
		this.add.existing(levelIconPrefab_19);
		levelIconPrefab_19.visible = true;

		// levelIconPrefab_20
		const levelIconPrefab_20 = new LevelIconPrefab(this, 375, 221);
		this.add.existing(levelIconPrefab_20);
		levelIconPrefab_20.visible = true;

		// levelIconPrefab_22
		const levelIconPrefab_22 = new LevelIconPrefab(this, 60, 221);
		this.add.existing(levelIconPrefab_22);

		// levelIconPrefab_23
		const levelIconPrefab_23 = new LevelIconPrefab(this, 285, 221);
		this.add.existing(levelIconPrefab_23);

		// levelIconPrefab_24
		const levelIconPrefab_24 = new LevelIconPrefab(this, 240, 221);
		this.add.existing(levelIconPrefab_24);

		// levelIconPrefab_25
		const levelIconPrefab_25 = new LevelIconPrefab(this, 195, 221);
		this.add.existing(levelIconPrefab_25);

		// levelIconPrefab_26
		const levelIconPrefab_26 = new LevelIconPrefab(this, 150, 221);
		this.add.existing(levelIconPrefab_26);

		// levelIconPrefab_21
		const levelIconPrefab_21 = new LevelIconPrefab(this, 330, 221);
		this.add.existing(levelIconPrefab_21);
		levelIconPrefab_21.visible = true;

		// hintBack
		const hintBack = this.add.rectangle(311, 201, 150, 128);
		hintBack.setOrigin(0, 0);
		hintBack.isFilled = true;
		hintBack.fillColor = 8542833;

		// hintText
		const hintText = this.add.bitmapText(324, 215, "nokia", "");
		hintText.fontSize = -8;
		hintText.maxWidth = 130;

		// optionsMenuContainer
		const optionsMenuContainer = this.add.container(240, 135);
		optionsMenuContainer.visible = false;

		// optionsBgColour
		const optionsBgColour = this.add.rectangle(0, 0, 200, 270);
		optionsBgColour.isFilled = true;
		optionsBgColour.fillColor = 6966365;
		optionsMenuContainer.add(optionsBgColour);

		// bitmaptext_1
		const bitmaptext_1 = this.add.bitmapText(0, -111, "nokia", "Options");
		bitmaptext_1.setOrigin(0.5, 0);
		bitmaptext_1.text = "Options";
		bitmaptext_1.fontSize = -16;
		optionsMenuContainer.add(bitmaptext_1);

		// menuContainer
		const menuContainer = this.add.container(0, 0);

		// characterSelectContainer
		const characterSelectContainer = this.add.container(0, 0);
		characterSelectContainer.visible = false;

		// characterSelectBack
		const characterSelectBack = this.add.rectangle(240, 135, 250, 150);
		characterSelectBack.isFilled = true;
		characterSelectBack.fillColor = 10054789;
		characterSelectBack.isStroked = true;
		characterSelectBack.strokeAlpha = 0.7;
		characterSelectBack.lineWidth = 2;
		characterSelectContainer.add(characterSelectBack);

		// characterSelectLabel
		const characterSelectLabel = this.add.bitmapText(202, 69, "nokia", "Character Select");
		characterSelectLabel.text = "Character Select";
		characterSelectLabel.fontSize = -8;
		characterSelectContainer.add(characterSelectLabel);

		// characterDescText
		const characterDescText = this.add.bitmapText(129, 154, "nokia", "doesn’t move on the ground, but has 5 or 6 jumps which he uses to move around");
		characterDescText.text = "doesn’t move on the ground, but has 5 or 6 jumps which he uses to move around";
		characterDescText.fontSize = -8;
		characterDescText.maxWidth = 135;
		characterSelectContainer.add(characterDescText);

		// characterDescText2
		const characterDescText2 = this.add.bitmapText(268, 154, "nokia", "- More jumps!\n- Eats babies. . .");
		characterDescText2.text = "- More jumps!\n- Eats babies. . .";
		characterDescText2.fontSize = -8;
		characterDescText2.maxWidth = 200;
		characterSelectContainer.add(characterDescText2);

		// characterSelectBack_1
		const characterSelectBack_1 = this.add.rectangle(116, 85, 248, 60);
		characterSelectBack_1.setOrigin(0, 0);
		characterSelectBack_1.isFilled = true;
		characterSelectBack_1.fillColor = 6966365;
		characterSelectContainer.add(characterSelectBack_1);

		// characterNameText
		const characterNameText = this.add.bitmapText(212, 130, "nokia", "Bird Tapper");
		characterNameText.text = "Bird Tapper";
		characterNameText.fontSize = -8;
		characterSelectContainer.add(characterNameText);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(152, 94, 30, 30);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillAlpha = 0;
		rectangle_1.isStroked = true;
		rectangle_1.lineWidth = 2;
		characterSelectContainer.add(rectangle_1);

		// rectangle
		const rectangle = this.add.rectangle(201, 93, 30, 30);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillAlpha = 0;
		rectangle.isStroked = true;
		rectangle.lineWidth = 2;
		characterSelectContainer.add(rectangle);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(249, 94, 30, 30);
		rectangle_2.setOrigin(0, 0);
		rectangle_2.isFilled = true;
		rectangle_2.fillAlpha = 0;
		rectangle_2.isStroked = true;
		rectangle_2.lineWidth = 2;
		characterSelectContainer.add(rectangle_2);

		// rectangle_3
		const rectangle_3 = this.add.rectangle(295, 94, 30, 30);
		rectangle_3.setOrigin(0, 0);
		rectangle_3.isFilled = true;
		rectangle_3.fillAlpha = 0;
		rectangle_3.isStroked = true;
		rectangle_3.lineWidth = 2;
		characterSelectContainer.add(rectangle_3);

		// bgColour_1
		const bgColour_1 = this.add.rectangle(0, 0, 480, 270);
		bgColour_1.setOrigin(0, 0);
		bgColour_1.isFilled = true;
		bgColour_1.fillColor = 6966365;
		characterSelectContainer.add(bgColour_1);

		// bgColour_2
		const bgColour_2 = this.add.rectangle(65, 55, 180, 200);
		bgColour_2.setOrigin(0, 0);
		bgColour_2.isFilled = true;
		bgColour_2.fillColor = 10054789;
		characterSelectContainer.add(bgColour_2);

		// illustraion_thebird
		const illustraion_thebird = this.add.image(155, 157, "illustraion-thebird");
		illustraion_thebird.scaleX = 0.1;
		illustraion_thebird.scaleY = 0.1;
		characterSelectContainer.add(illustraion_thebird);

		// bitmaptext_2
		const bitmaptext_2 = this.add.bitmapText(240, 27, "nokia", "Character Select");
		bitmaptext_2.setOrigin(0.5, 0.5);
		bitmaptext_2.text = "Character Select";
		bitmaptext_2.fontSize = -12;
		characterSelectContainer.add(bitmaptext_2);

		// bitmaptext
		const bitmaptext = this.add.bitmapText(275, 58, "nokia", "Bird Tapper");
		bitmaptext.text = "Bird Tapper";
		bitmaptext.fontSize = -20;
		characterSelectContainer.add(bitmaptext);

		// bitmaptext_5
		const bitmaptext_5 = this.add.bitmapText(275, 89, "nokia", "Doesn’t move on the ground, but has 5 or 6 jumps which he uses to move around.\n\n- More jumps!\n- Eats babies…\n");
		bitmaptext_5.text = "Doesn’t move on the ground, but has 5 or 6 jumps which he uses to move around.\n\n- More jumps!\n- Eats babies…\n";
		bitmaptext_5.fontSize = -10;
		bitmaptext_5.maxWidth = 180;
		characterSelectContainer.add(bitmaptext_5);

		// bgColour_3
		const bgColour_3 = this.add.rectangle(275, 208, 160, 35);
		bgColour_3.setOrigin(0, 0);
		bgColour_3.isFilled = true;
		bgColour_3.fillColor = 10054789;
		bgColour_3.fillAlpha = 0;
		bgColour_3.isStroked = true;
		bgColour_3.strokeColor = 10054789;
		bgColour_3.lineWidth = 3;
		characterSelectContainer.add(bgColour_3);

		// bird1mid
		const bird1mid = this.add.image(297, 216, "bird1mid");
		bird1mid.setOrigin(0, 0);
		characterSelectContainer.add(bird1mid);

		// bird1mid_1
		const bird1mid_1 = this.add.image(330, 216, "pucamuc", "airborne/00");
		bird1mid_1.setOrigin(0, 0);
		characterSelectContainer.add(bird1mid_1);

		// bird1mid_2
		const bird1mid_2 = this.add.image(363, 216, "gappy", "airborne/00");
		bird1mid_2.setOrigin(0, 0);
		characterSelectContainer.add(bird1mid_2);

		// bird1mid_3
		const bird1mid_3 = this.add.image(396, 216, "kid", "flap/03");
		bird1mid_3.setOrigin(0, 0);
		characterSelectContainer.add(bird1mid_3);

		// levelNameText_2
		const levelNameText_2 = this.add.bitmapText(42, -15, "nokia", "Awsome Level");
		levelNameText_2.text = "Awsome Level";
		levelNameText_2.fontSize = -16;
		levelNameText_2.dropShadowX = 2;
		levelNameText_2.dropShadowY = 2;
		levelNameText_2.dropShadowAlpha = 1;
		levelNameText_2.dropShadowColor = 16777215;

		// levelNameText_1
		const levelNameText_1 = this.add.bitmapText(42, -13, "nokia", "Awsome Level");
		levelNameText_1.text = "Awsome Level";
		levelNameText_1.fontSize = -16;
		levelNameText_1.dropShadowX = 2;
		levelNameText_1.dropShadowY = -2;
		levelNameText_1.dropShadowAlpha = 1;
		levelNameText_1.dropShadowColor = 16777215;

		// levelNameText
		const levelNameText = this.add.bitmapText(43, -14, "nokia", "Awsome Level");
		levelNameText.tintTopLeft = 5388102;
		levelNameText.tintTopRight = 5388102;
		levelNameText.tintBottomLeft = 5388102;
		levelNameText.tintBottomRight = 5388102;
		levelNameText.text = "Awsome Level";
		levelNameText.fontSize = -16;
		levelNameText.dropShadowColor = 5388102;

		// levelAuthorText_1
		const levelAuthorText_1 = this.add.bitmapText(42, 6, "nokia", "by BobbyBurt");
		levelAuthorText_1.text = "by BobbyBurt";
		levelAuthorText_1.fontSize = -8;
		levelAuthorText_1.dropShadowX = 2;
		levelAuthorText_1.dropShadowY = -2;
		levelAuthorText_1.dropShadowAlpha = 1;
		levelAuthorText_1.dropShadowColor = 16777215;

		// levelAuthorText_2
		const levelAuthorText_2 = this.add.bitmapText(42, 4, "nokia", "by BobbyBurt");
		levelAuthorText_2.text = "by BobbyBurt";
		levelAuthorText_2.fontSize = -8;
		levelAuthorText_2.dropShadowX = 2;
		levelAuthorText_2.dropShadowY = 2;
		levelAuthorText_2.dropShadowAlpha = 1;
		levelAuthorText_2.dropShadowColor = 16777215;

		// levelAuthorText
		const levelAuthorText = this.add.bitmapText(43, 5, "nokia", "by BobbyBurt");
		levelAuthorText.tintTopLeft = 5388102;
		levelAuthorText.tintTopRight = 5388102;
		levelAuthorText.tintBottomLeft = 5388102;
		levelAuthorText.tintBottomRight = 5388102;
		levelAuthorText.text = "by BobbyBurt";
		levelAuthorText.fontSize = -8;

		// selectedCharacterBack
		const selectedCharacterBack = this.add.rectangle(360, 112, 150, 30);
		selectedCharacterBack.setOrigin(0, 0);
		selectedCharacterBack.isFilled = true;
		selectedCharacterBack.fillColor = 8542833;
		selectedCharacterBack.lineWidth = 3;

		// selectedCharacterText
		const selectedCharacterText = this.add.bitmapText(366, 120, "nokia", "Selected:");
		selectedCharacterText.tintTopLeft = 11833764;
		selectedCharacterText.tintTopRight = 11833764;
		selectedCharacterText.tintBottomLeft = 11833764;
		selectedCharacterText.tintBottomRight = 11833764;
		selectedCharacterText.text = "Selected:";
		selectedCharacterText.fontSize = -8;

		// selectedCharacterSprite
		const selectedCharacterSprite = this.add.image(424, 125, "pucamuc", "flap/02");

		// mysteryCharacterContainer
		const mysteryCharacterContainer = this.add.container(380, 28);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(21, 13, 128, 128);
		rectangle_4.scaleX = 0.4106142086997706;
		rectangle_4.scaleY = 0.4106142086997706;
		rectangle_4.isFilled = true;
		mysteryCharacterContainer.add(rectangle_4);

		// specialCharacterImage
		const specialCharacterImage = this.add.image(20, 11, "illustration-kid");
		specialCharacterImage.scaleX = 0.0319044655113218;
		specialCharacterImage.scaleY = 0.0319044655113218;
		specialCharacterImage.alpha = 0.4;
		specialCharacterImage.alphaTopLeft = 0.4;
		specialCharacterImage.alphaTopRight = 0.4;
		specialCharacterImage.alphaBottomLeft = 0.4;
		specialCharacterImage.alphaBottomRight = 0.4;
		specialCharacterImage.tintTopLeft = 0;
		specialCharacterImage.tintTopRight = 0;
		specialCharacterImage.tintBottomLeft = 0;
		specialCharacterImage.tintBottomRight = 0;
		mysteryCharacterContainer.add(specialCharacterImage);

		// specialCharacterQuestionMark
		const specialCharacterQuestionMark = this.add.bitmapText(10, -7, "nokia", "?");
		specialCharacterQuestionMark.text = "?";
		specialCharacterQuestionMark.fontSize = -16;
		mysteryCharacterContainer.add(specialCharacterQuestionMark);

		// characterUnlockedContainer
		const characterUnlockedContainer = this.add.container(0, 0);
		characterUnlockedContainer.visible = false;

		// rectangle_5
		const rectangle_5 = this.add.rectangle(240, 23, 350, 200);
		rectangle_5.setOrigin(0.5, 0);
		rectangle_5.isFilled = true;
		rectangle_5.fillColor = 8542833;
		rectangle_5.isStroked = true;
		rectangle_5.strokeColor = 12158627;
		rectangle_5.lineWidth = 3;
		characterUnlockedContainer.add(rectangle_5);

		// bitmaptext_3
		const bitmaptext_3 = this.add.bitmapText(80, 88, "nokia", "You can play as him in any regular level! He's now also unlocked in Purple Platoon Panic.\n\nBut be warned: Some levels may be more difficult or even impossible!\n\nGo to the Character Select menu to switch characters.");
		bitmaptext_3.text = "You can play as him in any regular level! He's now also unlocked in Purple Platoon Panic.\n\nBut be warned: Some levels may be more difficult or even impossible!\n\nGo to the Character Select menu to switch characters.";
		bitmaptext_3.fontSize = -8;
		bitmaptext_3.maxWidth = 180;
		characterUnlockedContainer.add(bitmaptext_3);

		// unlockedCharacterIllustration
		const unlockedCharacterIllustration = this.add.image(331, 151, "illustration-gappy");
		unlockedCharacterIllustration.scaleX = 0.06991574805378897;
		unlockedCharacterIllustration.scaleY = 0.06991574805378897;
		characterUnlockedContainer.add(unlockedCharacterIllustration);

		// unlockedText
		const unlockedText = this.add.bitmapText(160, 67, "nokia", "You've unlocked");
		unlockedText.setOrigin(0.5, 0.5);
		unlockedText.text = "You've unlocked";
		unlockedText.fontSize = -16;
		characterUnlockedContainer.add(unlockedText);

		// characterUnlockedDismissButton
		const characterUnlockedDismissButton = this.add.rectangle(167, 215, 80, 25);
		characterUnlockedDismissButton.isFilled = true;
		characterUnlockedDismissButton.fillColor = 12158627;
		characterUnlockedDismissButton.isStroked = true;
		characterUnlockedDismissButton.lineWidth = 2;
		characterUnlockedContainer.add(characterUnlockedDismissButton);

		// bitmaptext_4
		const bitmaptext_4 = this.add.bitmapText(150, 211, "nokia", "Return");
		bitmaptext_4.text = "Return";
		bitmaptext_4.fontSize = -8;
		bitmaptext_4.align = 1;
		bitmaptext_4.maxWidth = 250;
		characterUnlockedContainer.add(bitmaptext_4);

		// unlockedCharacterNameText
		const unlockedCharacterNameText = this.add.bitmapText(247, 43, "nokia", "The Kid!");
		unlockedCharacterNameText.text = "The Kid!";
		unlockedCharacterNameText.fontSize = -30;
		characterUnlockedContainer.add(unlockedCharacterNameText);

		// altUnlockedContainer
		const altUnlockedContainer = this.add.container(0, 0);
		altUnlockedContainer.visible = false;

		// rectangle_51
		const rectangle_51 = this.add.rectangle(240, 107, 300, 110);
		rectangle_51.isFilled = true;
		rectangle_51.fillColor = 8542833;
		rectangle_51.isStroked = true;
		rectangle_51.strokeColor = 12158627;
		rectangle_51.lineWidth = 3;
		altUnlockedContainer.add(rectangle_51);

		// bitmaptext_31
		const bitmaptext_31 = this.add.bitmapText(117, 113, "nokia", "You can choose it in the Character Select menu.");
		bitmaptext_31.text = "You can choose it in the Character Select menu.";
		bitmaptext_31.fontSize = -8;
		bitmaptext_31.maxWidth = 200;
		altUnlockedContainer.add(bitmaptext_31);

		// unlockedCharacterText1
		const unlockedCharacterText1 = this.add.bitmapText(240, 87, "nokia", "You've unlocked Gappy's \nalternate costume!");
		unlockedCharacterText1.setOrigin(0.5, 0.5);
		unlockedCharacterText1.text = "You've unlocked Gappy's \nalternate costume!";
		unlockedCharacterText1.fontSize = -16;
		altUnlockedContainer.add(unlockedCharacterText1);

		// characterUnlockedDismissButton1
		const characterUnlockedDismissButton1 = this.add.rectangle(240, 155, 80, 25);
		characterUnlockedDismissButton1.isFilled = true;
		characterUnlockedDismissButton1.fillColor = 12158627;
		characterUnlockedDismissButton1.isStroked = true;
		characterUnlockedDismissButton1.lineWidth = 2;
		altUnlockedContainer.add(characterUnlockedDismissButton1);

		// bitmaptext_41
		const bitmaptext_41 = this.add.bitmapText(223.5, 151, "nokia", "Return");
		bitmaptext_41.text = "Return";
		bitmaptext_41.fontSize = -8;
		bitmaptext_41.align = 1;
		bitmaptext_41.maxWidth = 250;
		altUnlockedContainer.add(bitmaptext_41);

		// unlockedAltIcon
		const unlockedAltIcon = this.add.image(346, 121, "kid-alt", "airborne/00");
		unlockedAltIcon.scaleX = 2;
		unlockedAltIcon.scaleY = 2;
		altUnlockedContainer.add(unlockedAltIcon);

		// lists
		const levelBackList: Array<any> = [];

		// levelIconPrefab (prefab fields)
		levelIconPrefab.levelIndex = 0;
		levelIconPrefab.levelIndexMP = "1";

		// levelIconPrefab_1 (prefab fields)
		levelIconPrefab_1.levelIndex = 1;
		levelIconPrefab_1.levelIndexMP = "2";

		// levelIconPrefab_2 (prefab fields)
		levelIconPrefab_2.levelIndex = 2;
		levelIconPrefab_2.levelIndexMP = "3";

		// levelIconPrefab_3 (prefab fields)
		levelIconPrefab_3.levelIndex = 3;
		levelIconPrefab_3.levelIndexMP = "4";

		// levelIconPrefab_4 (prefab fields)
		levelIconPrefab_4.levelIndex = 4;
		levelIconPrefab_4.levelIndexMP = "5";

		// levelIconPrefab_5 (prefab fields)
		levelIconPrefab_5.levelIndex = 5;
		levelIconPrefab_5.levelIndexMP = "6";

		// levelIconPrefab_6 (prefab fields)
		levelIconPrefab_6.levelIndex = 6;
		levelIconPrefab_6.levelIndexMP = "7";

		// levelIconPrefab_7 (prefab fields)
		levelIconPrefab_7.levelIndex = 7;
		levelIconPrefab_7.levelIndexMP = "8";

		// levelIconPrefab_8 (prefab fields)
		levelIconPrefab_8.levelIndex = 8;
		levelIconPrefab_8.levelIndexMP = "";

		// levelIconPrefab_9 (prefab fields)
		levelIconPrefab_9.levelIndex = 10;
		levelIconPrefab_9.levelIndexMP = "9";

		// levelIconPrefab_10 (prefab fields)
		levelIconPrefab_10.levelIndex = 17;

		// levelIconPrefab_11 (prefab fields)
		levelIconPrefab_11.levelIndex = 16;

		// levelIconPrefab_12 (prefab fields)
		levelIconPrefab_12.levelIndex = 15;
		levelIconPrefab_12.levelIndexMP = "14";

		// levelIconPrefab_13 (prefab fields)
		levelIconPrefab_13.levelIndex = 9;
		levelIconPrefab_13.levelIndexMP = "8";

		// levelIconPrefab_14 (prefab fields)
		levelIconPrefab_14.levelIndex = 14;
		levelIconPrefab_14.levelIndexMP = "13";

		// levelIconPrefab_15 (prefab fields)
		levelIconPrefab_15.levelIndex = 13;
		levelIconPrefab_15.levelIndexMP = "12";

		// levelIconPrefab_16 (prefab fields)
		levelIconPrefab_16.levelIndex = 12;
		levelIconPrefab_16.levelIndexMP = "11";

		// levelIconPrefab_17 (prefab fields)
		levelIconPrefab_17.levelIndex = 11;
		levelIconPrefab_17.levelIndexMP = "10";

		// levelIconPrefab_18 (prefab fields)
		levelIconPrefab_18.levelIndex = 17;
		levelIconPrefab_18.levelIndexMP = "p2";

		// levelIconPrefab_19 (prefab fields)
		levelIconPrefab_19.levelIndex = 26;
		levelIconPrefab_19.levelIndexMP = "k3";

		// levelIconPrefab_20 (prefab fields)
		levelIconPrefab_20.levelIndex = 25;
		levelIconPrefab_20.levelIndexMP = "k2";

		// levelIconPrefab_22 (prefab fields)
		levelIconPrefab_22.levelIndex = 16;
		levelIconPrefab_22.levelIndexMP = "p1";

		// levelIconPrefab_23 (prefab fields)
		levelIconPrefab_23.levelIndex = 21;
		levelIconPrefab_23.levelIndexMP = "g3";

		// levelIconPrefab_24 (prefab fields)
		levelIconPrefab_24.levelIndex = 20;
		levelIconPrefab_24.levelIndexMP = "g2";

		// levelIconPrefab_25 (prefab fields)
		levelIconPrefab_25.levelIndex = 19;
		levelIconPrefab_25.levelIndexMP = "g1";

		// levelIconPrefab_26 (prefab fields)
		levelIconPrefab_26.levelIndex = 18;
		levelIconPrefab_26.levelIndexMP = "p3";

		// levelIconPrefab_21 (prefab fields)
		levelIconPrefab_21.levelIndex = 23;
		levelIconPrefab_21.levelIndexMP = "k1";

		this.levelPreviewImageOld = levelPreviewImageOld;
		this.levelPreviewText = levelPreviewText;
		this.levelPreviewImage = levelPreviewImage;
		this.levelPreviewImage_1 = levelPreviewImage_1;
		this.menuButtonContainer = menuButtonContainer;
		this.menuBack = menuBack;
		this.hintText_1 = hintText_1;
		this.highscoreWindowContainer = highscoreWindowContainer;
		this.highscoreMeter = highscoreMeter;
		this.scoreMeter = scoreMeter;
		this.bronzeIndicator = bronzeIndicator;
		this.bronzeMilestone = bronzeMilestone;
		this.silverIndicator = silverIndicator;
		this.silverMilestone = silverMilestone;
		this.goldIndicator = goldIndicator;
		this.goldMilestone = goldMilestone;
		this.highscoreText = highscoreText;
		this.scoreText = scoreText;
		this.lockedWindowContainer = lockedWindowContainer;
		this.lockedWindowHeader = lockedWindowHeader;
		this.awardsNeededContainerGold = awardsNeededContainerGold;
		this.countGold = countGold;
		this.awardNeededIcon4 = awardNeededIcon4;
		this.headerGold = headerGold;
		this.awardsNeededContainerSilver = awardsNeededContainerSilver;
		this.countSilver = countSilver;
		this.awardNeededIcon3 = awardNeededIcon3;
		this.headerSilver = headerSilver;
		this.awardsNeededContainerBronze = awardsNeededContainerBronze;
		this.countBronze = countBronze;
		this.awardNeededIcon2 = awardNeededIcon2;
		this.headerBronze = headerBronze;
		this.awardsNeededContainerPlayed = awardsNeededContainerPlayed;
		this.countPlayed = countPlayed;
		this.awardNeededIcon1 = awardNeededIcon1;
		this.headerPlayed = headerPlayed;
		this.levelIconPrefab = levelIconPrefab;
		this.levelIconPrefab_1 = levelIconPrefab_1;
		this.levelIconPrefab_2 = levelIconPrefab_2;
		this.levelIconPrefab_3 = levelIconPrefab_3;
		this.levelIconPrefab_4 = levelIconPrefab_4;
		this.levelIconPrefab_5 = levelIconPrefab_5;
		this.levelIconPrefab_6 = levelIconPrefab_6;
		this.levelIconPrefab_7 = levelIconPrefab_7;
		this.levelIconPrefab_8 = levelIconPrefab_8;
		this.levelIconPrefab_9 = levelIconPrefab_9;
		this.levelIconPrefab_10 = levelIconPrefab_10;
		this.levelIconPrefab_11 = levelIconPrefab_11;
		this.levelIconPrefab_12 = levelIconPrefab_12;
		this.levelIconPrefab_13 = levelIconPrefab_13;
		this.levelIconPrefab_14 = levelIconPrefab_14;
		this.levelIconPrefab_15 = levelIconPrefab_15;
		this.levelIconPrefab_16 = levelIconPrefab_16;
		this.levelIconPrefab_17 = levelIconPrefab_17;
		this.levelIconPrefab_18 = levelIconPrefab_18;
		this.levelIconPrefab_19 = levelIconPrefab_19;
		this.levelIconPrefab_20 = levelIconPrefab_20;
		this.levelIconPrefab_22 = levelIconPrefab_22;
		this.levelIconPrefab_23 = levelIconPrefab_23;
		this.levelIconPrefab_24 = levelIconPrefab_24;
		this.levelIconPrefab_25 = levelIconPrefab_25;
		this.levelIconPrefab_26 = levelIconPrefab_26;
		this.levelIconPrefab_21 = levelIconPrefab_21;
		this.hintBack = hintBack;
		this.hintText = hintText;
		this.menuContainer = menuContainer;
		this.characterSelectContainer = characterSelectContainer;
		this.characterDescText = characterDescText;
		this.characterDescText2 = characterDescText2;
		this.characterNameText = characterNameText;
		this.levelNameText_2 = levelNameText_2;
		this.levelNameText_1 = levelNameText_1;
		this.levelNameText = levelNameText;
		this.levelAuthorText_1 = levelAuthorText_1;
		this.levelAuthorText_2 = levelAuthorText_2;
		this.levelAuthorText = levelAuthorText;
		this.selectedCharacterBack = selectedCharacterBack;
		this.selectedCharacterText = selectedCharacterText;
		this.selectedCharacterSprite = selectedCharacterSprite;
		this.mysteryCharacterContainer = mysteryCharacterContainer;
		this.specialCharacterImage = specialCharacterImage;
		this.specialCharacterQuestionMark = specialCharacterQuestionMark;
		this.characterUnlockedContainer = characterUnlockedContainer;
		this.unlockedCharacterIllustration = unlockedCharacterIllustration;
		this.unlockedText = unlockedText;
		this.characterUnlockedDismissButton = characterUnlockedDismissButton;
		this.unlockedCharacterNameText = unlockedCharacterNameText;
		this.altUnlockedContainer = altUnlockedContainer;
		this.unlockedCharacterText1 = unlockedCharacterText1;
		this.characterUnlockedDismissButton1 = characterUnlockedDismissButton1;
		this.unlockedAltIcon = unlockedAltIcon;
		this.levelBackList = levelBackList;

		this.events.emit("scene-awake");
	}

	private levelPreviewImageOld!: Phaser.GameObjects.Image;
	private levelPreviewText!: Phaser.GameObjects.BitmapText;
	private levelPreviewImage!: Phaser.GameObjects.Image;
	private levelPreviewImage_1!: Phaser.GameObjects.Image;
	private menuButtonContainer!: Phaser.GameObjects.Container;
	private menuBack!: Phaser.GameObjects.Rectangle;
	private hintText_1!: Phaser.GameObjects.BitmapText;
	private highscoreWindowContainer!: Phaser.GameObjects.Container;
	private highscoreMeter!: Phaser.GameObjects.Image;
	private scoreMeter!: Phaser.GameObjects.Image;
	private bronzeIndicator!: Phaser.GameObjects.Rectangle;
	private bronzeMilestone!: Phaser.GameObjects.BitmapText;
	private silverIndicator!: Phaser.GameObjects.Rectangle;
	private silverMilestone!: Phaser.GameObjects.BitmapText;
	private goldIndicator!: Phaser.GameObjects.Rectangle;
	private goldMilestone!: Phaser.GameObjects.BitmapText;
	private highscoreText!: Phaser.GameObjects.BitmapText;
	private scoreText!: Phaser.GameObjects.BitmapText;
	private lockedWindowContainer!: Phaser.GameObjects.Container;
	private lockedWindowHeader!: Phaser.GameObjects.BitmapText;
	private awardsNeededContainerGold!: Phaser.GameObjects.Container;
	private countGold!: Phaser.GameObjects.BitmapText;
	private awardNeededIcon4!: Phaser.GameObjects.Image;
	private headerGold!: Phaser.GameObjects.BitmapText;
	private awardsNeededContainerSilver!: Phaser.GameObjects.Container;
	private countSilver!: Phaser.GameObjects.BitmapText;
	private awardNeededIcon3!: Phaser.GameObjects.Image;
	private headerSilver!: Phaser.GameObjects.BitmapText;
	private awardsNeededContainerBronze!: Phaser.GameObjects.Container;
	private countBronze!: Phaser.GameObjects.BitmapText;
	private awardNeededIcon2!: Phaser.GameObjects.Image;
	private headerBronze!: Phaser.GameObjects.BitmapText;
	private awardsNeededContainerPlayed!: Phaser.GameObjects.Container;
	private countPlayed!: Phaser.GameObjects.BitmapText;
	private awardNeededIcon1!: Phaser.GameObjects.Image;
	private headerPlayed!: Phaser.GameObjects.BitmapText;
	private levelIconPrefab!: LevelIconPrefab;
	private levelIconPrefab_1!: LevelIconPrefab;
	private levelIconPrefab_2!: LevelIconPrefab;
	private levelIconPrefab_3!: LevelIconPrefab;
	private levelIconPrefab_4!: LevelIconPrefab;
	private levelIconPrefab_5!: LevelIconPrefab;
	private levelIconPrefab_6!: LevelIconPrefab;
	private levelIconPrefab_7!: LevelIconPrefab;
	private levelIconPrefab_8!: LevelIconPrefab;
	private levelIconPrefab_9!: LevelIconPrefab;
	private levelIconPrefab_10!: LevelIconPrefab;
	private levelIconPrefab_11!: LevelIconPrefab;
	private levelIconPrefab_12!: LevelIconPrefab;
	private levelIconPrefab_13!: LevelIconPrefab;
	private levelIconPrefab_14!: LevelIconPrefab;
	private levelIconPrefab_15!: LevelIconPrefab;
	private levelIconPrefab_16!: LevelIconPrefab;
	private levelIconPrefab_17!: LevelIconPrefab;
	private levelIconPrefab_18!: LevelIconPrefab;
	private levelIconPrefab_19!: LevelIconPrefab;
	private levelIconPrefab_20!: LevelIconPrefab;
	private levelIconPrefab_22!: LevelIconPrefab;
	private levelIconPrefab_23!: LevelIconPrefab;
	private levelIconPrefab_24!: LevelIconPrefab;
	private levelIconPrefab_25!: LevelIconPrefab;
	private levelIconPrefab_26!: LevelIconPrefab;
	private levelIconPrefab_21!: LevelIconPrefab;
	private hintBack!: Phaser.GameObjects.Rectangle;
	private hintText!: Phaser.GameObjects.BitmapText;
	private menuContainer!: Phaser.GameObjects.Container;
	private characterSelectContainer!: Phaser.GameObjects.Container;
	private characterDescText!: Phaser.GameObjects.BitmapText;
	private characterDescText2!: Phaser.GameObjects.BitmapText;
	private characterNameText!: Phaser.GameObjects.BitmapText;
	private levelNameText_2!: Phaser.GameObjects.BitmapText;
	private levelNameText_1!: Phaser.GameObjects.BitmapText;
	private levelNameText!: Phaser.GameObjects.BitmapText;
	private levelAuthorText_1!: Phaser.GameObjects.BitmapText;
	private levelAuthorText_2!: Phaser.GameObjects.BitmapText;
	private levelAuthorText!: Phaser.GameObjects.BitmapText;
	private selectedCharacterBack!: Phaser.GameObjects.Rectangle;
	private selectedCharacterText!: Phaser.GameObjects.BitmapText;
	private selectedCharacterSprite!: Phaser.GameObjects.Image;
	private mysteryCharacterContainer!: Phaser.GameObjects.Container;
	private specialCharacterImage!: Phaser.GameObjects.Image;
	private specialCharacterQuestionMark!: Phaser.GameObjects.BitmapText;
	private characterUnlockedContainer!: Phaser.GameObjects.Container;
	private unlockedCharacterIllustration!: Phaser.GameObjects.Image;
	private unlockedText!: Phaser.GameObjects.BitmapText;
	private characterUnlockedDismissButton!: Phaser.GameObjects.Rectangle;
	private unlockedCharacterNameText!: Phaser.GameObjects.BitmapText;
	private altUnlockedContainer!: Phaser.GameObjects.Container;
	private unlockedCharacterText1!: Phaser.GameObjects.BitmapText;
	private characterUnlockedDismissButton1!: Phaser.GameObjects.Rectangle;
	private unlockedAltIcon!: Phaser.GameObjects.Image;
	private levelBackList!: Array<any>;

	/* START-USER-CODE */

	private UICam!: Phaser.Cameras.Scene2D.BaseCamera | any;

	public static levelsKey = 
		[
		// TUTORIAL 1
		'jump', 
		'flap', 
		'punch',

		// TUTORIAL 2
		'airborne',
		'dive',
		'dive-practice',

		// TUTORIAL 3
		'uppercut',
		'charge',
		'tutorial-finale', 

		// MAIN 1
		'bomb-intro',
		'combo',
		'bomb-holder', 

		// MAIN 2
		'umbrella-intro',
		'bomb-punch',

		// MAIN 3
		'pogo-intro',
		'umbrella-shield',

		// HARD 1
		'mine-intro',
		'pogo-ideas',

		// HARD 2
		'mine-enemy',
		'mine-wall',

		// HARD 3
		'gun-intro',

		// HARD 3
		'finale'

		// 'mine-enemy',
		];

	public static mpLevelsKey = 
		[
		// TUTORIAL 1
		'refresher', 

		'stann', 
		'MadChicks',
		'flipping-the-bird',
		'dry-madngtl',
		'DemolitionBirdSquad',
		'Roverkibb_Berry_Pie',
		'JohnTappington',
		'Spirosenjo',
		'TweetTowers',
		'tinas-tower',
		'Koffy',
		'likeadick',
		'The Perplex Plan',


		'Puck_Level1',
		'Puck_Level2',
		'Puck_Level3',		

		// gappy
		'A side',
		'Playground',
		'fully rested',

		'TheKid_Level1',		
		'TheKid_Level2',		
		'TheKid_Level3',		
		// 'An Apple a Day',
		];

	public static levelSelectEntry: 'titlescreen' | 'return' | 'complete' = 'titlescreen';

	private gamepad:Phaser.Input.Gamepad.Gamepad | undefined;
	private SelectKey!: Phaser.Input.Keyboard.Key;
	private StartKey!: Phaser.Input.Keyboard.Key;

	private levelIcons!: Array<LevelIconPrefab>;

	/** True during post-level sequence. Don't set directly. */
	private lockInput = false;

	/** `-1`, means none is selected. This value persists, so it's also the previous level index' */
	private selectedLevel = 0;

	/** used to only call functionality on down */
	private gamepadSelectorDown = false;

	/**
	 * When unlock check detects levels, the index is added to the end of the array.
	 * 
	 * The Unlock sequence animates the level index icon at [0], shifts it out and repeats.
	 */
	private levelIndexUnlockQueue: Array<number>;

	/**
	 * new medal check happens immediate upon complete, and this is set accordingly. The sequence following lastscore is determined by this.
	 * This could also be a first-complete below bronze milestone.
	 */
	private newAwardAchieved = false;

	/** Used by `setLockedWindow` */
	private justUnlockedLevel = 0;

	private scoreMeterTween!: Phaser.Tweens.Tween;

	private previewTween!: Phaser.Tweens.Tween;

	private hints = [``];
	private currentHint = 0;
	private hintTween!: Phaser.Tweens.Tween;

	private music: Phaser.Sound.BaseSound;

	private menuFocused = false;

 	private beatAllGappyLevels = false;
 	private beatAllPuckLevels = false;
 	private beatAllKidLevels = false;

	 	create() {

		window.dispatchEvent(new Event('loadKFCSave'));

		// this.registry.set(`unlocked-character: kid`, true);
		// this.registry.set(`unlocked-character: gappy`, true);
		// this.registry.set(`unlocked-character: puck`, true);

		// this.load.pack("music-pack-lazy-loaded", "assets/music/music-lazy-loaded.json");
		if (LevelSelect.levelSelectEntry === 'titlescreen') {
			if (!__MAP_PACK__) {
				this.load.audio("main-game", "assets/music/Like_it_Should.mp3");
				this.load.audio("hard-game", "assets/music/factory.mp3");
			}
			else {
				this.load.audio("gappy-music-ninja", "assets/music/map-pack/Gappy_level_theme (1).mp3");
				this.load.audio("puck-music-ninja", "assets/music/Grasslands_Bop_Metal_Version.mp3");
				this.load.audio("kid-music-ninja", "assets/music/map-pack/the_kid_track_no_intro.mp3");
			}
			if (cloudSaves.cloud || __MAP_PACK__) {
				this.load.audio("puck-music-1", "assets/music/map-pack/Blod_for_fone_W1.mp3");
				this.load.audio("puck-music-2", "assets/music/map-pack/Chimkn_Chicanery.mp3");
				this.load.audio("puck-music-3", "assets/music/map-pack/High_Jumper_Low_Blood_Pressure.mp3");
				this.load.audio("gappy-music-1", "assets/music/map-pack/Jolly_Green_Homewrecker.mp3");
				this.load.audio("gappy-music-2", "assets/music/map-pack/Coin_Carnage.mp3");
				this.load.audio("gappy-music-3", "assets/music/map-pack/Suicidal_Scavenger.mp3");
				this.load.audio("kid-music-1", "assets/music/map-pack/kid-world-1.mp3");
				this.load.audio("kid-music-2", "assets/music/map-pack/kid-world-2.mp3");
				this.load.audio("kid-music-3", "assets/music/map-pack/kid-world-3.mp3");
			}
			// this.load.audio(key, path);
			this.load.start();
		}

		this.editorCreate();
		this.createCameras();

		this.newAwardAchieved = false;

		this.menuFocused = false;

		this.justUnlockedLevel = 0;

		this.currentHint = 0;

		this.lockInput = false;

		this.levelIndexUnlockQueue = new Array<number>();

		if (__MAP_PACK__)
		{
			LevelSelect.levelsKey = LevelSelect.mpLevelsKey;
			mapPackDataSwap();

			// this.menuButtonContainer.setY(70);
			this.levelPreviewImage.setY(-23);
		}
		else
		{
			this.levelAuthorText.setVisible(false);
			this.levelAuthorText_1.setVisible(false);
			this.levelAuthorText_2.setVisible(false);
			this.levelNameText.setVisible(false);
			this.levelNameText_1.setVisible(false);
			this.levelNameText_2.setVisible(false);
			this.levelPreviewImage.setY(0);
		}

		// this.levelPreviewImage = this.add.image(this.titleText.x, this.titleText.y, `preview-${LevelSelect.levelsKey[this.selectedLevel]}`);


		this.menuBack.setInteractive();
		this.menuBack.on('pointerup', () =>
		{
			this.scene.launch('menu-scene');
			this.scene.pause();
		});
		// this.fullscreenBack.setInteractive();
		// this.fullscreenBack.on('pointerup', () =>
		// {
		// 	if (!this.scale.isFullscreen)
		// 	{
		// 		this.scale.startFullscreen();
		// 	}
		// 	else
		// 	{
		// 		this.scale.stopFullscreen();
		// 	}
		// });
		this.menuBack.on('pointerover', () =>
		{
			this.menuBack.fillColor = 8542833;
		});
		this.menuBack.on('pointerout', () =>
		{
			this.menuBack.fillColor = 10054789;
		});

	// use previously selected level
		if (this.registry.get('current-level-index'))
		{
			this.selectedLevel = this.registry.get('current-level-index');
		}

		// clear save data debug
		// this.input.keyboard.on('keydown-C', () =>
		// {
		// 	// if (!__DEV__)
		// 	// {
		// 	// 	console.debug('returned; dev only');
		// 	// 	return;
		// 	// }


		// 	this.loadCredits();
		// });

		// 	LevelSelect.levelsKey.forEach((value, index) =>
		// 	{
		// 		this.registry.set(`top-score: ${value}`, null);
		// 	});
		// 	cloudSaves.saveData(this);
		// });

		// load save data debug
		// this.input.keyboard.on('keydown-L', () =>
		// {
		// 	cloudSaves.loadData(this);

		// 	// this would be better with a status ready callback

		// 	this.setLevelIcons();
		// });

		// award gold debug
		this.input.keyboard.on('keydown-G', () =>
		{
			if (__DEV__)
			{
				this.registry.set(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`, 100000);
				this.topScoreCheck();
				this.unlockCheck();
			}
		});

		// unlock level debug
		this.input.keyboard.on('keydown-U', () =>
		{
			if (__DEV__)
			{
				this.registry.set
					(`unlocked: ${LevelSelect.levelsKey[this.selectedLevel]}`, true);
				this.registry.set
					(`unlocked: ${LevelSelect.levelsKey[this.selectedLevel]}`, true);
				this.levelIndexUnlockQueue.push(this.selectedLevel);
			}
		});

		// registry log debug
		this.input.keyboard.on('keydown-R', () =>
		{
			if (__DEV__)
			{
				console.debug(this.registry.list);
			}
		});


		// set medal debug
		this.input.keyboard.on('keydown-Q', () =>
		{
			if (__DEV__)
			{
				this.registry.set(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`,
				levelScoreMilestones.get(LevelSelect.levelsKey[this.selectedLevel])![0])
			}
		});
		this.input.keyboard.on('keydown-W', () =>
		{
			if (__DEV__)
			{
				this.registry.set(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`,
				levelScoreMilestones.get(LevelSelect.levelsKey[this.selectedLevel])![1])
			}
		});
		this.input.keyboard.on('keydown-E', () =>
		{
			if (__DEV__)
			{
				this.registry.set(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`,
				levelScoreMilestones.get(LevelSelect.levelsKey[this.selectedLevel])![2])
			}
		});

		// ninja mode
		// this.registry.set(`ninja`, false);
		this.input.keyboard.on('keydown-N', () =>
		{
			if (__DEV__)
			{
				let ninja = this.registry.get(`ninja`);
				this.registry.set(`ninja`, !ninja);
				console.log('ninja: ' + !ninja);
			}
		});

		// dev character select
		if (this.registry.get(`selected-character`) == undefined)
		{
			this.registry.set(`selected-character`, 'tapper');
			// this.registry.set(`selected-character`, 'tapper');
		}
		// this.input.keyboard.on('keydown-P', () =>
		// {
		// 	if (__DEV__ || __LEVEL_TEST__)
		// 	{
		// 		if (this.registry.get(`selected-character`) === 'tapper')
		// 		{
		// 			this.registry.set(`selected-character`, 'puck');
		// 			this.hintText.setText('CHARACTER SELECTED: PUCK. His jump isnt as high, but Puck has an extra air-jump.');
		// 		}
		// 		else if (this.registry.get(`selected-character`) === 'puck')
		// 		{
		// 			this.registry.set(`selected-character`, 'gappy');
		// 			this.hintText.setText('CHARACTER SELECTED: GAPPY. Gappy moves faster.');
		// 		}
		// 		else if (this.registry.get(`selected-character`) === 'gappy')
		// 		{
		// 			this.registry.set(`selected-character`, 'kid');
		// 			this.hintText.setText('CHARACTER SELECTED: KID');
		// 		}
		// 		else if (this.registry.get(`selected-character`) === 'kid')
		// 		{
		// 			this.registry.set(`selected-character`, 'tapper');
		// 			this.hintText.setText('CHARACTER SELECTED: TAPPER');
		// 		}
		// 	}
		// });

		// dev tileset select
		if (this.registry.get(`selected-tileset`) == undefined && __MAP_PACK__)
		{
			// this.registry.set(`selected-tileset`, '-gappy');
			this.registry.set(`selected-tileset`, '-ninja');
		}
		this.input.keyboard.on('keydown-O', () =>
		{
			if (__DEV__ || __LEVEL_TEST__)
			{
				if (this.registry.get(`selected-tileset`) === '-ninja')
				{
					this.registry.set(`selected-tileset`, '-puck');
					this.hintText.setText('TILSET SELECTED: puck');
				}
				else if (this.registry.get(`selected-tileset`) === '-puck')
				{
					this.registry.set(`selected-tileset`, '-gappy');
					this.hintText.setText('TILSET SELECTED: gappy');
				}
				else if (this.registry.get(`selected-tileset`) === '-gappy')
				{
					this.registry.set(`selected-tileset`, '-kid');
					this.hintText.setText('TILSET SELECTED: kid');
				}
				else if (this.registry.get(`selected-tileset`) === '-kid')
				{
					this.registry.set(`selected-tileset`, '-ninja');
					this.hintText.setText('TILSET SELECTED: ninja (map pack default)');
				}
			}
		});

		// nav right input - keyboard
		this.input.keyboard.on
			(`keydown-${InputManager.getInput('menu-right', 'keyboard')}`, () =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			this.menuNavigate('right');
		});
		// nav right input - gamepad
		this.input.gamepad.on(`down`, (pad:Phaser.Input.Gamepad.Gamepad, 
			button:Phaser.Input.Gamepad.Button, index:number) =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			if (button.index == InputManager.getInput('menu-right', 'gamepad'))
			{
				this.menuNavigate('right');
			}
		});

		// nav left input - keyboard
		this.input.keyboard.on
			(`keydown-${InputManager.getInput('menu-left', 'keyboard')}`, () =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			this.menuNavigate('left');
		});
		// nav left input - gamepad
		this.input.gamepad.on(`down`, (pad:Phaser.Input.Gamepad.Gamepad, 
			button:Phaser.Input.Gamepad.Button, index:number) =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			if (button.index == InputManager.getInput('menu-left', 'gamepad'))
			{
				this.menuNavigate('left');
			}
		});

		// nav up input - keyboard
		this.input.keyboard.on
			(`keydown-${InputManager.getInput('menu-up', 'keyboard')}`, () =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			this.menuNavigate('up')
		});
		// nav up input - gamepad
		this.input.gamepad.on(`down`, (pad:Phaser.Input.Gamepad.Gamepad, 
			button:Phaser.Input.Gamepad.Button, index:number) =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			if (button.index == InputManager.getInput('menu-up', 'gamepad'))
			{
				this.menuNavigate('up');
			}
		});

		// nav down input - keyboard
		this.input.keyboard.on
			(`keydown-${InputManager.getInput('menu-down', 'keyboard')}`, () =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			this.menuNavigate('down');
		});
		// nav down input - gamepad
		this.input.gamepad.on(`down`, (pad:Phaser.Input.Gamepad.Gamepad, 
			button:Phaser.Input.Gamepad.Button, index:number) =>
		{
			// input lock return
			if (this.lockInput)
			{
				console.debug('returned; `lockInput` is true');
				return;
			}

			if (button.index == InputManager.getInput('menu-down', 'gamepad'))
			{
				this.menuNavigate('down');
			}
		});

		// confirm input - keyboard
		this.input.keyboard.on
			(`keydown-${InputManager.getInput('menu-confirm', 'keyboard')}`, () =>
		{
			if (this.characterUnlockedContainer.visible) {
        this.setUnlockedCharacterPopup(false);
        this.music = SoundManager.setLevelSelectMusic(this.music, this);
      } else if (this.altUnlockedContainer.visible) {
        this.setUnlockedAltPopup(false);
        this.music = SoundManager.setLevelSelectMusic(this.music, this);
      }
      else if (this.lockInput)
      {
        console.debug('returned; `lockInput` is true');
        return;
      }
      else if (this.menuFocused)
      {
        this.scene.launch('menu-scene');
        this.scene.pause();
      }
      else
      {
        this.loadLevel();
      }
		});
		// confirm input - gamepad
		this.input.gamepad.on(`down`, (pad:Phaser.Input.Gamepad.Gamepad, 
			button:Phaser.Input.Gamepad.Button, index:number) =>
		{
			if (button.index == InputManager.getInput('menu-confirm', 'gamepad'))
			{
        if (this.characterUnlockedContainer.visible) {
          this.setUnlockedCharacterPopup(false);
          this.music = SoundManager.setLevelSelectMusic(this.music, this);
        } else if (this.altUnlockedContainer.visible) {
			this.setUnlockedAltPopup(false);
			this.music = SoundManager.setLevelSelectMusic(this.music, this);
		  }
        else if (this.lockInput)
        {
          console.debug('returned; `lockInput` is true');
          return;
        }
        else if (this.menuFocused)
        {
          this.scene.launch('menu-scene');
          this.scene.pause();
        }
				else
				{
					this.loadLevel();
				}
			}
		});

		// unlock first levels
		if (__MAP_PACK__)
		{
			this.registry.set(`unlocked: ${LevelSelect.levelsKey[0]}`, true);
		}
		else
		{
			this.registry.set(`unlocked: ${LevelSelect.levelsKey[0]}`, true);
			this.registry.set(`unlocked: ${LevelSelect.levelsKey[1]}`, true);
			this.registry.set(`unlocked: ${LevelSelect.levelsKey[2]}`, true);
		}

		// level icons setup
		this.levelIcons = new Array<LevelIconPrefab>();
		this.levelIcons.push(this.levelIconPrefab);
		this.levelIcons.push(this.levelIconPrefab_1);
		this.levelIcons.push(this.levelIconPrefab_2);
		this.levelIcons.push(this.levelIconPrefab_3);
		this.levelIcons.push(this.levelIconPrefab_4);
		this.levelIcons.push(this.levelIconPrefab_5);
		this.levelIcons.push(this.levelIconPrefab_6);
		if (!__MAP_PACK__) {

			this.levelIcons.push(this.levelIconPrefab_7);
			this.levelIcons.push(this.levelIconPrefab_8);
    }
		this.levelIcons.push(this.levelIconPrefab_13);
		this.levelIcons.push(this.levelIconPrefab_9);
		this.levelIcons.push(this.levelIconPrefab_17);
		this.levelIcons.push(this.levelIconPrefab_16);
		this.levelIcons.push(this.levelIconPrefab_15);
		this.levelIcons.push(this.levelIconPrefab_14);
		this.levelIcons.push(this.levelIconPrefab_12);
		// this.levelIcons.push(this.levelIconPrefab_11);
		// this.levelIcons.push(this.levelIconPrefab_10);
		this.levelIcons.push(this.levelIconPrefab_22);
		this.levelIcons.push(this.levelIconPrefab_18);
		this.levelIcons.push(this.levelIconPrefab_26);
		this.levelIcons.push(this.levelIconPrefab_25);
		this.levelIcons.push(this.levelIconPrefab_24);
		this.levelIcons.push(this.levelIconPrefab_23);
		this.levelIcons.push(this.levelIconPrefab_21);
		this.levelIcons.push(this.levelIconPrefab_20);
		this.levelIcons.push(this.levelIconPrefab_19);
		this.setLevelIcons();

		if (__MAP_PACK__)
		{
			this.levelIconPrefab_8.setVisible(false);
			this.levelIconPrefab_7.setVisible(false);
		}
		else
		{
			this.levelIconPrefab_21.setVisible(false);
			this.levelIconPrefab_20.setVisible(false);
			this.levelIconPrefab_19.setVisible(false);
		}

		// level icons pointer input
		this.levelIcons.forEach((value, index) =>
		{
			value.setSize(35, 45);
			value.setInteractive();
			value.on('pointerdown', () =>
			{
				// input lock return
				if (this.lockInput)
				{
					console.debug('returned; `lockInput` is true');
					return;
				}

				// if second tap, load level
				if (this.selectedLevel === index)
				{
					this.loadLevel();
				}

				// select level
				else
				{
					this.setSelectedLevel(index, true);
				}
			});
		});

		if (this.selectedLevel > -1)
		{
			this.setSelectedLevel(this.selectedLevel, true);
		}

		if (LevelSelect.levelSelectEntry === 'complete')
		{
			// Set locked window based on registry before the completed level is factored in, so the 'update locked window sequence' can have a before / after.
			this.setLockedWindow(false);
			this.lockedWindowContainer.setVisible(false);
			this.highscoreWindowContainer.setVisible(true);

			this.topScoreCheck();
			this.unlockCheck();
			this.lastScoreSequence();

			cloudSaves.saveData(this);

		}
		else
		{
			this.setupHints();

			// music
			this.music = SoundManager.setLevelSelectMusic(this.music, this);

		}

		if (__MAP_PACK__)
		{
			// change UI
			this.hintText.setVisible(false);
			this.hintBack.setVisible(false)

      this.selectedCharacterText.setVisible(true);
      this.selectedCharacterSprite.setVisible(true);
      this.selectedCharacterBack.setVisible(true);
      this.updateSelectedCharacter();
		}
    else
    {
      this.selectedCharacterBack.setVisible(false);
      this.selectedCharacterText.setVisible(false);
      this.selectedCharacterSprite.setVisible(false);
    }

    this.characterUnlockedDismissButton.setInteractive();
    this.characterUnlockedDismissButton.on('pointerdown', () => {
      this.setUnlockedCharacterPopup(false);
      this.music = SoundManager.setLevelSelectMusic(this.music, this);
    });

	this.characterUnlockedDismissButton1.setInteractive();
    this.characterUnlockedDismissButton1.on('pointerdown', () => {
      this.setUnlockedAltPopup(false);
      this.music = SoundManager.setLevelSelectMusic(this.music, this);
    });

	this.events.on('resume', () => {
		this.setSelectedLevel(this.selectedLevel, undefined, true);
	})}

  public updateSelectedCharacter()
  {
    if (this.registry.get('selected-character') === 'tapper') {
      if (__MAP_PACK__) {
		this.selectedCharacterSprite.setTexture("tapper-atlas_1", "run/04");
        this.selectedCharacterSprite.clearTint();
        this.selectedCharacterSprite.setAlpha(1);
      }
      else {
        this.selectedCharacterSprite.setTexture("tapper-atlas", "run/04");
        this.selectedCharacterSprite.clearTint();
        this.selectedCharacterSprite.setAlpha(1);
      }
    }
    else if (this.registry.get('selected-character') === 'puck') {
        if (this.registry.get('character-alt')) {
			this.selectedCharacterSprite.setTexture("pucamuc-alt", "flap/02");
		} else {
			this.selectedCharacterSprite.setTexture("pucamuc", "airborne/00");
		}

      if (this.registry.get('unlocked-character: puck')) {
        this.selectedCharacterSprite.clearTint();
        this.selectedCharacterSprite.setAlpha(1);
      }
      else {
        this.selectedCharacterSprite.setTint(0x000000, 0x000000, 0x000000, 0x000000);
        this.selectedCharacterSprite.setAlpha(.4);
      }
    }
    else if (this.registry.get('selected-character') === 'gappy') {
        if (this.registry.get('character-alt')) {
			this.selectedCharacterSprite.setTexture("gappy-alt", "airborne-tired/00");
		} else {
			this.selectedCharacterSprite.setTexture("gappy", "airborne/00");
		}
      if (this.registry.get('unlocked-character: gappy')) {
        this.selectedCharacterSprite.clearTint();
        this.selectedCharacterSprite.setAlpha(1);
      }
      else {
        this.selectedCharacterSprite.setTint(0x000000, 0x000000, 0x000000, 0x000000);
        this.selectedCharacterSprite.setAlpha(.4);
      }
    }
    else if (this.registry.get('selected-character') === 'kid') {
        if (this.registry.get('character-alt')) {
			this.selectedCharacterSprite.setTexture("kid-alt", "run/02");
		} else {
			this.selectedCharacterSprite.setTexture("kid", "flap/03");
		}
      if (this.registry.get('unlocked-character: kid')) {
        this.selectedCharacterSprite.clearTint();
        this.selectedCharacterSprite.setAlpha(1);
      }
      else {
        this.selectedCharacterSprite.setTint(0x000000, 0x000000, 0x000000, 0x000000);
        this.selectedCharacterSprite.setAlpha(.4);
      }}
  }

	setupHints()
	{
		let hints1 = 
		[
			`Tap a level to select it, and tap again to start it`,
			`Use the ${InputManager.getInputName('menu-navigate')} to select a level, and hit the ${InputManager.getInputName('menu-confirm')} to start it.`
		]
		let hints2 = 
		[
			`You'll need to earn awards to unlock levels. Try replaying levels for a better score!`,
			`The meter above shows your top score for the level and each award milestone.`
		]
		let hints3 = 
		[
			`Your combo increases for every enemy you defeat while staying airborne.`,
			`For each enemy you defeat you'll get 100 points multiplied by your combo number.`
		]
		let hints4 = 
		[	
			`Remember that you can dive to take out enemies below.`,
			`Uppercut to handle enemies above.`,
			`Big combos are how you get real high-scores!`
		]
		let hints5 = 
		[	
			`Bombs won't explode on contact with your fists.`,
			`Try deflecting bombs!`,
			`Finding the route to get the highest score is a puzzle.`,
			`Each problem has multiple approaches you can take.`,
			`Replay any of the tutorial levels if you ever need a refresher on something.`,
			`Stuck on a level? You can always return to it later.`
		]
		let hints6 = 
		[
			`Umbrella enemies are protected from rain. And diving birds.`,
			`Wait behind a wall to time your approach against bouncing pogo enemies.`,
			`You'll need 15 silver and 8 gold awards to unlock the last level set.`,
			`Every enemy is possible to defeat, even if not with direct attacks.`,
			`Use your new skills to get better scores on old levels!`
		]
		let hints7 = 
		[
			`True gamers have all the gold awards.`,
			`Gold is awarded for a theoretically perfect run.`,
			`There are eggs hidden in four of the levels.`,
			`Look around level 12 for the first secret egg.`,
			`A secret egg can be found far below a ceiling of mines.`,
			`A secret egg can be found by flying right, underneath a big platform.`,
			`Climb above a group of 5 floating enemies, then head left to find a secret egg.`,
			// `Have you seen the credits sequence yet? Beat all levels to reveal it.`,
			`On at least one level it's possible to score above the gold award milestone...`
		]

		let hintsMP = 
		[
			`Using a special character may make a level easier, harder, or impossible!`,
			`True gamers have all the gold awards.`,
			`Gold is awarded for a theoretically perfect run.`,
		]

		if (this.registry.get(`top-score: finale`))
		{
			// completed finale

			this.hints = Phaser.Math.RND.shuffle(hints7);
		}
		else if (this.registry.get(`unlocked: mine-intro`))
		{
			// unlocked hard levels

			this.hints = Phaser.Math.RND.shuffle(hints6);
		}
		else if (this.registry.get(`unlocked: umbrella-intro`))
		{
			// unlocked umbrella intro

			this.hints = Phaser.Math.RND.shuffle(hints5);
		}
		else if (this.registry.get(`unlocked: bomb-intro`))
		{
			// unlocked first city levels

			this.hints = Phaser.Math.RND.shuffle(hints4);
		}
		else if (this.registry.get(`unlocked: uppercut`))
		{
			// unlocked hard levels

			this.hints = Phaser.Math.RND.shuffle(hints3);
		}
		else if (this.registry.get(`top-score: punch`) != undefined)
		{
			// unlocked hard levels

			this.hints = hints2;
		}
		else
		{
			// nothing unlocked

			if (this.registry.get('mobile'))
			{
				this.hints = [hints1[0]];
			}
			else
			{
				this.hints = [hints1[1]];
			}
		}

		this.setHint();
	}

	setHint()
	{
		this.hintText.setText(this.hints[this.currentHint]);

		this.hintText.setY(230);
		this.hintText.setAlpha(0);
		this.hintTween = this.tweens.add
		({
			targets: this.hintText,
			alpha: 1,
			y: 215,
			duration: 300,
			ease: Phaser.Math.Easing.Cubic.Out
		});
		this.hintTween = this.tweens.add
		({
			targets: this.hintText,
			alpha: 0,
			y: 230,
			duration: 300,
			delay: 8500,
			ease: Phaser.Math.Easing.Cubic.In
		});

		this.currentHint++;
		if (this.currentHint === this.hints.length)
		{
			this.currentHint = 0;
		}

		let _this = this;
		this.time.delayedCall(10000, this.setHint, undefined, _this)
	}

	/**
	 * Set variables, visuals to reflect selected level.
	 * 
	 * Score window or unlock window will be set.
	 * 
	 * Level preview image is set
	 * 
	 * @param levelIndex For navigation, this can be the current selected input + 1 or so. Out of range indexes will be handled.
	 */
	setSelectedLevel(levelIndex: number, initial?: boolean, muteSFX?: boolean)
	{
    if (!initial && !muteSFX) {
      this.sound.play('menu-tick');
    }


		console.debug(levelIndex);

		this.menuFocused = false;
		this.setMenuFocus(false);

		// clamp
		// if (levelIndex < 0)
		// {
		// 	levelIndex = 0;
		// }
		// else if (levelIndex > LevelSelect.levelsKey.length - 1)
		// {
		// 	levelIndex = LevelSelect.levelsKey.length - 1;
		// }
		levelIndex = Phaser.Math.Clamp(levelIndex, 0, LevelSelect.levelsKey.length - 1);

		// set var
		this.selectedLevel = levelIndex;

		// set visual
		this.setHighlightedLevel(levelIndex);

		// locked check
		if (this.registry.get(`unlocked: ${LevelSelect.levelsKey[levelIndex]}`))
		{	
			this.setScoreWindow();
		}
		else
		{
			this.setLockedWindow(false);
		}

		// set preview
		this.setPreview();

		if (__MAP_PACK__)
		{
			// set text (map pack)
			if (this.registry.get(`unlocked: ${LevelSelect.levelsKey[levelIndex]}`) || __LEVEL_TEST__ || __DEV__)
			{
				this.levelNameText.setText(mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![0]);
				this.levelNameText_1.setText(mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![0]);
				this.levelNameText_2.setText(mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![0]);
				this.levelAuthorText.setText('by ' + mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![1]);
				this.levelAuthorText_1.setText('by ' + mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![1]);
				this.levelAuthorText_2.setText('by ' + mpLevelNames.get(LevelSelect.levelsKey[levelIndex])![1]);
				if (this.selectedLevel === 4)
				{
					this.levelNameText.setFontSize(-9);
					this.levelNameText_1.setFontSize(-9);
					this.levelNameText_2.setFontSize(-9);
				}
				else
				{
					this.levelNameText.setFontSize(-16);
					this.levelNameText_1.setFontSize(-16);
					this.levelNameText_2.setFontSize(-16);
				}
			}
			else
			{
				this.levelNameText.setText('LOCKED');
				this.levelAuthorText.setText('');
			}

			// set tilemap
			if (LevelSelect.levelsKey[levelIndex] === 'Puck_Level1' || LevelSelect.levelsKey[levelIndex] === 'Puck_Level2' || LevelSelect.levelsKey[levelIndex] === 'Puck_Level3')
			{
				this.registry.set(`selected-tileset`, '-puck');
        		this.registry.set(`selected-character`, 'puck');
				if (this.registry.get(`manually-selected-character`) !== 'puck' && this.registry.get(`selected-character-alt`)) {
					this.registry.set('character-alt', false);
				} else if (this.registry.get(`manually-selected-character`) === 'puck') {
					this.registry.set(`character-alt`, this.registry.get('selected-character-alt'));
				}
			}
			else if (LevelSelect.levelsKey[levelIndex] === 'TheKid_Level1' || LevelSelect.levelsKey[levelIndex] === 'TheKid_Level2' || LevelSelect.levelsKey[levelIndex] === 'TheKid_Level3'  || LevelSelect.levelsKey[levelIndex] === 'An Apple a Day')
			{
				this.registry.set(`selected-tileset`, '-kid');
				this.registry.set(`selected-character`, 'kid');
				if (this.registry.get(`manually-selected-character`) !== 'kid' && this.registry.get(`selected-character-alt`)) {
					this.registry.set('character-alt', false);
				} else if (this.registry.get(`manually-selected-character`) === 'kid') {
					this.registry.set(`character-alt`, this.registry.get('selected-character-alt'));
				}
			}
			else if (LevelSelect.levelsKey[levelIndex] === 'fully rested' || LevelSelect.levelsKey[levelIndex] === 'Playground' || LevelSelect.levelsKey[levelIndex] === 'A side')
			{
				this.registry.set(`selected-tileset`, '-gappy');
				this.registry.set(`selected-character`, 'gappy');
				if (this.registry.get(`manually-selected-character`) !== 'gappy' && this.registry.get(`selected-character-alt`)) {
					this.registry.set('character-alt', false);
				} else if (this.registry.get(`manually-selected-character`) === 'gappy') {
					this.registry.set(`character-alt`, this.registry.get('selected-character-alt'));
				}
			}
			else
			{
				this.registry.set(`selected-tileset`, '-ninja');
        		this.registry.set(`selected-character`, this.registry.get('manually-selected-character'));
        		this.registry.set(`character-alt`, this.registry.get('selected-character-alt'));
			}

			this.updateSelectedCharacter();
		}
	}

	/**
	 * Sets focus to menu button rather than level icon
	 */
	setMenuFocus(value: boolean)
	{
		this.menuBack.isStroked = value;
		this.setHighlightedLevel(-1);
		this.menuFocused = value;
    if (value) {
      this.sound.play('menu-tick');
    }

	}

	/**
	 * Sets the preview for the currently selected level
	 * 
	 * If the level isn't unlocked or played, or if an image preview cannot be found, a template image will be used with accomodating text.
	 */
	setPreview()
	{
		this.mysteryCharacterContainer.setVisible(false);

		// some calls are redundant. Check if the current and intended image are the same, and return if so.
		if (this.levelPreviewImage.texture.key === `preview-${LevelSelect.levelsKey[this.selectedLevel]}`)
		{
			return;
		}

		this.levelPreviewImage.setX(0);
		if (this.previewTween)
		{
			this.previewTween.stop();
		}

		if (this.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`) != undefined || __DEV__)
		{
			// level has been beat

			if (this.game.textures.exists
				(`preview-${LevelSelect.levelsKey[this.selectedLevel]}`))
			{
				// setup tween
				this.previewTween = this.add.tween
				({
					targets: this.levelPreviewImage,
					duration: 500,
					ease: Phaser.Math.Easing.Cubic.Out,
					x: -20
				});

				// set preview image
				this.levelPreviewImage.setTexture
					(`preview-${LevelSelect.levelsKey[this.selectedLevel]}`);
				this.levelPreviewText.setText('');
			}
			else
			{
				// no image found

				// set blank
				this.levelPreviewImage.setTexture('preview-blank');
				this.levelPreviewText.setText('no prev image');
			}

		}
		else if (this.registry.get(`unlocked: ${LevelSelect.levelsKey[this.selectedLevel]}`))
		{
			// level has only been unlocked

			// set blank
			this.levelPreviewImage.setTexture('preview-blank');
			this.levelPreviewText.setText('Level not beat');

      if (__MAP_PACK__)
      {
        if (this.selectedLevel > 13 && this.selectedLevel < 17)
        {
          this.specialCharacterImage.setTexture('illustration-puck');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(378, 10);
        }
        else if (this.selectedLevel > 16 && this.selectedLevel < 20)
        {
          this.specialCharacterImage.setTexture('illustration-gappy');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(378, 19);
        }
        else if (this.selectedLevel > 19)
        {
          this.specialCharacterImage.setTexture('illustration-kid');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(373, 10);
        }
        else
        {
          this.mysteryCharacterContainer.setVisible(false);
        }
      }
		}
		else
		{
			// level is locked

			// set blank
			this.levelPreviewImage.setTexture('preview-blank');
			this.levelPreviewText.setText('Level locked');


			if (__MAP_PACK__)
      {
        if (this.selectedLevel > 13 && this.selectedLevel < 17)
        {
          this.specialCharacterImage.setTexture('illustration-puck');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(378, 10);
        }
        else if (this.selectedLevel > 16 && this.selectedLevel < 20)
        {
          this.specialCharacterImage.setTexture('illustration-gappy');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(378, 19);
        }
        else if (this.selectedLevel > 19)
        {
          this.specialCharacterImage.setTexture('illustration-kid');
          this.mysteryCharacterContainer.setVisible(true);
          this.specialCharacterQuestionMark.setPosition(373, 10);
        }
        else
        {
          this.mysteryCharacterContainer.setVisible(false);
        }
      }
		}
	}

	/**
	 * Set & show window conveying which awards are needed for unlock.
	 * @param justUnlockedLevel or first locked level
	 * @returns 
	 */
	setLockedWindow(justUnlockedLevel: boolean)
	{
		// show / hide windows
		this.lockedWindowContainer.setVisible(true);
		this.highscoreWindowContainer.setVisible(false);

		// get first locked level
		let firstLockedLevel = 0;
		for (let i = 0; i < LevelSelect.levelsKey.length; i++)
		{
			if (!this.registry.get(`unlocked: ${LevelSelect.levelsKey[i]}`))
			{
				firstLockedLevel = i;
				break;
			}
		}

		console.debug(`first locked level: ${firstLockedLevel}`);
		console.debug(`just unlocked level: ${this.justUnlockedLevel}`);

		// All levels unlocked check
		if (firstLockedLevel === 0)
		{
			console.debug('no levels are locked');

			// Do something. Not sure what.

			return;
		}

		let _levelRequiredAwards = 0 as any;
		if (__MAP_PACK__)
			_levelRequiredAwards = mpLevelRequiredAwards;
		else
			_levelRequiredAwards = levelRequiredAwards;

		console.debug(levelRequiredAwards.get(LevelSelect.levelsKey[this.justUnlockedLevel]));


		const requiredAwards = 
			_levelRequiredAwards.get(LevelSelect.levelsKey
			[((justUnlockedLevel && this.justUnlockedLevel != 0) ? 
			this.justUnlockedLevel : firstLockedLevel)]);
		let remainingPlayed = requiredAwards![0];
		let remainingBronze = requiredAwards![1];
		let remainingSilver = requiredAwards![2];
		let remainingGold = requiredAwards![3];

		console.debug('required:');
		console.debug(requiredAwards);

		// calculate remaining played
		remainingPlayed -= getTotalAwards(this)[0];
		if (remainingPlayed < 0)
		{
			remainingPlayed = 0;	
		}
		// calculate remaining awards for bronze
		remainingBronze -= getTotalAwards(this)[1];
		if (remainingBronze < 0)
		{
			remainingBronze = 0;	
		}
		remainingSilver -= getTotalAwards(this)[2];
		// calculate remaining awards for silver
		if (remainingSilver < 0)
		{
			remainingSilver = 0;	
		}
		remainingGold -= getTotalAwards(this)[3];
		// calculate remaining awards for gold
		if (remainingGold < 0)
		{
			remainingGold = 0;	
		}

		console.debug('remaining: ' + remainingPlayed, remainingBronze, remainingSilver, remainingGold)

		// console.debug(`required awards: ${requiredAwards}`);
		// console.debug(`total awards: ${getTotalAwards(this)}`);
		// console.debug(`remaining awards: ${remainingAwards}`);

		/** 0-3. Used to determine container X placement */
		let awardTypesNeeded = 0;
		// set 'remaining played' container & text
		this.awardsNeededContainerPlayed.setVisible(remainingPlayed > 0);
		this.countPlayed.setText(`x ${remainingPlayed}`);
		if (remainingPlayed > 0)
		{
			awardTypesNeeded++;
		}
		// set 'remaining Bronze' container & text
		this.awardsNeededContainerBronze.setVisible(remainingBronze > 0);
		this.countBronze.setText(`x ${remainingBronze}`);
		if (remainingBronze > 0)
		{
			awardTypesNeeded++;
		}
		// set 'remaining silver' container & text
		this.awardsNeededContainerSilver.setVisible(remainingSilver > 0);
		this.countSilver.setText(`x ${remainingSilver}`);
		if (remainingSilver > 0)
		{
			awardTypesNeeded++;
		}
		// set 'remaining Gold' container & text
		this.awardsNeededContainerGold.setVisible(remainingGold > 0);
		this.countGold.setText(`x ${remainingGold}`);
		if (remainingGold > 0)
		{
			awardTypesNeeded++;
		}

		// set container positions
		let position = 0;
		this.awardsNeededContainerPlayed.setX(93);
		if (this.awardsNeededContainerPlayed.visible)
		{
			position++;
		}
		this.awardsNeededContainerBronze.setX(93 + (76 * position));
		if (this.awardsNeededContainerBronze.visible)
		{
			position++;
		}
		this.awardsNeededContainerSilver.setX(93 + (76 * position));
		if (this.awardsNeededContainerSilver.visible)
		{
			position++;
		}
		this.awardsNeededContainerGold.setX(93 + (76 * position));

		// // set text for bronze
		// this.bronzeCount.setText(`x ${remainingBronze}`);
		// // this.bronzeCount.setTintFill(remainingBronze > 0 ? 0xffffff : 0x84e467);
		// this.bronzeCount.setAlpha(remainingBronze > 0 ? 1 : .5);
		// this.level_icon_small_Bronze.setAlpha(remainingBronze > 0 ? 1 : .5);
		// // set text for silver
		// this.silverCount.setText(`x ${remainingSilver}`);
		// // this.silverCount.setTintFill(remainingSilver > 0 ? 0xffffff : 0x84e467);
		// this.silverCount.setAlpha(remainingSilver > 0 ? 1 : .5);
		// this.level_icon_small_Silver.setAlpha(remainingSilver > 0 ? 1 : .5);
		// // set text for gold
		// this.goldCount.setText(`x ${remainingGold}`);
		// // this.goldCount.setTintFill(remainingGold > 0 ? 0xffffff : 0x84e467);
		// this.goldCount.setAlpha(remainingGold > 0 ? 1 : .5);
		// this.level_icon_small_gold.setAlpha(remainingGold > 0 ? 1 : .5);

		// if (__MAP_PACK__)
		// {
		// 	if (this.selectedLevel > 14 && this.selectedLevel < 18)
		// 	{
		// 		this.specialCharacterImage.setTexture('illustration-puck');
		// 		this.mysteryCharacterContainer.setVisible(true);
		// 		this.specialCharacterQuestionMark.setPosition(378, 10);
		// 	}
		// 	else if (this.selectedLevel > 17 && this.selectedLevel < 21)
		// 	{
		// 		this.specialCharacterImage.setTexture('illustration-gappy');
		// 		this.mysteryCharacterContainer.setVisible(true);
		// 		this.specialCharacterQuestionMark.setPosition(378, 19);
		// 	}
		// 	else if (this.selectedLevel > 20)
		// 	{
		// 		this.specialCharacterImage.setTexture('illustration-kid');
		// 		this.mysteryCharacterContainer.setVisible(true);
		// 		this.specialCharacterQuestionMark.setPosition(373, 10);
		// 	}
		// 	else
		// 	{
		// 		this.mysteryCharacterContainer.setVisible(false);
		// 	}
		// }
	}

	setScoreWindow()
	{
		// show / hide windows
		this.lockedWindowContainer.setVisible(false);
		this.highscoreWindowContainer.setVisible(true);

		// get highscore
		let highscore = this.registry.get
			(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`);
		// if (highscore == null)
		// {
		// 	highscore = 0;
		// }

		// get score milestones
		const bronzeMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![0];
		const silverMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![1];
		const goldMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![2];

		// set text
		this.scoreText.setText('');
		this.highscoreText.setTint(0xffffff);
		this.highscoreText.setText((highscore != null) ? 
			`High-score: ${highscore}` : ``);
		this.bronzeMilestone.setText(`${bronzeMilestone}`);
		this.silverMilestone.setText(`${silverMilestone}`);
		this.goldMilestone.setText(`${goldMilestone}`);

		// set milestone positions
		const bronzeX = 51 + (Phaser.Math.Percent(bronzeMilestone, 0, goldMilestone) * 228);
		this.bronzeIndicator.setPosition(bronzeX, this.bronzeIndicator.y);
		this.bronzeMilestone.setPosition(bronzeX, this.bronzeMilestone.y);
		const silverX = 51 + (Phaser.Math.Percent(silverMilestone, 0, goldMilestone) * 228);
		this.silverIndicator.setPosition(silverX, this.silverIndicator.y);
		this.silverMilestone.setPosition(silverX + 3, this.silverMilestone.y);

		if (highscore)
		{
			// set meters
			let scorePercent = Phaser.Math.Percent(highscore, 0, goldMilestone)
			scorePercent = Phaser.Math.Clamp(scorePercent, 0, goldMilestone);
			this.highscoreMeter.setTintFill(0xffffff);
			this.highscoreMeter.setScale(scorePercent * 228, 10);
			this.scoreMeter.setScale(0, 10);
		}
		else
		{
			// set meters - no highscore
			this.highscoreMeter.setTintFill(0xCE97B5);
			this.highscoreMeter.setScale(228, 10);
			this.scoreMeter.setScale(0, 10);
		}
	}

	/**
	 * Sequnce of the score meter filling up.
	 * 
	 * Sets input lock on during sequence.
	 */
	lastScoreSequence()
	{
		this.lockInput = true;

		// get x scale
		const lastScore = this.registry.get('last-score');
		const goldMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![2];
		const width = Phaser.Math.Percent(lastScore, 0, goldMilestone) * 228

		// score window is already setup

		// set highscore text & meter colour
		this.highscoreMeter.setTintFill(0xCE97B5);
		this.highscoreText.setTint(0xCE97B5);

		if (!this.registry.get
			(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`))
		{
			this.highscoreText.setText('');
			this.scoreText.setX(50);
		}
		else
		{
			this.scoreText.setX(170);
		}

		if (lastScore > 0)
		{
			// setup tween
			const _this = this;
			this.scoreMeterTween = this.tweens.add
			({
				targets: this.scoreMeter,
				duration: 2000,
				ease: Phaser.Math.Easing.Quadratic.In,
				scaleX: width,
				onUpdate: () =>
				{
					console.debug(`prog: ${_this.scoreMeterTween.progress}`);
					_this.scoreText.setText
						(`New score: ${Math.floor(_this.scoreMeterTween.progress * lastScore)}`);
					// this.sound.play('reflect', { volume: .3, detune: ( this.scoreMeterTween.getValue() * 3) - 2000})
					SoundManager.play('bird-egg-lay', this, .1, ( this.scoreMeterTween.getValue() * 10) + 1000);
				}
			});
		}
		else
		{
			// set score text
			this.scoreText.setText(`New score: ${lastScore}`);

			// blink score text
			const _this = this;
			const blink = this.time.addEvent({ delay: 200, repeat: 7, callback: () =>
			{
				_this.scoreText.visible = !_this.scoreText.visible;
			}});
		}

		this.time.delayedCall(2000, () =>
		{
			this.lockInput = false;

			// set score text to exact score
			this.scoreText.setText(`New score: ${lastScore}`);

			this.completionMedalCheck();


			if (this.newAwardAchieved)
			{
				this.newAwardSequence();
			}
			else
			{
				this.setLevelIcons(this.selectedLevel);
				this.setupHints();

				// music
				this.music = SoundManager.setLevelSelectMusic(this.music, this);
			}
		});
	}

	/**
	 * Calls completed level's icon's achieve tween and sets input lock for the duration.
	 */
	newAwardSequence()
	{
		this.lockInput = true;

		// set visual
		this.setLevelIcons(this.selectedLevel);
		this.levelIcons[this.selectedLevel].runAchieveTween();

		// audio
		if (this.registry.get('last-score') < 
			levelScoreMilestones.get(LevelSelect.levelsKey[this.selectedLevel])![0])
		{
			this.sound.play('reflect');
		}
		else
		{
			this.sound.play('combo-hit');
		}

		this.time.delayedCall(1000, () =>
		{
			this.lockInput = false;

			this.setPreview();

			// this.unlockSequence();

			if (!this.registry.get(`no-more-unlocks`))
			{
				this.updateLockedWindowSequence();

				if (this.registry.get(`unlocked: finale`) || this.registry.get('unlocked: TheKid_Level3'))
				{
					this.registry.set(`no-more-unlocks`, true);
				}
			}
			else
			{
				// no more unlocks

				// music
				this.setUnlockedAltPopup(true);


				if (!this.setUnlockedCharacterPopup(true))
				{
					this.music = SoundManager.setLevelSelectMusic(this.music, this);
				}
			}

			this.trophyMedalCheck();
		});
	}

	setUnlockedAltPopup(value: boolean) {
		if (!__MAP_PACK__) {
			return;
		}

		let character: 'puck' | 'gappy' | 'kid' | undefined = undefined;
		if (value) {
			if (this.beatAllPuckLevels && !this.registry.get('unlocked-alt: puck')) {

				character = 'puck';
				this.unlockedCharacterText1.setText("You've unlocked Puck's\nalternate costume!");
				this.unlockedAltIcon.setTexture('pucamuc-alt', 'victory/00');
				this.registry.set('unlocked-alt: puck', true);
			}
			else if (this.beatAllGappyLevels && !this.registry.get('unlocked-alt: gappy')) {

				  character = 'gappy';
				  this.unlockedCharacterText1.setText("You've unlocked Gappy's\nalternate costume!");
				  this.unlockedAltIcon.setTexture('gappy-alt', 'victory/00');
				  this.registry.set('unlocked-alt: gappy', true);
		  }
			else if (this.beatAllKidLevels && !this.registry.get('unlocked-alt: kid')) {

				  character = 'kid';
				  this.unlockedCharacterText1.setText("You've unlocked The Kid's\nalternate costume!");
				  this.unlockedAltIcon.setTexture('kid-alt', 'victory/00');
				  this.registry.set('unlocked-alt: kid', true);
		  }
			else {
			  return false;
			}
			this.sound.play(SoundManager.getCharacterSFX('combo-end', character));

		}
		this.altUnlockedContainer.setVisible(value);
		this.lockInput = value;
		if (!value) {
			this.sound.play('menu-back');

			cloudSaves.saveData(this);
		}

		return true;


	}

	setUnlockedCharacterPopup(value: boolean): boolean {
		let character: 'puck' | 'gappy' | 'kid' = 'puck';
    if (value) {
      if (
        LevelSelect.levelsKey[this.selectedLevel] === 'Puck_Level1' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'Puck_Level2' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'Puck_Level3'
      ) {
        if (this.registry.get('unlocked-character: puck')) {
          return false;
        }

        character = 'puck';
        this.unlockedCharacterIllustration.setTexture('illustration-puck');
        this.unlockedCharacterNameText.setText("Puck!");
        this.registry.set('unlocked-character: puck', true);
		this.game.events.emit('unlock-medal: ifone ftw');
      }
      else if (
        LevelSelect.levelsKey[this.selectedLevel] === 'fully rested' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'Playground' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'A side'
        ) {
        if (this.registry.get('unlocked-character: gappy')) {
          return false;
        }

        character = 'gappy';
        this.unlockedCharacterIllustration.setTexture('illustration-gappy');
        this.unlockedCharacterNameText.setText("Gappy!");
        this.registry.set('unlocked-character: gappy', true);
		this.game.events.emit('unlock-medal: Bling King');
		}
      else if (
        LevelSelect.levelsKey[this.selectedLevel] === 'TheKid_Level1' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'TheKid_Level2' || 
        LevelSelect.levelsKey[this.selectedLevel] === 'TheKid_Level3'
        ) {
        if (this.registry.get('unlocked-character: kid')) {
          return false;
        }

        character = 'kid';
        this.unlockedCharacterNameText.setText("The Kid!");
        this.unlockedCharacterIllustration.setTexture('illustration-kid');
        this.registry.set('unlocked-character: kid', true);
		this.game.events.emit('unlock-medal: Near-Death Experience');
	} else {
		return false;
	}

      this.sound.play(SoundManager.getCharacterSFX('combo-end', character));

    }
    this.characterUnlockedContainer.setVisible(value);
    this.lockInput = value;
    if (!value) {
		this.sound.play('menu-back');

		cloudSaves.saveData(this);
	}
		return true;

	}

	updateLockedWindowSequence()
	{
		this.lockInput = true;

		this.lockedWindowContainer.setVisible(true);
		this.highscoreWindowContainer.setVisible(false);

		this.time.delayedCall(1000, () =>
		{
			this.setLockedWindow(true);
			SoundManager.play('reflect', this);
		});

		this.time.delayedCall(2000, () =>
		{
			this.lockInput = false;

			this.unlockSequence();
		});
	}

	unlockSequence()
	{
		if (this.levelIndexUnlockQueue.length === 0)
		{
			console.debug('return; nothing in queue');
			this.setupHints();

			this.setUnlockedAltPopup(true);

			// music
			if (!this.setUnlockedCharacterPopup(true))
        {
          this.music = SoundManager.setLevelSelectMusic(this.music, this);
        }

			return;
		}

		this.lockInput = true;

		// for each level index in unlock queue
		this.levelIndexUnlockQueue.forEach((value, index) => 
		{
			this.time.delayedCall(300 * index, () =>
			{
				// set visual
				this.setLevelIcons(value);
				this.levelIcons[value].runAchieveTween();
				this.levelIndexUnlockQueue.shift();

				// audio
				this.sound.play('unlock', { volume: .7, detune: Phaser.Math.RND.between(-200, 100) });

				// if end of sequence, unlock input
				if (this.levelIndexUnlockQueue.length === 0)
				{
					this.time.delayedCall(1000, () =>
					{
						this.setLockedWindow(false);

						this.setupHints();

						this.setUnlockedAltPopup(true);

									// music
						if (!this.setUnlockedCharacterPopup(true))
						{
							this.music = SoundManager.setLevelSelectMusic(this.music, this);
						}

						this.lockInput = false;
					});
				}
			});
		});
	}

	/**
	 * Compares last-score and top-score of selected level (which should be the just-completed one) for a new topscore.
	 * 
	 * If true, start 
	 */
	topScoreCheck()
	{
		// console.debug(`selected: ${this.selectedLevel}`);

		// null check
		if (this.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`) 
			!= null)
		{
			// console.debug(this.registry.get('last-score'));
			// console.debug(this.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`));

			// last-score top-score compare
			if (this.registry.get('last-score') > 
			this.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`))
			{
				console.debug('replace topscore');
				this.topScoreGet(true);
			}
			else
			{
				console.debug('no topscore');
			}
		}
		else
		{
			console.debug('first topscore');
			this.topScoreGet(false);
		}
	}

	/**
	 * Saves new top score to registry, then calls for cloud save.
	 * 
	 * Checks if a new award has been achieved, then sets var which determines sequence
	 * 
	 * @param replacingTopscore or setting first top score (currently unused)
	 */
	topScoreGet(replacingTopscore: boolean)
	{		
		console.log('topscore get!');

		// get last & top score
		const lastScore = this.registry.get('last-score');
		let topScore = this.registry.get
			(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`);
		// if (topScore == null)
		// {
		// 	topScore = 0;
		// }

		// get score milestones
		const bronzeMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![0];
		const silverMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![1];
		const goldMilestone = levelScoreMilestones.get
			(LevelSelect.levelsKey[this.selectedLevel])![2];

		// new award check
		if ((topScore == null)
		|| (topScore < bronzeMilestone && lastScore >= bronzeMilestone)
		|| (topScore < silverMilestone && lastScore >= silverMilestone)
		|| (topScore < goldMilestone && lastScore >= goldMilestone))
		{
			// set var which determines sequence
			this.newAwardAchieved = true;
			console.debug(`new award achieved`);
		}

		if (lastScore > goldMilestone)
		{
			this.game.events.emit(__MAP_PACK__ ? `unlock-medal: Seems like I've run out of waitin' time...` : 'unlock-medal: Muscly Arms');
		}

		// update registry & cloud save data
		this.registry.set(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`, 
			lastScore);
		// cloudSaves.saveData(this);
	}

	/**
	 * Checks if unlock condiditons are met for each locked level.
	 * 
	 * Called upon topscore get
	 */
	unlockCheck()
	{
		// get total awards
		const totalAwards = getTotalAwards(this);
		// console.debug(getTotalAwards(this));

		LevelSelect.levelsKey.forEach((value, index) =>
		{
			if (!this.registry.get(`unlocked: ${value}`))
			{
				// get level required awards
				let requiredAwards =  levelRequiredAwards.get(value);
				if (__MAP_PACK__) {
					requiredAwards = mpLevelRequiredAwards.get(value);
				}
				if (requiredAwards == null)
				{
					console.debug(`no award requirement data present for level: ${value}`);
					requiredAwards = [0, 0, 0, 0];
				}

				// console.debug(totalAwards);
				// console.debug(requiredAwards);

				// compare
				if (totalAwards[0] >= requiredAwards![0] && 
					totalAwards[1] >= requiredAwards![1] && 
					totalAwards[2] >= requiredAwards![2] && 
					totalAwards[3] >= requiredAwards![3])
				{
					console.debug('adding to queue');
					this.registry.set(`unlocked: ${value}`, true);
					this.justUnlockedLevel = index;
					this.levelIndexUnlockQueue.push(index);
				}
			}
		});
	}

	/**
	 * Sets appropriate icon for each level based on save data, which should not yet have been updated based on a just-completed level.
	 * @param levelIndex Only set this level index's icon. If null, set all.
	 */
	setLevelIcons(levelIndex?: number)
	{
		LevelSelect.levelsKey.forEach((value, index) =>
		{
			// level index skip
			console.debug(levelIndex)
			if (levelIndex != null)
			{
				if (levelIndex !== index)
				{
					// console.debug(`skipped level index ${index}`);
					return;
				}
			}

			console.debug(`setLevelIcons setting: ${value}`);

			// locked check
			if (!this.registry.get(`unlocked: ${value}`))
			{
				this.levelIcons[index].setIcon('locked');
				return;
			}

			// played check
			console.debug(value + this.registry.get(`top-score: ${value}`));
			if (this.registry.get(`top-score: ${value}`) == null)
			{
				console.debug('unplayed')
				this.levelIcons[index].setIcon('unplayed');
				return;
			}

			// at this point it's safe to use top-score value

			// award check
			const award = getEarnedAward(value, this.registry.get(`top-score: ${value}`));
			if (award === 'bronze')
			{
				this.levelIcons[index].setIcon('bronze');
			}
			else if (award === 'silver')
			{
				this.levelIcons[index].setIcon('silver');
			}
			else if (award === 'gold')
			{
				this.levelIcons[index].setIcon('gold');
			}
			else 
			{
				this.levelIcons[index].setIcon('played');
			}
		});
	}

	setHighlightedLevel(levelIndex: number)
	{
		this.levelIcons.forEach((value, iconIndex) =>
		{
			if (iconIndex === levelIndex)
			{
				value.setHighlight(true);
				// value.runAchieveTween();
			}
			else
			{
				value.setHighlight(false);
			}
		});
	}

	/**
	 * Checks total awards and emits NG.io medal unlock if all of any type have been acheived.
	 * 
	 * To be called after new award sequence
	 */
	trophyMedalCheck()
	{
		if (__MAP_PACK__) {
			const totalAwards = getTotalAwards(this, true);
			if (totalAwards[1] === 14)
			{
				this.game.events.emit('unlock-medal: Bronze Car');
			}
			if (totalAwards[2] === 14)
			{
				this.game.events.emit('unlock-medal: Silver Car');
			}
			if (totalAwards[3] === 14)
			{
				this.game.events.emit('unlock-medal: Golden Car');
			}	
		}

		const totalAwards = getTotalAwards(this);
		if (totalAwards[1] === LevelSelect.levelsKey.length)
		{
			this.game.events.emit('unlock-medal: Bronze Trophy');
		}
		if (totalAwards[2] === LevelSelect.levelsKey.length)
		{
			this.game.events.emit('unlock-medal: Silver Trophy');
		}
		if (totalAwards[3] === LevelSelect.levelsKey.length)
		{
			this.game.events.emit(__MAP_PACK__ ? 'unlock-medal: Platinum Car' : 'unlock-medal: Golden Trophy');
		}
	}

	completionMedalCheck()
	{
		let tutorialLevels = 0;
		let mainLevels = 0;
		let hardLevels = 0;

		let puckLevels = 0;
		let GappyLevels = 0;
		let KidLevels = 0;

		LevelSelect.levelsKey.forEach((value, index) =>
		{

			// count
			if (this.registry.get(`top-score: ${value}`) != undefined)
			{
				if (index < 9)
				{
					tutorialLevels++;
				}
				else if (index >= 9 && index < 16)
				{
					mainLevels++;
				}
				else
				{
					hardLevels++;
				}

				if (value === 'Puck_Level1' || value === 'Puck_Level2' || value === 'Puck_Level3') {
					puckLevels++;
				} else if (
					value === 'fully rested' || value === 'Playground' || value === 'A side') {
					GappyLevels++;
				} else if (
					value === 'TheKid_Level1' || value === 'TheKid_Level2' || value === 'TheKid_Level3') {
					KidLevels++;
				}
			}
		});

		// check
		if (tutorialLevels === 9)
		{
			this.game.events.emit('unlock-medal: Fish Splasher');
		}
		if (mainLevels === 7)
		{
			this.game.events.emit('unlock-medal: Bomb Launcher');
		}
		if (hardLevels === 6)
		{
			this.game.events.emit('unlock-medal: Thanks for playing!');
		}

		// map pack bonus
		if (puckLevels === 3)
		{
			this.game.events.emit('unlock-medal: A Chicken');
			// this.setUnlockedAltPopup(true, 'puck');
			this.beatAllPuckLevels = true;
		}
		if (GappyLevels === 3)
		{
			this.game.events.emit('unlock-medal: A Single Coin');
			// this.setUnlockedAltPopup(true, 'gappy');
			this.beatAllGappyLevels = true;
		}
		if (KidLevels === 3)
		{
			this.game.events.emit('unlock-medal: Jumped-Into-Sword');
			// this.setUnlockedAltPopup(true, 'kid');
			this.beatAllKidLevels = true;
		}

		// if (hardLevels === 6 && mainLevels === 7 && tutorialLevels === 9)
		// {
		// 	if (!this.registry.get('played-credits'))
		// 	{
		// 		this.registry.set('played-credits', true);
		// 		cloudSaves.saveData(this);

		// 		this.loadCredits();
		// 	}
		// }


		console.debug(`count: tutorial: ${tutorialLevels}, main: ${mainLevels}, hard: ${hardLevels}`)
	}

	update(time: number, delta: number): void
	{

		// if (this.gamepad?.isButtonDown(9) || this.StartKey.isDown)
		// {
		// 	this.registry.set('current-level', LevelSelect.levelsKey[this.selectedLevel]);
		// 	this.loadLevel();
		// }

		// if ((this.gamepad?.isButtonDown(8) || this.SelectKey.isDown) && !this.gamepadSelectorDown)
		// {
		// 	this.gamepadSelectorDown = true;

		// 	this.setSelectedLevel('down');
		// }
		// if (!this.gamepad?.isButtonDown(8) && !this.SelectKey.isDown)
		// {
		// 	this.gamepadSelectorDown = false;
		// }

	}

	/** Also updates visual. */
	// setSelectedLevel(direction: 'up' | 'neutral' | 'down')
	// {
	// 	let indexChange = 0
	// 	if (direction === 'up')
	// 	{
	// 		indexChange = 1;
	// 	}
	// 	else if (direction === 'down')
	// 	{
	// 		indexChange = -1;
	// 	}
	// 	this.selectedLevel += indexChange;

	// // wrap variable to levelsKey array length
	// 	if (this.selectedLevel == LevelSelect.levelsKey.length)
	// 	{
	// 		this.selectedLevel = 0;
	// 	}
	// 	else if (this.selectedLevel == -1)
	// 	{
	// 		this.selectedLevel = LevelSelect.levelsKey.length - 1;
	// 	}

	// // update text
	// 	this.levelText.setText('Level ' + (this.selectedLevel + 1) 
	// 		// + (__DEV__ ? `- ${LevelSelect.levelsKey[this.selectedLevel]}` : ''));
	// 		+ (true ? `- ${LevelSelect.levelsKey[this.selectedLevel]}` : ''));

	// 	let score = this.game.registry.get
	// 	(
	// 		`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`
	// 	);

	// 	let awardString: 'none' | 'Bronze' | 'Silver' | 'Gold' = 'none';
	// 	let awardColour = 0;

	// 	let milestones = levelScoreMilestones.get
	// 	(LevelSelect.levelsKey[this.selectedLevel]) as Array<number>;
	// 	if (milestones === undefined)
	// 	{
	// 		console.warn('No level score milestone data found for this level key.');
	// 		milestones = [9999, 9999, 9999]
	// 	}
	// 	if (score == null)
	// 	{
	// 		score = 0;
	// 	}

	// 	if (score >= milestones[0]&& score < milestones[1])
	// 	{
	// 		awardString = 'Bronze';
	// 		awardColour = 10971430;
	// 	}
	// 	else if (score >= milestones[1]&& score < milestones[2])
	// 	{
	// 		awardString = 'Silver';
	// 		awardColour = 13816530;
	// 	}
	// 	else if (score >= milestones[2])
	// 	{
	// 		awardString = 'Gold';
	// 		awardColour = 16769358;
	// 	}

	// 		// this.levelInfoText.setText(
	// 		// `${(score !== 0) ? `` : `- LOCKED -`}\n
	// 		// Best: ${score}\n
	// 		// Award: ${awardString}`

	// 		this.levelInfoText.setText(
	// 			`Best: ${score}\n
	// 			Award: ${awardString}`
	// 	);

		// preview
		// this.levelPreviewImage.setTexture(`preview-${LevelSelect.levelsKey[this.selectedLevel]}`)
	// }

	loadLevel()
	{
		// console.debug(this.game.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`))
		// if (!__DEV__
		// && this.game.registry.get('game-mode') === 'level' 
		// && this.game.registry.get(`top-score: ${LevelSelect.levelsKey[this.selectedLevel]}`) == undefined)
		// {
		// 	return;
		// }

		// invalid level return
		if (this.selectedLevel === -1)
		{
			console.debug('returned; no level selected');
			return;
		}

		if (__LEVEL_TEST__ && this.selectedLevel === 0)
		{
			this.registry.set(`ninja`, true);
		}
		else if (__LEVEL_TEST__)
		{
			this.registry.set(`ninja`, false);
		}

		// level lock return
		if (!this.registry.get(`unlocked: ${LevelSelect.levelsKey[this.selectedLevel]}`) && !__DEV__ && !__LEVEL_TEST__)
		// if (false)
		{
			console.debug('returned; level is locked');
			return;
		}

    if (!__MAP_PACK__)
    {
      NGIO.logEvent(`Level ${this.selectedLevel + 1} Start`, (event) => 
      {
        console.debug(`logEvent: ${event}`);
      });
    }

		this.registry.set('last-scene', this.scene.key);

		this.registry.set('current-level', LevelSelect.levelsKey[this.selectedLevel]);
		this.registry.set('current-level-index', this.selectedLevel)
		this.scene.stop(this);
		this.scene.launch('LevelUI');
		this.scene.launch('Level');

		if (this.music)
		{
			this.music.pause();
		}
	}

	loadCredits()
	{
		// this.cameras.main.fadeOut(1000, 255, 234, 240);

		// this.time.delayedCall(1500, () =>
		// {
			this.scene.stop(this);
			this.scene.launch('Credits');

			if (this.music)
			{
				this.music.pause();
			}
		// });
	}

	/**
	 * initialize main & UI cameras.
	 * 
	 * scene is seperated into two layers, each camera ignoring the other layer.
	 */
	createCameras()
	{
		CameraUtil.configureMainCamera(this);
		this.cameras.main.setBackgroundColor();
		this.cameras.main.setOrigin(0, 0);
		this.cameras.main.setBackgroundColor(0xffffff);
		// this.cameras.main.ignore(this.uiLayer.getChildren());

		// this.UICam = CameraUtil.createUICamera(this);
		// this.UICam.ignore(this.mainLayer.getChildren());
		if (__MAP_PACK__)
		{
			this.cameras.main.setScroll(0, -20)
		}
	}

	resize()
	{

	}

	menuNavigate(direction: 'up' | 'right' | 'down' | 'left')
	{
		// console.debug('menu focused: ' + this.menuFocused);
		// console.debug('direction: ' + direction);
		// console.debug('prev selected level: ' + this.selectedLevel);

		if (this.menuFocused)
		{
			if (__MAP_PACK__)
			{
				switch (direction)
				{
					case 'down':
						this.setSelectedLevel(22);
						break;
					case 'left':
						this.setSelectedLevel(13);
						break;
					case 'right':
						this.setSelectedLevel(14);
						break;
					case 'up':
						this.setSelectedLevel(6);
						break;
				}
			}
			else
			{
				switch (direction)
				{
					case 'up':
						this.setSelectedLevel(8);
						break;
					case 'right':
						this.setSelectedLevel(16);
						break;
					case 'down':
						this.setSelectedLevel(22);
						break;
					case 'left':
						this.setSelectedLevel(15);
						break;
				}
			}
		}
		else
		{
			if (__MAP_PACK__)
			{
				switch (direction)
				{
					case 'right':
						if (this.selectedLevel === 13)
							this.setMenuFocus(true);
						else
							this.setSelectedLevel(this.selectedLevel + 1);
						break;
					case 'down':
            if (this.selectedLevel < 7)
							this.setSelectedLevel(this.selectedLevel + 7);
						else if (this.selectedLevel < 15)
							this.setSelectedLevel(this.selectedLevel + 7);
						break;
					case 'left':
					if (this.selectedLevel === 14)	{
						this.setMenuFocus(true);
					}
					else {
						this.setSelectedLevel(this.selectedLevel - 1);
					}
						break;
					case 'up':
						if (this.selectedLevel > 20)
						{
							this.setMenuFocus(true);
						}
						else if (this.selectedLevel > 6 && this.selectedLevel < 14)
						{
							this.setSelectedLevel(this.selectedLevel - 7);
						}
						else if (this.selectedLevel > 13)
						{
							this.setSelectedLevel(this.selectedLevel - 7);
						}
						break;
				}
			}
			else
			{
				switch (direction)
				{
					case 'right':
						if (this.selectedLevel === 15 || this.selectedLevel === 21)
						{
							this.setMenuFocus(true);
						}
						else
						{
							this.setSelectedLevel(this.selectedLevel + 1);
						}
						break;
					case 'down':
						if (this.selectedLevel === 7 || this.selectedLevel === 8)
						{
							this.setMenuFocus(true);
						}
						else
						{
							// bottom row return
							// HARDCODED; may need to be updated
							if (this.selectedLevel < 7)
							{
								this.setSelectedLevel(this.selectedLevel + 9);
							}
							else if (this.selectedLevel === 7 || this.selectedLevel === 8)
							{
								this.setSelectedLevel(15);
							}
							else if (this.selectedLevel > 8 && this.selectedLevel < 15)
							{
								this.setSelectedLevel(this.selectedLevel + 7);
							}
							else if (this.selectedLevel === 15)
							{
								this.setSelectedLevel(21);
							}
						}
						break;
					case 'left':
						if (this.selectedLevel === 16)
						{
							this.setMenuFocus(true);
						}
						else
						{
							this.setSelectedLevel(this.selectedLevel - 1);
						}
						break;
					case 'up':
						// top row return
						// HARDCODED; may need to be updated
						if (this.selectedLevel > 8 && this.selectedLevel < 16)
						{
							this.setSelectedLevel(this.selectedLevel - 9);
						}
						else if (this.selectedLevel > 15)
						{
							this.setSelectedLevel(this.selectedLevel - 7);
						}
						break;
				}
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here