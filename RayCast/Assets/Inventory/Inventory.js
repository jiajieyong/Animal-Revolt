#pragma strict
import System.Collections.Generic;

var slot : Texture2D;
var inventorySize : int;

var stone : Texture2D;
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
var select : Texture2D;
var amount : Texture2D;

var style : GUIStyle;
var amountStyle : GUIStyle;

var tpsCamera: Camera;
var fpsCamera: Camera;
var ammoChanger : GameObject;

private var tpsON = false; 
private var vicinity : List.<GameObject> = new List.<GameObject>();
private var inventory : String[];
private var ammoAmount : int[];
private var selected : int;

function Start () {
	inventory = new String[inventorySize];
	ammoAmount = new int[inventorySize];
	
	for (var i = 0; i < inventorySize; i++) {
		inventory[i] = "null";
		ammoAmount[i] = 0;
	}
	
	inventory[3] = "stone";
	
	selected = 4;
}

function Update () {
	if (Input.GetMouseButtonDown(1)){
		tpsON = !tpsON;
	}
	
	if (Input.GetKeyDown ("1")) {
		selected = 1;
	}
	
	if (Input.GetKeyDown ("2")) {
		selected = 2;
	}
	
	if (Input.GetKeyDown ("3")) {
		selected = 3;
	}
	
	if (Input.GetKeyDown ("4")) {
		selected = 4;
	}
	
	var scroll = Input.GetAxis("Mouse ScrollWheel");
	if (scroll > 0) {
		var moveUpBy : int = scroll/0.1; 
		selected = selected - moveUpBy;
		while (selected < 1) {
			selected += inventorySize;
		}
	} else if (scroll < 0) {
		var moveDownBy : int = -scroll/0.1; 
		selected = selected + moveDownBy;
		while (selected > inventorySize) {
			selected -= inventorySize;
		}
	}

	if (Input.GetKeyDown ("e")) {
		var count = vicinity.Count;
		if (count != 0) {
			var ob = vicinity[0];
			var name = ob.name;
			var nullIndex = -1;
			var isNotAdded = true;
			
			for (var i = inventorySize - 2; i >= 0; i--) {
				if (inventory[i] == name) {
					var ammoToGet = amountOfAmmoToGet(name);
					inventory[i] = name;
					ammoAmount[i] += ammoToGet;
					Destroy(ob);
					vicinity.Remove(ob);
					isNotAdded = false;
					break;
				}
				
				if (inventory[i] == "null") {
					nullIndex = i;
				}
			}
			
			if (nullIndex >= 0 && isNotAdded) {
					ammoToGet = amountOfAmmoToGet(name);
					inventory[nullIndex] = name;
					ammoAmount[nullIndex] = ammoToGet;
					Destroy(ob);
					vicinity.Remove(ob);
			}
		}
	}
	
	if (Input.GetMouseButtonDown(0)){
		if (selected < 4) {
			ammoAmount[selected - 1]--;
			
			if (ammoAmount[selected - 1] == -1) {
				inventory[selected - 1] = "null";
			}
		}
	}
	
	ammoChanger.GetComponent(changeAmmo).SelectAmmo(inventory[selected - 1]);
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
			
			if (i == 3) {
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), ammoMap(inventory[i]));
			}
			
			if (ammoAmount[i] > 0) {
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), ammoMap(inventory[i]));
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), amount);
				GUI.Label(Rect(Screen.width * 0.5 + slotPosX + 46,Screen.height - 93 + 43 ,60, 60), "" + (ammoAmount[i]), amountStyle);
			}
			
			if ((selected - 1) == i) {
				GUI.DrawTexture(Rect(Screen.width * 0.5 - 5 + slotPosX,Screen.height - 5 - 93 ,70, 70), select);
			}
			
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
			var heading = ob.transform.position - currentCam.transform.position;
 
			if (Vector3.Dot(currentCam.transform.forward, heading) > 0) {
    			var screenPos : Vector3 = currentCam.WorldToScreenPoint(ob.transform.position);
				GUI.DrawTexture(Rect(screenPos.x, Screen.height - screenPos.y - 30 ,60, 60), ebutton);
			}
		}
}

function ammoMap (ammotype : String) {
	switch (ammotype) {
		case "stone" : 
			return stone; 
			break;
		case "bull" : 
			return bull; 
			break;
		case "cat" : 
			return cat; 
			break;
		case "chicken" : 
			return chicken; 
			break;
		case "cow" : 
			return cow; 
			break;
		case "dog" : 
			return dog; 
			break;
		case "frog" : 
			return frog; 
			break;
		case "goat" : 
			return goat; 
			break;
		case "horse" : 
			return horse; 
			break;
		case "rat" : 
			return rat; 
			break;
		case "sheep" : 
			return sheep; 
			break;
		default : 
			return blank; 
			break;
	}
}

function amountOfAmmoToGet (ammotype : String) {
	switch (ammotype) {
		case "stone" : 
			return 100; 
			break;
		case "bull" : 
			return 2;
			break;
		case "cat" : 
			return 4; 
			break;
		case "chicken" : 
			return 5; 
			break;
		case "cow" : 
			return 2; 
			break;
		case "dog" : 
			return 3; 
			break;
		case "frog" : 
			return 5; 
			break;
		case "goat" : 
			return 3; 
			break;
		case "horse" : 
			return 3; 
			break;
		case "rat" : 
			return 1; 
			break;
		case "sheep" : 
			return 2; 
			break;
		default : 
			return 0; 
			break;
	}
}

function chooseCamera() { 
	if (tpsON) {
		return tpsCamera;
	} else {
		return fpsCamera;
	}
}