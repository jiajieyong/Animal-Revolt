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
var inactive : Texture2D;

var ebutton : Texture2D;
var select : Texture2D;
var amount : Texture2D;

var toaster : Texture2D;

var style : GUIStyle;
var amountStyle : GUIStyle;

var tpsCamera: Camera;
var fpsCamera: Camera;
var ammoChanger : GameObject;
var detonator: GameObject;

var pickedFlag = false;
var signalSet: GameObject;
var animalManager : AnimalManager;

private var tpsON = false; 
private var vicinity : List.<GameObject> = new List.<GameObject>();
private var inventory : String[];
private var ammoAmount : int[];
private var selected : int;
private var reloadTime : float;

function Start () {
	inventory = new String[inventorySize];
	ammoAmount = new int[inventorySize];
	
	for (var i = 0; i < inventorySize; i++) {
		inventory[i] = "null";
		ammoAmount[i] = 0;
	}
	
	inventory[3] = "stone";
	ammoAmount[3] = 18;
	
	selected = 4;
	reloadTime = 0;
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
			
			var chosen = -1;
			var distance = 100000000;
			for (var j = 0; j < count; j++) {
				var obj = vicinity[j];
				var theD = Vector3.Distance(transform.position, obj.transform.position);
				if (theD < distance) {
					chosen = j;
				}
			}
			
			var ob = vicinity[chosen];
			var name = ob.name;
			var nullIndex = -1;
			var isNotAdded = true;
			
			for (var i = inventorySize - 2; i >= 0; i--) {
				if (inventory[i] == name) {
					
					animalManager.PickedUp(ob);
				
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
						
					animalManager.PickedUp(ob);
					
					ammoToGet = amountOfAmmoToGet(name);
					inventory[nullIndex] = name;
					ammoAmount[nullIndex] = ammoToGet;
					Destroy(ob);
					vicinity.Remove(ob);
			}
		}
	}
	
	if (ammoAmount[selected - 1] <= 0) {
		inventory[selected - 1] = "null";
	}
	
	if (Input.GetKeyDown ("r")) {
		ammoAmount[3] = 0;
		inventory[3] = "null";
	}
	
	if (ammoAmount[3] < 1) {
		var ob1 = gameObject.GetComponent(Reloading);

		if (reloadTime < 2) {
			if (!ob1.isLoading()) {
				ob1.reload();
			}
			reloadTime = reloadTime + Time.deltaTime;
		} else {
			ob1.reload();
			reloadTime = 0;
			ammoAmount[3] = 18;
			inventory[3] = "stone";
		}
	}
	
	ammoChanger.GetComponent(changeAmmo).SelectAmmo(inventory[selected - 1]);
}

function decrementBullet() {
	ammoAmount[selected - 1]--;
}

function OnTriggerEnter (other : Collider) {
		if (other.CompareTag("ammo")) {
			vicinity.Add(other.gameObject);
		}
		
		if (other.CompareTag("Detonator")){
			detonator.SetActive(true);
			Destroy(other.gameObject);
			signalSet.SetActive(true);
			pickedFlag = true;
		}
		
		if (other.CompareTag("ctfBase") && pickedFlag == true){
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).immortal = true;
			pickedFlag = false;
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
    		// show win menu
			Application.LoadLevelAdditive (5);
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
			
			if (ammoAmount[i] > 0) {
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), ammoMap(inventory[i]));
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), amount);
				
				var shift = 0;
				
				if (ammoAmount[i] >= 10) {
					shift = 2;
				}
				
				GUI.Label(Rect(Screen.width * 0.5 - shift + slotPosX + 46,Screen.height - 93 + 43 ,60, 60), "" + (ammoAmount[i]), amountStyle);
			} else {
				GUI.DrawTexture(Rect(Screen.width * 0.5 + slotPosX,Screen.height - 93 ,60, 60), inactive);
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
		
		if (pickedFlag == true) {
			GUI.DrawTexture(Rect(Screen.width * 0.5 + 310,Screen.height - 110 ,80,80), toaster);
		}
}

function ammoMap (ammotype : String) {
		if (ammotype == "stone") {
			return stone; 
		} else if (ammotype == "bull") {
			return bull; 
		} else if (ammotype == "cat") {
			return cat; 
		} else if (ammotype == "chicken") {
			return chicken; 
		} else if (ammotype == "cow") {
			return cow; 
		} else if (ammotype == "dog") {
			return dog; 
		} else if (ammotype == "frog") {
			return frog; 
		} else if (ammotype == "goat") {
			return goat; 
		} else if (ammotype == "horse") {
			return horse; 
		} else if (ammotype == "rat") {
			return rat; 
		} else if (ammotype == "sheep") {
			return sheep; 
		} else {
			return blank;
		}
}

function amountOfAmmoToGet (ammotype : String) {
	if (ammotype == "stone") {
			return 100; 
		} else if (ammotype == "bull") {
			return 2; 
		} else if (ammotype == "cat") {
			return 3; 
		} else if (ammotype == "chicken") {
			return 4; 
		} else if (ammotype == "cow") {
			return 2; 
		} else if (ammotype == "dog") {
			return 5; 
		} else if (ammotype == "frog") {
			return 5; 
		} else if (ammotype == "goat") {
			return 3; 
		} else if (ammotype == "horse") {
			return 3; 
		} else if (ammotype == "rat") {
			return 2; 
		} else if (ammotype == "sheep") {
			return 2; 
		} else {
			return 0;
		}
}

function chooseCamera() { 
	if (tpsON) {
		return tpsCamera;
	} else {
		return fpsCamera;
	}
}