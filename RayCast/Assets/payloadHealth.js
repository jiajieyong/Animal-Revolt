#pragma strict
var payLoadHealth = 200;
var truck : Texture2D;

var style : GUIStyle; 
var explosionPrefab : GameObject; 
var sound : AudioClip;

function Start () {

}

function Update () {
	if (payLoadHealth <= 0)
		explosion();
}

function explosion(){
	 Instantiate(explosionPrefab, transform.position, transform.rotation);
	 AudioSource.PlayClipAtPoint(sound, transform.position);
	 Destroy(gameObject);
}

function ApplyDamage(damage: int){
    payLoadHealth -= damage;
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 + 200,Screen.height - 100 ,100, 100), "" + payLoadHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 + 310,Screen.height - 110 ,80,80), truck);
}