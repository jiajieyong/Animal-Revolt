#pragma strict

var tpsCamera: Camera;
var fpsCamera: Camera;
var tpsArrow: GameObject;
var fpsArrow: GameObject;
var destination: Transform;

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
		if (destination != null) {
			if (Vector3.Distance(destination.position, transform.position) >= 15)
				tpsArrow.SetActive(true);
			else 
				tpsArrow.SetActive(false);
		}
	
		fpsCamera.camera.enabled = false;
		fpsArrow.SetActive(false);
		tpsCamera.camera.enabled = true;
	}
	else {
		if (destination != null) {
			if (Vector3.Distance(destination.position, transform.position) >= 15)
				fpsArrow.SetActive(true);
			else 
				fpsArrow.SetActive(false);
		}
		fpsCamera.camera.enabled = true;
		tpsArrow.SetActive(false);
		tpsCamera.camera.enabled = false;
		
	}
	
	if (Application.loadedLevel == 3) {
		if (destination != null) {
			if (Vector3.Distance(destination.position, transform.position) < 15) {
				destination = null;
			}

		} else {
			fpsArrow.SetActive(false);
			tpsArrow.SetActive(false);
		}
	}
}