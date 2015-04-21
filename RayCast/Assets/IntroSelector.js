#pragma strict
var stage1: GameObject;
var stage2: GameObject;
var stage3: GameObject;
var panel: GameObject;

function Start () {
	panel.SetActive(true);
	switch (Application.loadedLevel) {
		case 1:
			stage1.SetActive(true);
			break;
		case 2:
			stage2.SetActive(true);
			break;
		case 3:
			stage3.SetActive(true);
			break;
		default:
			panel.SetActive(false);
			break;
	}
}