#pragma strict

var AOEspot : Texture2D; 

function Start () {

}

function OnGUI () {
	 var mousePos = Event.current.mousePosition;
	 GUI.DrawTexture( Rect( mousePos.x - (AOEspot.width/2),
                        mousePos.y - (AOEspot.height/2),
                        AOEspot.width,
                        AOEspot.height), AOEspot);
}