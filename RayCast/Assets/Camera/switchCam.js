#pragma strict

var tpsCamera: Camera;
var fpsCamera: Camera;
var tpsArrow: GameObject;
var fpsArrow: GameObject;

private var camSwitch = false;

function Start () {
	fpsCamera.camera.enabled = true;
	fpsArrow.SetActive(true);
	tpsCamera.camera.enabled = false;
	tpsArrow.SetActive(false); 
}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		camSwitch = !camSwitch;
	}
	
	if (camSwitch) {
		fpsCamera.camera.enabled = false;
		fpsArrow.SetActive(false);
		tpsCamera.camera.enabled = true;
		tpsArrow.SetActive(true);
	}
	else {
		fpsArrow.SetActive(true);
		fpsCamera.camera.enabled = true;
		tpsArrow.SetActive(false);
		tpsCamera.camera.enabled = false;
	}
}