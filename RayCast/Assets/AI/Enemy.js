﻿#pragma strict

var health = 100;

function Update () {
	if (health <= 0)
		DestroyObject(gameObject);
}


function ApplyDamage(damage: int){
    health -= damage;
    Debug.Log(health);
}