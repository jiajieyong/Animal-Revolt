#pragma strict

function Start () {
		yield WaitForSeconds (2.5f);
		// show restart menu
		Application.LoadLevelAdditive (4);
}

function Update () {

}