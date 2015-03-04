#pragma strict

var crosshair : Texture2D;
 
function Start () {
        Screen.showCursor = false;
}
 
function OnGUI () { 
        GUI.DrawTexture(Rect(Screen.width/2,Screen.height/2,64,64), crosshair);
}

