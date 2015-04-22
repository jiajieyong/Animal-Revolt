#pragma strict

var invuln : GameObject;
var speed : GameObject;
var invulnIcon : Texture2D;
var speedIcon : Texture2D;

private var speedbuff;
private var invulnbuff;
private var slot1;
private var slot2;

function Start () {
	slot1 = Screen.width * 0.5 - 370;
	slot2 = Screen.width * 0.5 - 450;
}

function Update () {
	if (speed.GetComponent(speedBuffEffect).buff == true) {
        speedbuff = true;
	} else {
		speedbuff = false;	
	}
	
	if (invuln.activeSelf == true) {
        invulnbuff = true;
	} else {
		invulnbuff = false;	
	}
}

function OnGUI () {
	if (speedbuff == true && invulnbuff == false) {
        GUI.DrawTexture(Rect(slot1, Screen.height - 90, 64, 64), speedIcon);
	} else if (speedbuff == false && invulnbuff == true) {
        GUI.DrawTexture(Rect(slot1, Screen.height - 90, 64, 64), invulnIcon);
	} else if (speedbuff == true && invulnbuff == true) {
        GUI.DrawTexture(Rect(slot1, Screen.height - 90, 64, 64), invulnIcon);
        GUI.DrawTexture(Rect(slot2, Screen.height - 90, 64, 64), speedIcon);
	}
}