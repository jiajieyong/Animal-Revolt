#pragma strict
var maxHealth : float;
var laser : GameObject;
var maxAngularSpeed : float;
var player : GameObject;
var moveSpeed : float;
var theBullet : GameObject;

var bossHealthTex : Texture2D;
var bossEmptyHealthTex : Texture2D;

private var animator : Animator;
private var time : float = 0;
private var isLasering = false;
private var isMelee = true;
private var health : float;
private var laserTime : float;
private var laserNotInit = true;
private var angularSpeed : float;
private var isMissile = false;

function Start () {
	animator = GetComponentInChildren(Animator);
	health = maxHealth;
	laserTime = 0;
}

function Update () {
	
	time += Time.deltaTime;
	//Fuzzy 
	isMelee = false;
	
	if (time > 6) {
		isMissile = true;
		time = 0;
	}
	
	if (isMissile) {
		shootMissiles();
	}
	
	if (isMelee) {
		var newPos = player.transform.position;
		var dist = Vector3.Distance(newPos, transform.position);
		
		if (dist < 5) {
			var dir : Vector3 = transform.InverseTransformPoint(player.transform.position) + Vector3(0.5, 0, 0);
			var worldDir : Vector3 = transform.TransformDirection(dir);
			var step = 1 * Time.deltaTime;
			var newDir = Vector3.RotateTowards(transform.forward, Vector3(worldDir.x, 0, worldDir.z), step, 0.0);
			transform.forward = newDir;
			animator.SetBool ("Melee", true);
			isMelee = false;
		} else {
			var walkToDir = newPos - transform.position;
			transform.forward = walkToDir;
			
			if (moveSpeed * time >= dist) {
				transform.position = newPos;
			} else {
				transform.position = transform.position + (time * moveSpeed * walkToDir);
			}
		}
	}
	
	if (isLasering) {
		laserTime += Time.deltaTime;
		if (laserTime < 3) {
			angularSpeed = 3.14;
		} else {
			angularSpeed = maxAngularSpeed;
		}
		
		shootLaser();
		
		if (laserTime > 10) {
			laser.GetComponent(laserCharging).disableLaser();
			laser.GetComponent(laserCharging).enabled = false;
			isLasering = false;
			laserTime = 0;
			laserNotInit = true;
		}
	}
}

function OnGUI () { 
	//95% of screen
	var screenHeight = Screen.height;
	var screenWidth = Screen.width;
	
	var healthPos = screenWidth*0.025;
	var healthHeight = screenHeight*0.03;
	GUI.DrawTexture(Rect(healthPos, healthHeight, screenWidth*0.95, 28), bossEmptyHealthTex);
	GUI.DrawTexture(Rect(healthPos, healthHeight, screenWidth*(health/maxHealth * 0.95), 28), bossHealthTex);
}

function shootLaser() {
	if (laserNotInit) {
		laser.GetComponent(laserCharging).init();
		laserNotInit = false;
	}
	laser.GetComponent(laserCharging).enabled = true;
	var dir : Vector3 = player.transform.position - transform.position;
	var step = angularSpeed * Time.deltaTime;
	var newDir = Vector3.RotateTowards(transform.forward, Vector3(dir.x, 0, dir.z), step, 0.0);
		
	gameObject.transform.forward = newDir;
}

function dealDamage(dmg : int) { 
	health -= dmg;
}

function shootMissiles() {
	var bossPos : Vector3 = transform.position;
	var center = Vector3(bossPos.x, 5, bossPos.z);
	for (var i = 0; i < 6; i++) {
		var angle = 360.0/6*i;
		var spawnPoint = transform.TransformPoint(Vector3(0.0386, 1.3367, 0));
		var newBlast = Instantiate(theBullet, spawnPoint, transform.rotation);
		newBlast.transform.forward = transform.TransformDirection(Vector3(0, 1, 0));
		newBlast.transform.RotateAround(center, Vector3.up, angle);
		
		var arc = newBlast.transform.TransformPoint(0, 4, 8);
		
		newBlast.GetComponent(Missle).updateTarget(player, arc);
		isMissile = false;
		yield(0.4);
	}
}