#pragma strict

var theCamera: Camera;
var orPosX : float;
var orPosY : float;
var orPosZ : float;

var goPosX : float;
var goPosY : float;
var goPosZ : float;

var offset : float;
var player : GameObject;
var time : float;

private var isCollide = false;
private var dist : float;
private var originalPos : Vector3;
private var goToPos : Vector3;
private var isGoToDone = true;
private var isOrgDone = true;
private var speed : float;

function Start () {
	originalPos = Vector3(orPosX, orPosY, orPosZ);
	goToPos = Vector3(goPosX, goPosY, goPosZ);
	dist = Vector3.Distance(originalPos, goToPos);
	speed = dist/time;
}

function Update () {
	transform.localPosition = originalPos + Vector3(offset, 0, 0);
	var minPos = transform.position;
	transform.localPosition = goToPos;
	var maxPos = transform.position;
	transform.localPosition = originalPos;
	var dir = maxPos - minPos;
	var hit : RaycastHit;
	
	if (isCollide) {
		Debug.DrawRay (minPos, dir, Color.red);
		if (Physics.Raycast(minPos, dir, hit, dist)) {
			var intersection = hit.point;
			theCamera.camera.transform.position = intersection;
			theCamera.camera.transform.localPosition -= Vector3(0.1, 0, 0);
		}

		setAllAlpha(0.1);                                    
	} else {
		setAllAlpha(1);
		theCamera.camera.transform.localPosition = originalPos;

	}
}

function OnTriggerEnter ()
{	
	Debug.Log("cam collide");
    isCollide = true;
}

function OnTriggerExit ()
{	
	Debug.Log("cam left");
    isCollide = false;
}

function setAllAlpha(alpha : float) {
	var pig = player.transform.GetChild(2);
	
	setAlpha(pig, alpha);
}

function setAlpha(a : Transform, alpha : float) {
	var count = a.childCount;
	
	if(a.GetComponent(Renderer) != null) {
		a.renderer.material.color.a = alpha;
	}
	
	if (count == 0) {
		return;
	} else {
		for (var i = 0; i < count; i++) {
			setAlpha(a.GetChild(i), alpha);
		}
	}
}