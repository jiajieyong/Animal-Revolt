#pragma strict
private var animator : Animator;
var originalPos : Vector2;
var originalMag : float;

private var isCharging = false;

function Start () {
	animator = GetComponentInChildren(Animator);
}

function Update () {
	
}

function updateCharging(isCharge : boolean) {
	isCharging = isCharge;
}