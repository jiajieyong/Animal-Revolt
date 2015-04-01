#pragma strict
var tpsCamera: Camera;
var fpsCamera: Camera;
var style : GUIStyle;

private var tpsON = false; 
private var msgList = new List.<Container>();

function Start () {

}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		tpsON = !tpsON;
	}
}

function DisplayDamage(c : Container) {
	c._time = 0;
	msgList.Add(c);
}

class Container {
	var _dmg : int;
	var _transform : Transform;
	var _type : String;
	var _time : float;
	
	function Container(dmg : int, pos : Transform, type : String) {
		_dmg = dmg;
		_transform = pos;
		_type = type;
	}
}

function OnGUI() {
	var count : int = msgList.Count;
	var time = Time.deltaTime;
	
	for (var i = 0; i < count; i++) {
		var msg = msgList[0];
		
		if (msg._time > 2) {
			msgList.RemoveAt(0);
		}
		
		if (msg._type == "instant") {
			style.normal.textColor = Color.yellow;
		}
		
		if (msg._transform != null) {
			var pos = msg._transform.position;

		
		var currentCam = chooseCamera();
		var heading = pos - currentCam.transform.position;
		if (Vector3.Dot(currentCam.transform.forward, heading) > 0) {
    		var screenPos : Vector3 = currentCam.WorldToScreenPoint(pos);
			GUI.Label(Rect(screenPos.x, Screen.height - screenPos.y - 50,60, 60), "" + msg._dmg, style);;
		}
		}
		msg._time += time;
	}
	
	
}

function chooseCamera() { 
	if (tpsON) {
		return tpsCamera;
	} else {
		return fpsCamera;
	}
}