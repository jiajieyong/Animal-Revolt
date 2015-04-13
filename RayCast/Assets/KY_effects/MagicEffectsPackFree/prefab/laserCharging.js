#pragma strict
var runningTime : float;
var chargingTemplate : GameObject;
var dischargeTemplate : GameObject;
var laserTemplate : GameObject;
var player: GameObject;
private var time : float = 0;
private var charging : GameObject;
private var discharge : GameObject;
private var laser : GameObject;
private var notInstantiated = true;
var start = false;
var neverAgain = true;
var startTime : float = 0;

function Start () {
	//var clone = Instantiate(chargingTemplate, transform.position, transform.rotation);
	//charging = clone;
}

function Update () {
	startTime += Time.deltaTime;
	if (startTime > 5) {
	start = true;
	
	if (start && neverAgain) {
		var clone1 = Instantiate(chargingTemplate, transform.position, transform.rotation);
		charging = clone1;
		neverAgain = false;
	}	
		
	time += Time.deltaTime;
	
	if (time >= 0 && time < 3) {
		var ps : ParticleSystem = charging.GetComponent(ParticleSystem);
		ps.startSize = 	3.61 - 2.61/3*time;
	} else if (time >= runningTime && notInstantiated) {
		Debug.Log(time);
		Destroy(charging);
		var clone = Instantiate(dischargeTemplate, transform.position, transform.rotation);
		discharge = clone;
		notInstantiated = false;
	} 
	
	if (discharge != null && !discharge.GetComponent(ParticleSystem).IsAlive()) {
		Destroy(discharge);
	}
	
	if (time >= runningTime) {
		var clone3 = Instantiate(laserTemplate, transform.position, transform.rotation);
		var volBe : VolumetricLines.VolumetricLineBehavior = clone3.GetComponent(VolumetricLines.VolumetricLineBehavior);
		volBe.m_endPos = Vector3(100, -100, 0);;
		laser = clone3;
	}
	}
}