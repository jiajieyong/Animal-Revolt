#pragma strict
var payLoadHealth = 200;
var truck : Texture2D;

var style : GUIStyle; 
var explosionPrefab : GameObject; 
var sound : AudioClip;
var payloadDefense : AudioClip;
var payloadContested : AudioClip;
var payloadGet: AudioClip;
var destination : Transform;

var counter = 0;

function Start () {

}

function Update () {
	if (payLoadHealth <= 0)
		explosion();
	
	if (counter > 0)
	counter = counter - 1;
}

function explosion(){
	Instantiate(explosionPrefab, transform.position, transform.rotation);
	AudioSource.PlayClipAtPoint(sound, transform.position);
	Destroy(gameObject);
	
	GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
	// show restart menu
	Application.LoadLevelAdditive (4);
}

function ApplyDamage(damage: int){
	payLoadHealth -= damage;
	if (counter == 0){
	
		if (Vector3.Distance(destination.position, transform.position) > 15f) {
			AudioSource.PlayClipAtPoint(payloadGet, destination.position);
		}
		else {
			var number = Random.value;
			if (number <0.6)
				AudioSource.PlayClipAtPoint(payloadDefense, destination.position);
			else 
				AudioSource.PlayClipAtPoint(payloadContested, destination.position);	
		}	
	counter = 150;
	}
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 + 400,Screen.height - 100 ,100, 100), "" + payLoadHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 + 310,Screen.height - 110 ,80,80), truck);
}