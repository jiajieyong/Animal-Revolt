#pragma strict
var runningTime : float;
var chargingTemplate : GameObject;
var dischargeTemplate : GameObject;
var laserTemplate : GameObject;
var laserEffectTemplate : GameObject;
var player: GameObject;
var damageDisplay : GameObject;
var laserDamage : float;

private var time : float = 0;
private var charging : GameObject;
private var discharge : GameObject;
private var laser : GameObject;
private var laserEffect : GameObject;
private var notInstantiated = true;
private var animator : Animator;
private var count = 2;

var start = false;
var neverAgain = true;
var startTime : float = 0;

function Start () {

}

function Update () {
	
	time += Time.deltaTime;
	
	if (time >= 0 && time < 3) {
		var ps : ParticleSystem = charging.GetComponent(ParticleSystem);
		ps.startSize = 	3.61 - 2.61/3*time;
		charging.transform.position = transform.position;
	} else if (time >= runningTime && notInstantiated) {
		animator.SetBool ("Range", false);
		animator.SetBool ("Charged", true);
		Destroy(charging);
		var clone = Instantiate(dischargeTemplate, transform.position, transform.rotation);
		discharge = clone;
		notInstantiated = false;
	} 
	
	if (discharge != null && !discharge.GetComponent(ParticleSystem).IsAlive()) {
		Destroy(discharge);
	}
	
	if (time >= runningTime) {
		
		if (laser != null) {
			Destroy(laser);
		}
		
		var target : Vector3 = transform.InverseTransformPoint(player.transform.position);
		
		if (target.z < 0) {
			target.z = 0;
		}
		
		var direction : Vector3 = Vector3(0, target.y, target.z);
		direction = transform.TransformDirection(direction);
		
		var clone3 : GameObject;
		var hit : RaycastHit;
		if (Physics.Raycast(transform.position, direction, hit)) {
			var hitpoint = hit.point;
			var laserHit = transform.InverseTransformPoint(hitpoint);
			
			clone3 = Instantiate(laserTemplate, transform.position, transform.rotation);
			var volBe : VolumetricLines.VolumetricLineBehavior = clone3.GetComponent(VolumetricLines.VolumetricLineBehavior);
			volBe.m_endPos = transform.InverseTransformPoint(hitpoint) * 1.2;
			
			if (laserEffect == null) {
				laserEffect = Instantiate(laserEffectTemplate, hitpoint, transform.rotation);
			} else {
				laserEffect.transform.position = hitpoint;	
			}
			
			if (hit.collider.CompareTag("Player")) {
				if (count > 2) {
					var containerP = new ImpactContainer(transform.position);
 					damageDisplay.transform.SendMessage("DisplayImpact", containerP);
    				hit.collider.transform.SendMessage("ApplyDamage", laserDamage, SendMessageOptions.DontRequireReceiver);
    				count = 0;
    			} else {
    				count++;
    			}
    			
			} 
		} else if (laserEffect != null) {
			Destroy(laserEffect);
		}
		
		laserEffect.transform.position = transform.TransformPoint(Vector3(0, target.y, target.z));
		laser = clone3;
	}
}

function init() {
	var clone = Instantiate(chargingTemplate, transform.position, transform.rotation);
	charging = clone;
	animator = GetComponentInParent(Animator);
	animator.SetBool ("Range", true);
	animator.SetBool ("Lasered", false);
	time = 0;
	notInstantiated = true;
}

function disableLaser() {
	Destroy(laserEffect);
	Destroy(laser);
	animator.SetBool ("Lasered", true);
	animator.SetBool ("Charged", false);
}