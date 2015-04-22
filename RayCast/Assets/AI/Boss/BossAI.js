#pragma implicit
var maxHealth : float;
var laser : GameObject;
var maxAngularSpeed : float;
var player : GameObject;
var maxMoveSpeed : float;
var theBullet : GameObject;
var bossModel : GameObject;
var damageDisplay : GameObject;
var deathTemplate : GameObject;
var stoneBlockOff : GameObject;
var deathSound : AudioClip;
var slashSound : AudioClip;
var ramForwardSound : AudioClip;
var laserChargingSound : AudioClip;
var laserShootSound : AudioClip;

var bossHealthTex : Texture2D;
var bossEmptyHealthTex : Texture2D;
var smokeTemplate : GameObject;

private var animator : Animator;
private var time : float = 0;
private var moveSpeed : float;
private var isDecidingAttack = false;
private var lastAttack : String = "";
private var isEnraged = false;
private var isDecidingToMove = false;
private var isDelay = false;
private var delaySpot : Vector3;
private var isDetecting = true;

private var isMoving = false;

private var isLasering = false;
private var laserTime : float;
private var laserNotInit = true;
private var laserNotPlayed = true;
private var laserShootingPlayed = false;

private var health : float;
private var angularSpeed : float;
private var bossRend : Renderer;
private var smoke : GameObject;

private var isMissile = false;
private var maxMissiles = 3;
private var missileTime : float = 0;

var meleeDamage : int;
private var isMelee = false;
private var meleeCount = 0;
private var meleeTime : float;
private var animatingMelee = false;
private var playerNotYetHit = true;
private var meleeAngle : float;
private var maxMelee = 3;

var ramSpeed : float;
var ramDamage : int;
var backBurnerTemplate : GameObject;
private var isRamming = false;
private var isSeekingTarget = false;
private var seekingTime : float = 0;
private var ramTarget : Vector3;
private var lean : Vector3;
private var backBurner : GameObject;
private var playedSound = false;


private var originalPos : Vector2;
private var originalMag : float;

private var M_desirability : DesirabilityMembership;
private var M_distance : DistanceMembership;

function Start () {
	animator = GetComponentInChildren(Animator);
	health = 10;
	laserTime = 0;
	bossRend = bossModel.GetComponent.<Renderer>();
	meleeAngle = Mathf.Atan(4.0/7.0)/3.142*180;
	moveSpeed = maxMoveSpeed;
	originalPos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;
	originalMag = 0;
	
	M_desirability = new DesirabilityMembership(25, 50, 75);
	M_distance = new DistanceMembership(7, 13, 26);
}

function Update () {

	if (isDetecting) {
		var hit : RaycastHit;
		var shootDirection = player.transform.position - (transform.position + transform.TransformDirection(Vector3(0, 2, 2)));
		if (Physics.Raycast (transform.position + transform.TransformDirection(Vector3(0, 2, 2)), shootDirection, hit)) {
			if (hit.collider.CompareTag("Player")) {
				var clone1 : GameObject = Instantiate(stoneBlockOff, Vector3(102.8, -8.1, -68.8), transform.rotation);
				clone1.transform.forward = Vector3(1, 0, 0);
				isDecidingAttack = true;
				isDetecting = false;
			}
		}
	}
	
	var pos = Vector2(rigidbody.transform.position.x, rigidbody.transform.position.z) ;

 	var movement = (pos - originalPos) * 10;
 	var magnitude = movement.magnitude;
 	
 	if (originalMag >= magnitude){
 		originalMag -= 0.2;
 		originalMag = Mathf.Max(0,originalMag);
 	}else if (originalMag < magnitude){
		originalMag += 0.2;
		originalMag = Mathf.Min(2,originalMag);
	}
 	
	animator.SetFloat ("Forward", originalMag);
	originalPos = pos;
	
	if (isDelay) {
		time += Time.deltaTime;
		if (time < 1.5) {
		} else if (time < 3.0) {
			time += Time.deltaTime;
			var forward = transform.TransformDirection(transform.position.forward);
 			var targetDir = player.transform.position - transform.position;
 			var angle = Vector3.Angle(forward, Vector3(targetDir.x, forward.y, targetDir.z));
 			
			var newDir = Vector3.Normalize(Vector3.RotateTowards(forward, Vector3(targetDir.x, forward.y, targetDir.z), 0.1, 0));
			transform.forward = newDir;
			transform.position = transform.position + (Time.deltaTime * 2 * newDir);
		} else {
			animator.speed = 1;
			isDelay = false;
			time = 0;
		}
	} else {
	
	//Fuzzy 
	//time += Time.deltaTime;
	if (time > 6) {
		//isMissile = true;
		//isLasering = true;
		//isMelee = true;
		//isRamming = true;
		time = 0;
	}
	
	if (health < maxHealth/3) {
		if (health <= 0) {
			health = 0;
			death();
		}
		
		var colour = bossRend.material.GetColor("_Color");
		
		maxMissiles = 6;
		maxMelee = 4;
		
		if (colour.b > 0) {
			colour.b -= Time.deltaTime/2.0;
			colour.g -= Time.deltaTime/2.0;
			bossRend.material.SetColor("_Color", colour);
		}
		
		if (smoke == null) {
			var smokey = Instantiate(smokeTemplate, transform.TransformPoint(Vector3(0, 2.5, 0)), transform.rotation);
			smoke = smokey;
		}
		
		isEnraged = true;
	}
	
	//isDecidingAttack = false;
	
	if (isDecidingToMove) {
		isDecidingAttack = true;
		isDecidingToMove = false;
	}
	
	if (isMoving) {
		
	}

	if (isDecidingAttack) {
		var playerDis : float = Vector3.Distance(player.transform.position, transform.position);
		var pl_far = M_distance.far(playerDis);
		var pl_medium = M_distance.medium(playerDis);
		var pl_near = M_distance.near(playerDis);
		
		var meleeUndesirable = calculateUndesirableMelee(pl_far, pl_medium, pl_near);
		var meleeDesirable = calculateDesirableMelee(pl_far, pl_medium, pl_near);
		var meleeVeryDesirable = calculateVeryDesirableMelee(pl_far, pl_medium, pl_near);
		
		var meleeDesirability = calculateDesirability(meleeUndesirable, meleeDesirable, meleeVeryDesirable);
		
		var ramUndesirable = calculateUndesirableRam(pl_far, pl_medium, pl_near);
		var ramDesirable = calculateDesirableRam(pl_far, pl_medium, pl_near);
		var ramVeryDesirable = calculateVeryDesirableRam(pl_far, pl_medium, pl_near);
		
		var ramDesirability = calculateDesirability(ramUndesirable, ramDesirable, ramVeryDesirable);
		
		var missileUndesirable = calculateUndesirableMissile(pl_far, pl_medium, pl_near);
		var missileDesirable = calculateDesirableMissile(pl_far, pl_medium, pl_near);
		var missileVeryDesirable = calculateVeryDesirableMissile(pl_far, pl_medium, pl_near);
		
		var missileDesirability = calculateDesirability(missileUndesirable, missileDesirable, missileVeryDesirable);
		
		var laserUndesirable = calculateUndesirableLaser(pl_far, pl_medium, pl_near);
		var laserDesirable = calculateDesirableLaser(pl_far, pl_medium, pl_near);
		var laserVeryDesirable = calculateVeryDesirableLaser(pl_far, pl_medium, pl_near);
		
		var laserDesirability = calculateDesirability(laserUndesirable, laserDesirable, laserVeryDesirable);

		
		if (isEnraged) {
			if (meleeDesirability > laserDesirability) {
				if (meleeDesirability > missileDesirability) {
					if (meleeDesirability > ramDesirability) {
						isMelee = true;
					} else {
						isRamming = true;
					}
				} else {
					if (missileDesirability > ramDesirability) {
						isMissile = true;
					} else {
						isRamming = true;
					}
				}
			} else {
				if (laserDesirability > missileDesirability) {
					if (laserDesirability > ramDesirability) {
						isLasering = true;
					} else {
						isRamming = true;
					}
				} else {
					if (missileDesirability > ramDesirability) {
						isMissile = true;
					} else {
						isRamming = true;
					}
				}
			}
		} else {
			if (meleeDesirability > missileDesirability) {
				if (meleeDesirability > ramDesirability) {
					isMelee = true;
				} else {
					isRamming = true;
				}
			} else {
				if (missileDesirability > ramDesirability) {
					isMissile = true;
				} else {
					isRamming = true;
				}
			}
		}
		
		isDecidingAttack = false;
	}
	
	if (isMissile) {
		
		if (missileTime == 0) {
			shootMissiles();
			lastAttack = "missile";
		}
		
		missileTime += Time.deltaTime;
		
		if (missileTime > 5) {
			isDecidingToMove = true;
			isMissile = false;
			missileTime = 0;	
		}
	}
	
	if (isMelee) {
		useMelee();
		lastAttack = "melee";
	}
	
	if (isRamming) {
		seekingTime += Time.deltaTime;
		if (seekingTime < 3) {
			angularSpeed = 2;
			isSeekingTarget = true;
		} else {
			angularSpeed = maxAngularSpeed;
			isSeekingTarget = false;
		}
		
		ram();
		lastAttack = "ram";
	}
	
	if (isLasering) {
		
		if (laserNotPlayed && laserTime < 5) {
			AudioSource.PlayClipAtPoint(laserChargingSound, transform.position);
			laserNotPlayed = false;
		}
		
		laserTime += Time.deltaTime;
		
		if (laserTime < 5) {
			angularSpeed = 2;
			
		} else {
			angularSpeed = maxAngularSpeed;
		}
		
		shootLaser();
		
		if (laserShootingPlayed && laserTime >= 5) {
			AudioSource.PlayClipAtPoint(laserShootSound, transform.position);
			laserShootingPlayed = true;
		}
		
		if (laserTime > 11) {
			laser.GetComponent(laserCharging).disableLaser();
			laser.GetComponent(laserCharging).enabled = false;
			laserShootingPlayed = false;
			isLasering = false;
			laserTime = 0;
			laserNotInit = true;
			isDecidingToMove = true;
			laserNotPlayed = true;
			isDelay = true;
		}
		
		lastAttack = "laser";
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
	var newDir = Vector3.RotateTowards(transform.forward, Vector3(dir.x, transform.forward.y, dir.z), step, 0.0);
		
	gameObject.transform.forward = newDir;
}

function ram() {
	if (isSeekingTarget) {
		animator.SetBool ("Melee", true);
		
		if (backBurner == null) {
			var spawnPoint = transform.TransformPoint(0, 6/3, -0.5/3);
			var newBlast = Instantiate(backBurnerTemplate, spawnPoint, transform.rotation);
			backBurner = newBlast;
		}
		
		if (backBurner.particleEmitter.maxSize < 7) {
			backBurner.particleEmitter.maxSize += Time.deltaTime * 5.5/3;
		}
		
		backBurner.transform.position = transform.TransformPoint(0, 6/3, -0.5/3);
		animator.speed = 0.1;
			
		if (seekingTime > 1.292 / 0.1 * 0.22) {
			animator.speed = 0;
		}
		
		var dir : Vector3 = player.transform.position - transform.position;
		var step = angularSpeed * Time.deltaTime;
		var newDir = Vector3.RotateTowards(transform.forward, Vector3(dir.x, transform.forward.y, dir.z), step, 0.0);
		
		transform.forward = newDir;

		var playerPos = player.transform.position;
		var ramDir : Vector3 = Vector3.Normalize(Vector3(playerPos.x, transform.position.y, playerPos.z) - transform.position);
		ramTarget = Vector3(playerPos.x, transform.position.y, playerPos.z) - ramDir*2;
		lean  = transform.TransformDirection(0, -0.5, 1);
	} else {
		if (!playedSound) {
			AudioSource.PlayClipAtPoint(ramForwardSound, transform.position);
			playedSound = true;
		}
		backBurner.transform.position = transform.TransformPoint(0, 6/3, -0.5/3);
		var step1 : float = ramSpeed * Time.deltaTime;
		var goToPos : Vector3 = Vector3.MoveTowards(transform.position, ramTarget, step1);
		
		var step2 : float = 1.5 * Time.deltaTime;
		transform.forward = Vector3.RotateTowards(transform.forward, lean, step2, 0.0); 
		gameObject.transform.position = goToPos;
		
		if (transform.position == ramTarget) {
			Destroy(backBurner);
			animator.speed = 1;
			isRamming = false;
			isSeekingTarget = false;
			isDecidingToMove = true;
			playedSound = false;
			seekingTime = 0;
			
			var localPlayerPos = transform.InverseTransformPoint(player.transform.position);
			if (localPlayerPos.z >= 0)  {
				localPlayerPos = Vector3(localPlayerPos.x, 0, localPlayerPos.z);
				var angle = Vector3.Angle(localPlayerPos, Vector3(0, 0, 1));
				if (Vector3.Magnitude(localPlayerPos) < 6 && angle < 50) {
					var containerP = new ImpactContainer(transform.position);
					damageDisplay.transform.SendMessage("DisplayImpact", containerP);
					player.transform.SendMessage("ApplyDamage", ramDamage, SendMessageOptions.DontRequireReceiver);
				}
			}
			
			lean = transform.TransformDirection(Vector3(0, 0.5, 1));
			transform.forward = lean;
			animator.SetBool ("Melee", false);
			isDelay = true;
		}
	}
}

function dealDamage(dmg : int) { 
	health -= dmg;
}

function shootMissiles() {
	var bossPos : Vector3 = transform.position;
	var center = Vector3(bossPos.x, 5, bossPos.z);
	for (var i = 0; i < maxMissiles; i++) {
		var angle = 360.0/maxMissiles*i;
		var spawnPoint = transform.TransformPoint(Vector3(0.0386, 1.3367, 0));
		var newBlast = Instantiate(theBullet, spawnPoint, transform.rotation);
		newBlast.transform.forward = transform.TransformDirection(Vector3(0, 1, 0));
		newBlast.transform.RotateAround(center, Vector3.up, angle);
		
		var arc = newBlast.transform.TransformPoint(0, 4, 8);
		
		newBlast.GetComponent(Missle).updateTarget(player, arc);
	}
}

function useMelee() {
	var timeSince = Time.deltaTime;
	var newPos = player.transform.position;
	var dist = Vector3.Distance(newPos, transform.position);
		
	if (animatingMelee) {
		meleeTime += timeSince;
		if (meleeTime > 1.4) {
			meleeTime = 0;
			animator.SetBool ("Melee", false);
			animatingMelee = false;
		} else if (meleeTime > 1.4*0.30 && playerNotYetHit) {
			var playerPos = transform.InverseTransformPoint(player.transform.position);
			var angle = Vector3.Angle(Vector3(playerPos.x, 0, playerPos.z), Vector3(0, 0, 1));
			var distance = Vector3.Distance(player.transform.position, transform.position);

			if (playerPos.x < 1 && angle <= meleeAngle && distance <= 6 && distance >= 0) {
				playerNotYetHit = false;
				var containerP = new ImpactContainer(transform.position);
				damageDisplay.transform.SendMessage("DisplayImpact", containerP);
				player.transform.SendMessage("ApplyDamage", meleeDamage, SendMessageOptions.DontRequireReceiver);
			}
		}
	} else {
		if (dist < 3.5) {
			var dir3 : Vector3 = player.transform.position - transform.position;
			transform.forward = Vector3(dir3.x, 0, dir3.z);
			animator.SetBool ("Melee", true);
			animatingMelee = true;
			playerNotYetHit = true;
			meleeCount++;
			AudioSource.PlayClipAtPoint(slashSound, transform.position);
		} else {
			var dir : Vector3 = player.transform.position - transform.position;
			
			if (Vector3.Angle(transform.forward, Vector3(dir.x, 0, dir.z)) > 2 * Time.deltaTime*180) {
				var step = 2 * Time.deltaTime;
				var newDir = Vector3.RotateTowards(transform.forward, Vector3(dir.x, transform.forward.y, dir.z), step, 0.0);
		
				transform.forward = newDir;
			} else {
				var walkToDir = Vector3.Normalize(newPos - transform.position);
				var woY = Vector3(walkToDir.x, 0, walkToDir.z);
				transform.forward = woY;
			
				if (moveSpeed * timeSince >= dist) {
					transform.position = newPos;
				} else {
					transform.position = transform.position + (timeSince * moveSpeed * woY);
				}
			}
		}
	}
	
	if (meleeCount >= maxMelee) {
		isMelee = false;
		isDecidingToMove = true;
		meleeCount = 0;
		isDelay = true;
	}
}

function calculateUndesirableMelee(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "melee") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var undesirableValue : float = 0;
	var undesirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_far, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_far, pl_isNotLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_medium, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_medium, pl_isNotLastAttack);
	undesirableArray.Add(f);
	
	for (var i = 0; i < undesirableArray.Count; i++) {
		var v : float = undesirableArray[i];
		if (v > undesirableValue) {
			undesirableValue = undesirableArray[i];
		}
	}
	
	return undesirableValue;
}

function calculateDesirableMelee(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "melee") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_near, pl_isLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}  

function calculateVeryDesirableMelee(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "melee") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_near, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}

function calculateUndesirableRam(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "ram") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var undesirableValue : float = 0;
	var undesirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_far, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_medium, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_near, pl_isLastAttack);
	undesirableArray.Add(f);
	
	for (var i = 0; i < undesirableArray.Count; i++) {
		var v : float = undesirableArray[i];
		if (v > undesirableValue) {
			undesirableValue = undesirableArray[i];
		}
	}
	
	return undesirableValue;
}

function calculateDesirableRam(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "ram") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_near, pl_isNotLastAttack);
	desirableArray.Add(f);
	f = Mathf.Min(pl_far, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}  

function calculateVeryDesirableRam(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "ram") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_medium, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}    

function calculateUndesirableMissile(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "missile") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var undesirableValue : float = 0;
	var undesirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_far, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_near, pl_isLastAttack);
	undesirableArray.Add(f);
	
	for (var i = 0; i < undesirableArray.Count; i++) {
		var v : float = undesirableArray[i];
		if (v > undesirableValue) {
			undesirableValue = undesirableArray[i];
		}
	}
	
	return undesirableValue;
}

function calculateDesirableMissile(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "missile") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_near, pl_isNotLastAttack);
	desirableArray.Add(f);
	f = Mathf.Min(pl_medium, pl_isLastAttack);
	desirableArray.Add(f);
	f = Mathf.Min(pl_far, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}  

function calculateVeryDesirableMissile(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "missile") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_medium, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}

function calculateUndesirableLaser(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "laser") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var undesirableValue : float = 0;
	var undesirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_near, pl_isLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_near, pl_isNotLastAttack);
	undesirableArray.Add(f);
	f = Mathf.Min(pl_medium, pl_isLastAttack);
	undesirableArray.Add(f);
	
	for (var i = 0; i < undesirableArray.Count; i++) {
		var v : float = undesirableArray[i];
		if (v > undesirableValue) {
			undesirableValue = undesirableArray[i];
		}
	}
	
	return undesirableValue;
}

function calculateDesirableLaser(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "laser") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_medium, pl_isNotLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}  

function calculateVeryDesirableLaser(pl_far : float, pl_medium : float, pl_near : float) {
	var pl_isLastAttack : float;
	var pl_isNotLastAttack : float;
		
	//Calculate for Melee
	if (lastAttack == "laser") {
		pl_isLastAttack = 1;
		pl_isNotLastAttack = 0;
	} else {
		pl_isLastAttack = 0;
		pl_isNotLastAttack = 1;
	}

	var desirableValue : float = 0;
	var desirableArray = new ArrayList();
	
	var f = Mathf.Min(pl_far, pl_isNotLastAttack);
	desirableArray.Add(f);
	f = Mathf.Min(pl_far, pl_isLastAttack);
	desirableArray.Add(f);
	
	for (var i = 0; i < desirableArray.Count; i++) {
		var v : float = desirableArray[i];
		if (v > desirableValue) {
			desirableValue = desirableArray[i];
		}
	}
	
	return desirableValue;
}        

function calculateDesirability(undesirable : float, desirable : float, veryDesirable : float) : float {
	return (12.5*undesirable + 50*desirable + veryDesirable*87.5)/(undesirable + desirable + veryDesirable);
}

function death() {
	Instantiate(deathTemplate, transform.position + Vector3(0, 5, 0), transform.rotation);
	
	Destroy(smoke);
	laser.transform.SendMessage("cleanUp");
	Destroy(backBurner);
	Destroy(gameObject);
	
	AudioSource.PlayClipAtPoint(deathSound, transform.position);
}

function dotDamage (damage: int){
	var containerE = new Container(damage, transform, "enemy", "dots");		
	for (var count = 0 ; count <7; count++){	
		yield WaitForSeconds(0.5f);
		health -= damage; 
		damageDisplay.transform.SendMessage("DisplayDamage", containerE);
	}
}