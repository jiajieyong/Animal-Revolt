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
		
		if (msg._time > 1.5) {
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
				var dist = Vector3.Distance(transform.position, pos);
				var size = msg._transform.collider.bounds.size;
				var offset = Vector3(0, size.y, 0);
				var fontSize = 30 + (50/Mathf.Sqrt(dist));
				style.fontSize = fontSize;
				style.normal.textColor.a = (1.5/msg._time);
				var floatingOffset = 50*(msg._time/1.5);
    			var screenPos : Vector3 = currentCam.WorldToScreenPoint(pos + offset);
				GUI.Label(Rect(screenPos.x, Screen.height - screenPos.y - floatingOffset,60, 60), "" + msg._dmg, style);;
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