
#pragma strict
var target : GameObject;
var speed : float = 0.5;
var maxSpeed : float = 3;
var TheDamage : int;
var origin : Vector3;
var damageDisplay : GameObject;
var smokeTrail : GameObject;
var explosion : GameObject;
var explode : AudioClip;

private var isNotYetUpdated = false;
private var updated = false;
private var targetPath : List.<Vector3> = new List.<Vector3>();
private var isWarmedUp = false;
private var notDoneRotating = false;
private var warmUp : Vector3;
private var smoke : GameObject;

function Start () {
	damageDisplay = GameObject.FindGameObjectsWithTag ("Display")[0];
}

function Update () {
	if (isNotYetUpdated) {
		updated = true;
	}
	
	if ((updated && target == null)) {
		Destroy(gameObject);
	}
	
	if (updated && target != null) {
		smoke.transform.position = transform.TransformPoint(Vector3(0, 0, 1));
		targetPath.RemoveAll(function (x : Vector3) {return x == transform.position;});
		
		if (target.GetComponent(playerHealth).playerHealth <= 0 || targetPath.Count == 0) {
			Destroy(gameObject);
		} else {
			var oldPos : Vector3 = targetPath[0];
			var newPos = target.transform.position;
			var dir = Vector3.Normalize(newPos - transform.position);
			var time = Time.deltaTime;
			targetPath.Add(newPos);
			
			if (oldPos == warmUp) {
				notDoneRotating = true;
			}
			
			if (notDoneRotating) {
				var pos = transform.position;
				var forward = transform.TransformDirection(transform.position.forward);
 				var targetDir = target.transform.position - pos;
 				var angle = Vector3.Angle(forward, targetDir);
 				
				var newDir = Vector3.Normalize(Vector3.RotateTowards(forward, targetDir, 0.05, 0));
				transform.forward = newDir;
				transform.position = transform.position + (Time.deltaTime * speed * newDir);
			} else {
				var dist2 = Vector3.Distance(oldPos, transform.position);
				var dir2 = Vector3.Normalize(oldPos - transform.position);
							
				transform.forward = dir2;
				if (speed * time >= dist2) {
					transform.position = oldPos;
				} else {
					transform.position = transform.position + (Time.deltaTime * speed * dir2);
				}
			} 
		}
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("PlayerBullet")) {
		Destroy(gameObject);
		Destroy(other.gameObject);
		Instantiate(explosion, transform.position, transform.rotation);
		AudioSource.PlayClipAtPoint(explode, transform.position);
	} else if (other.CompareTag("Player")) {
		var containerP = new ImpactContainer(origin);
 		damageDisplay.transform.SendMessage("DisplayImpact", containerP);
    	other.transform.SendMessage("ApplyDamage", TheDamage, SendMessageOptions.DontRequireReceiver);
		Destroy(gameObject);
		Instantiate(explosion, transform.position, transform.rotation);
		AudioSource.PlayClipAtPoint(explode, transform.position);
	} else if (other.CompareTag("ground")){
		Destroy(gameObject);
		Instantiate(explosion, transform.position, transform.rotation);
		AudioSource.PlayClipAtPoint(explode, transform.position);
	}
}

 function updateTarget(target : GameObject, upward : Vector3) {
 	this.target = target;
 	targetPath.Add(Vector3(transform.position.x, transform.position.y + 4, transform.position.z));
 	targetPath.Add(upward);
 	warmUp = target.transform.position;
 	targetPath.Add(target.transform.position);
 	
 	var clone = Instantiate(smokeTrail, transform.TransformPoint(Vector3(0, 0, 1)), transform.rotation);
 	smoke = clone;
 	isNotYetUpdated = true;
 }