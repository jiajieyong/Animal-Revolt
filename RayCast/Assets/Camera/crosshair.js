#pragma strict

var crosshair : Texture2D;
 
function Start () {
        Screen.showCursor = false;
}
 
function OnGUI () { 
		if (!changeAmmo.cowMode) {
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 32,Screen.height * 0.5 - 32,64,64), crosshair);
        }
}

