﻿
#pragma strict
var target : GameObject;
var speed : float = 0.5;
var maxSpeed : float = 3;
var damageDisplay : GameObject;
var origin : Vector3;
var TheDamage : int;
private var isNotYetUpdated = false;
private var updated = false;
private var targetPath : List.<Vector3> = new List.<Vector3>();

function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}

function Update () {
	if (isNotYetUpdated) {
		updated = true;
	}
	
	if (updated && target == null) {
		Destroy(gameObject);
	}
	
	if (updated && target != null) {
		
		targetPath.RemoveAll(function (x : Vector3) {return x == transform.position;});
		if (targetPath.Count == 0) {
			Destroy(gameObject);
		} else if (target.name != "Bossman" && target.GetComponent(Enemy).health <= 0) {
			Destroy(gameObject);
		} else {
			var oldPos : Vector3 = targetPath[0];
			var newPos = target.transform.position;
			var dir = Vector3.Normalize(newPos - transform.position);
			var time = Time.deltaTime;
			targetPath.Add(newPos);
		
			var hit : RaycastHit;
			if (Physics.Raycast(transform.position, dir, hit)) {
				if (hit.collider.gameObject == target) {
					var dist = Vector3.Distance(newPos, transform.position);
			
					transform.forward = dir;
					if (speed * time >= dist) {
						transform.position = newPos;
					} else {
						transform.position = transform.position + (time * speed * dir);
					}
			
					targetPath = new List.<Vector3>();
					targetPath.Add(newPos);
				} else {
					var dist1 = Vector3.Distance(oldPos, transform.position);
					dir = Vector3.Normalize(oldPos - transform.position);
			
					transform.forward = dir;
					if (speed * time >= dist1) {
						transform.position = oldPos;
					} else {
						transform.position = transform.position + (Time.deltaTime * speed * dir);
					}
				}
			} 
		}
	}
}

function OnCollisionEnter (info : Collision) {
	if (info.collider.CompareTag("Enemy")) {	
 		var containerE = new Container(TheDamage, info.collider.transform, "enemy", "instant");
		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
		info.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
		Destroy(gameObject);
	}
 }

 function updateTarget(target : GameObject) {
 	this.target = target;
 	targetPath.Add(target.transform.position);
 	isNotYetUpdated = true;
 }