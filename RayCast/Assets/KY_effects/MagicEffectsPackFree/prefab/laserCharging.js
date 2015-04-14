#pragma strict
var runningTime : float;
var chargingTemplate : GameObject;
var dischargeTemplate : GameObject;
var laserTemplate : GameObject;
var laserEffectTemplate : GameObject;
var player: GameObject;
private var time : float = 0;
private var charging : GameObject;
private var discharge : GameObject;
private var laser : GameObject;
private var laserEffect : GameObject;
private var notInstantiated = true;
var start = false;
var neverAgain = true;
var startTime : float = 0;

function Start () {
	var clone = Instantiate(chargingTemplate, transform.position, transform.rotation);
	charging = clone;
}

function Update () {
		
	time += Time.deltaTime;
	
	if (time >= 0 && time < 3) {
		var ps : ParticleSystem = charging.GetComponent(ParticleSystem);
		ps.startSize = 	3.61 - 2.61/3*time;
		charging.transform.position = transform.position;
	} else if (time >= runningTime && notInstantiated) {
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
		
		if (laserEffect == null) {
			laserEffect = Instantiate(laserEffectTemplate, player.transform.position, transform.rotation);
		}
		
		laserEffect.transform.position = player.transform.position + player.transform.forward;
		var clone3 = Instantiate(laserTemplate, transform.position, transform.rotation);
		var volBe : VolumetricLines.VolumetricLineBehavior = clone3.GetComponent(VolumetricLines.VolumetricLineBehavior);
		volBe.m_endPos = player.transform.position + player.transform.forward - transform.position;
		laser = clone3;
	}
}