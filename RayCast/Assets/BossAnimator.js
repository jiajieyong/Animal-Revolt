#pragma strict
var animator : Animator;
var characterMotor : CharacterMotor;
var originaly = 0;
var originalPos : Vector2;
var originalMag : float;

private var isCharging = false;

function Start () {

}

function Update () {
	
}

function updateCharging(isCharge : boolean) {
	isCharging = isCharge;
}