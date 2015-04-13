#pragma strict
var playerHealth = 100;
var heart : Texture2D;
var style : GUIStyle; 
var diePrefab : GameObject;
var tpsCamera: Camera;
var fpsCamera: Camera;
var deathCamera: Camera;
var isDead = false;
var immortal = false;
var cotton : GameObject; 

private var msgList = new List.<Container>();

function Start () {
	
}

function Update () {
	if (cotton.active == false && playerHealth >100)
		playerHealth--;
}

function cottonGuard () {
	cotton.SetActive(true); 
	immortal = true; 
	for (var hot = 0; hot < 20; hot++){
		playerHealth += 1; 
		yield WaitForSeconds (0.5f);
	}
	
	if (GameObject.Find("/Canvas/Menu 1/Continue") == null)
		immortal = false;
	
	cotton.SetActive(false); 
}

function ApplyDamage(damage: int){
	if (playerHealth - damage > 0 && isDead == false && immortal == false) {
	    playerHealth -= damage;
	    var c : Container = new Container(damage, null, null, "");
	    msgList.Add(c);
	} else if (playerHealth - damage <= 0 && isDead == false && immortal == false) {
    	isDead = true;
    	
    	// watch yourself die
    	fpsCamera.camera.enabled = false;
		tpsCamera.camera.enabled = false;
		deathCamera.camera.enabled = true;
		
		//GameObject.Find("Main Camera/Point light").active = false;
		GetComponent(CharacterController).enabled = false;
		GetComponent(CharacterMotor).enabled = false;
		GetComponent(FPSInputController).enabled = false;
		GetComponent(MouseLook).enabled = false;
		GetComponent(switchCam).enabled = false;
		tpsCamera.GetComponent(MouseLookJS).enabled = false;
		tpsCamera.GetComponent(crosshair).enabled = false;
		GameObject.Find("/First Person Controller/Display").GetComponent(DDisplay).enabled = false;
		GameObject.Find("/First Person Controller/Display").GetComponent(ImpactDisplay).enabled = false;
		GameObject.Find("/First Person Controller/Inventory").SetActive(false);
		if (GameObject.Find("/Payload") != null)
			GameObject.Find("/Payload").GetComponent(payloadHealth).enabled = false;
		
   		
   		// swap to full body model to animate
   		var body = GameObject.Find("pig body");
   		var pos = body.transform.position;
   		var rot = body.transform.rotation;
    	Destroy(body);
    	Destroy(GameObject.Find("pig arm"));
    	var obj = Instantiate(diePrefab, pos ,rot);
    	obj.GetComponentInChildren(Animator).SetTrigger("Die");
    	
    	yield WaitForSeconds (2.5f);
    	// show restart menu
		Application.LoadLevelAdditive (4); 
		
    }
}

function OnGUI () {
	if (isDead == false) {
		GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 100 ,100, 100), "" + playerHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 300,Screen.height - 100 ,75,75), heart);
        
        var count : int = msgList.Count;
        var time = Time.deltaTime;
        
        for (var i = 0; i < count; i++) {
			var msg = msgList[0];
		
			if (msg._time > 1) {
				msgList.RemoveAt(0);
			}
			
			style.normal.textColor = Color.red;
			
			//Fade out
			style.normal.textColor.a = 1.5 - msg._time;
				
			//Float up
			var floatingOffset = 50*(msg._time/1.5);
		
			GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 130 - floatingOffset ,100, 100), "" + -msg._dmg, style);
		
			msg._time += time;
		}
		
		style.normal.textColor = Color.white;
	}
}