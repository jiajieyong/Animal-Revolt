#pragma strict

var tpsCamera: Camera;
var fpsCamera: Camera;

private var camSwitch = false;

function Start () {
	fpsCamera.camera.enabled = true;
	tpsCamera.camera.enabled = false;
}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		camSwitch = !camSwitch;
	}
	
	if (camSwitch) {
		fpsCamera.camera.enabled = false;
		tpsCamera.camera.enabled = true;
	}
	else {
		fpsCamera.camera.enabled = true;
		tpsCamera.camera.enabled = false;
	}
}