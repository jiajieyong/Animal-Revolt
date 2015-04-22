#pragma strict
var payLoadHealth = 200;
var truck : Texture2D;

var style : GUIStyle; 
var explosionPrefab : GameObject; 
var sound : AudioClip;
var payloadDefense : AudioClip;
var destination : Transform;
var immortal = false;

var deadTruck : GameObject;
var counter = 0;

var tpsCamera: Camera;
var fpsCamera: Camera;

function Start () {

}

function Update () {
	if (payLoadHealth <= 0)
		explosion();
	
	if (counter > 0)
	counter = counter - 1;
}

function explosion(){
	Instantiate(deadTruck, transform.position, transform.rotation);
	Destroy(gameObject);
	Instantiate(explosionPrefab, transform.position, transform.rotation);
	AudioSource.PlayClipAtPoint(sound, transform.position);
	
	GameObject.Find("/First Person Controller").GetComponent(playerHealth).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(CharacterController).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(CharacterMotor).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(FPSInputController).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(MouseLook).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(switchCam).enabled = false;
	GameObject.Find("/First Person Controller").GetComponent(switchCTF).enabled = false;
	GameObject.Find("/First Person Controller/Display").GetComponent(buffDisplay).enabled = false;
	GameObject.Find("/First Person Controller/Display").GetComponent(DDisplay).enabled = false;
	GameObject.Find("/First Person Controller/Display").GetComponent(ImpactDisplay).enabled = false;
	GameObject.Find("/First Person Controller/Inventory").SetActive(false);
	GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
	tpsCamera.GetComponent(MouseLookJS).enabled = false;
	tpsCamera.GetComponent(crosshair).enabled = false;
	
	fpsCamera.camera.enabled = false;
	tpsCamera.camera.enabled = false;
	GameObject.Find("/deadPayload(Clone)/truckDeathCamera").camera.enabled = true;
}

function ApplyDamage(damage: int){
	if (immortal == false)
		payLoadHealth -= damage;
	if (counter == 0){
		AudioSource.PlayClipAtPoint(payloadDefense, destination.position);
		counter = 300;
	}
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 + 400,Screen.height - 100 ,100, 100), "" + payLoadHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 + 310,Screen.height - 110 ,80,80), truck);
}