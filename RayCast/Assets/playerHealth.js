#pragma strict
var playerHealth = 100;
var heart : Texture2D;

var style : GUIStyle; 
var style1 : GUIStyle; 

function Start () {

}

function Update () {

}

function ApplyDamage(damage: int){
    playerHealth -= damage;
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 100 ,100, 100), "" + playerHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 300,Screen.height - 100 ,75,75), heart);
}