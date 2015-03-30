#pragma strict
import System.Collections.Generic;

var slot : Texture2D;
var inventorySize : int;

var bull : Texture2D;
var cat : Texture2D;
var chicken : Texture2D;
var cow : Texture2D;
var dog : Texture2D;
var frog : Texture2D;
var goat : Texture2D;
var horse : Texture2D;
var rat : Texture2D;
var sheep : Texture2D;
var blank : Texture2D;

var ebutton : Texture2D;

var style : GUIStyle;

var tpsCamera: Camera;
var fpsCamera: Camera;

private var tpsON = false; 
private var vicinity : List.<GameObject> = new List.<GameObject>();
private var inventory : String[];

function Start () {
	inventory = new String[inventorySize];
	for (var i = 0; i < inventorySize; i++) {
		inventory[i] = "null";
	}
}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		tpsON = !tpsON;
	}

	if (Input.GetKeyDown ("e")) {
		var count = vicinity.Count;
		if (count != 0) {
			var ob = vicinity[0];
			var name = ob.name;
			
			for (var i = 0; i < inventorySize; i++) {
				if (inventory[i] === "null") {
					inventory[i] = name;
					Destroy(ob);
					vicinity.Remove(ob);
					break;
				}
			}
		}
	}
}

function OnTriggerEnter (other : Collider) {
		if (other.CompareTag("ammo")) {
			vicinity.Add(other.gameObject);
		}
}

function OnTriggerExit (other : Collider) {
	if (other.CompareTag("ammo")) {
		var gameOb = other.gameObject;
		vicinity.Remove(gameOb);
	}
}

function OnGUI () { 
		var slotPosX = -30;
		
		for (var i = 0; i < inventorySize; i++) {
			GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), slot);
			GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), ammoMap(inventory[i]));
			slotPosX += 75;
		}
		
		slotPosX = -20;
		for (i = 0; i < inventorySize; i++) {
			GUI.Label(Rect(Screen.width * 0.5 + slotPosX, Screen.height - 58 ,60, 60), "" + (i + 1), style);
			slotPosX += 75;
		}
		
		for (i = 0; i < vicinity.Count; i++) {
			var ob : GameObject = vicinity[i];
			var currentCam = chooseCamera();
			var screenPos : Vector3 = currentCam.WorldToScreenPoint(ob.transform.position);
			GUI.DrawTexture(Rect(screenPos.x, Screen.height - screenPos.y - 30 ,60, 60), ebutton);
		}
}

function ammoMap (ammotype : String) {
	switch (ammotype) {
		case "bull" : return bull; break;
		case "cat" : return cat; break;
		case "chicken" : return chicken; break;
		case "cow" : return cow; break;
		case "dog" : return dog; break;
		case "frog" : return frog; break;
		case "goat" : return goat; break;
		case "horse" : return horse; break;
		case "rat" : return rat; break;
		case "sheep" : return sheep; break;
		default : return blank; break;
	}
}

function chooseCamera() { 
	if (tpsON) {
		return tpsCamera;
	} else {
		return fpsCamera;
	}
}