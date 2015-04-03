﻿#pragma strict

var enemyManager : GameObject;
var health = 100;
var speed = 5;
var prefab : Transform;
var isDead = false;
var player : GameObject;

function Update () {
	if (isDead)
		return;

	if (health <= 0) {
	
		dead();
		
		enemyManager.SendMessage("EnemyDeath");
		var animator = GetComponentInChildren(Animator);
		animator.SetTrigger("Die");
		DestroyObject(gameObject, 4);
	}
	
	// Kill off enemy if too far away from Player
	if (Vector3.Distance(transform.position, player.transform.position) > 70) {
		DestroyObject(gameObject);
	}
}

function dead() {
	isDead = true;
	gameObject.rigidbody.useGravity = false;
	gameObject.rigidbody.isKinematic = true;
	gameObject.collider.isTrigger = true;
	var ai : Behaviour = gameObject.GetComponentInChildren(AIRig);
	ai.enabled = false;
}

function updateEnemy(em:GameObject, p:GameObject) {
	enemyManager = em;
	player = p;
}

function ApplyDamage(damage: int){
	//var step = speed * Time.deltaTime;
	  
	//var newDir = Vector3.RotateTowards(transform.forward, direction, step, 0.0);
    //transform.rotation = Quaternion.LookRotation(newDir);
    health -= damage;

}