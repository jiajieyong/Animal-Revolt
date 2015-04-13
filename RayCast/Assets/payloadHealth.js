#pragma strict
var payLoadHealth = 200;
var truck : Texture2D;

var style : GUIStyle; 
var explosionPrefab : GameObject; 
var sound : AudioClip;
var payloadDefense : AudioClip;
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
		AudioSource.PlayClipAtPoint(payloadDefense, destination.position);
	counter = 150;
	}
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 + 400,Screen.height - 100 ,100, 100), "" + payLoadHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 + 310,Screen.height - 110 ,80,80), truck);
}