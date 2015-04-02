var tex : Texture2D;       // Texture to be rotated
var tpsCamera: Camera;
var fpsCamera: Camera;

private var angle : float = 0;
private var pos : Vector2 = new Vector2(0, 0);
private var rect : Rect;
private var pivot : Vector2;

private var goFollow : GameObject;
private var tpsON = false;
private var msgList = new List.<ImpactContainer>();

function Start() {
   	
    rect = Rect(Screen.width*0.5, Screen.height*0.5 - 200, 200, 200);
    pivot = Vector2(Screen.width*0.5, Screen.height*0.5);
}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		tpsON = !tpsON;
	}
}

function OnGUI() {
	var count : int = msgList.Count;
	var time = Time.deltaTime;
	
	for (var i = 0; i < count; i++) {
		var msg = msgList[0];
		
		if (msg._time > 1) {
			msgList.RemoveAt(0);
		}
		
		var cam = chooseCamera();
		var angle = -45 + updateAngle(msg._pos);
	 	
		var matrixBackup : Matrix4x4 = GUI.matrix;
    	GUIUtility.RotateAroundPivot(angle, pivot);
    	GUI.color.a = (1 - msg._time);
    	GUI.DrawTexture(rect, tex);
    	GUI.matrix = matrixBackup;
		GUI.color.a = 1;
		
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

function DisplayImpact(c : ImpactContainer) {
	c._time = 0;
	msgList.Add(c);
}

function updateAngle(bulletPos : Vector3) {

	var cam : Camera = chooseCamera();
	var vecBulletLocal = cam.transform.InverseTransformPoint(bulletPos);
	var bulletDir = Vector3.Normalize(Vector3(vecBulletLocal.x, 0, vecBulletLocal.z));
	var angle = Vector3.Angle(Vector3(0, 0, 1), bulletDir);
	
	if (vecBulletLocal.x < 0) {
		//infront
		angle = 360 - angle;
	}
	
	return angle;
}

class ImpactContainer {
	var _pos : Vector3;
	var _time : float;
	
	function ImpactContainer(pos : Vector3) {
		_pos = pos;
	}
}