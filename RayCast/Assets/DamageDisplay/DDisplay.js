#pragma strict
var tpsCamera: Camera;
var fpsCamera: Camera;
var style : GUIStyle;
var boss : GameObject;

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
	var _target : String;
	
	function Container(dmg : int, transform : Transform, target : String,type : String) {
		_dmg = dmg;
		_transform = transform;
		_type = type;
		_target = target;
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
		
		if (msg._target == "enemy") {
		
		 	if (msg._type == "instant") { 
				style.normal.textColor = Color.yellow;
			}
			
			else if (msg._type == "dots") { 
				style.normal.textColor = Color(0.75,0,0.75,1);
			}
			
			if (msg._transform != null) {
				var pos = msg._transform.position;

				var currentCam = chooseCamera();
				var heading = pos - currentCam.transform.position;
			
				if (Vector3.Dot(currentCam.transform.forward, heading) > 0) {
					
					var screenPos : Vector3;
					
					//calculate offset of dmg to top of gameobject
					if (msg._transform.name == "forearm R") {
						screenPos  = currentCam.WorldToScreenPoint(boss.transform.position + Vector3(0, 9, 0));
					} else {
						var size = msg._transform.collider.bounds.size;
						var offset = Vector3(0, size.y, 0);
						screenPos = currentCam.WorldToScreenPoint(pos + offset);
					}
					//Size of text depending on dist of player to GO
					var dist = Vector3.Distance(transform.position, pos);
					var fontSize = 30 + (50/Mathf.Sqrt(dist));
					style.fontSize = fontSize;
				
					//Fade out
					style.normal.textColor.a = 1.5 - msg._time;
				
					//Float up
					var floatingOffset = 50*(msg._time/1.5);
    			
    				//Draw
					GUI.Label(Rect(screenPos.x, Screen.height - screenPos.y - floatingOffset,60, 60), "" + -msg._dmg, style);;
				}
			}
		
			msg._time += time;
		} else if (msg._target == "player") {
			var pos1 = msg._transform.position;
			
		}
	}
}

function chooseCamera() { 
	if (tpsON) {
		return tpsCamera;
	} else {
		return fpsCamera;
	}
}

function direction (fwd: Vector3, bulletPos : Vector3) {
	var vecBulletLocal = transform.InverseTransformPoint(bulletPos);
	var bulletDir = Vector3.Normalize(Vector3(-vecBulletLocal.x, 0, -vecBulletLocal.z));
	var dir= Vector3.Dot(Vector3(0, 0, 1), bulletDir);
	
	if (vecBulletLocal.z < 0) {
		
	} else {
		//in front
		
	}
}