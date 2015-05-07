#pragma strict

private var won = false;
private var fade = false;
private var bossMusic : AudioSource;
var happyMusic: AudioClip;

function Start() {
	bossMusic = GetComponent.<AudioSource>();
}

function Update () {
	if (!GameObject.Find("/Bossman") && won == false){
		won = true;
		fade = true;
		win();
	}
	
	if (won==true){
		bossMusic.volume = Mathf.Max(bossMusic.volume-0.005,0);
	}
	
	if (bossMusic.volume == 0 && fade == true) {
		AudioSource.PlayClipAtPoint(happyMusic,Vector3(0,0,0));
		fade = false;
	}
}

function win() {
	yield WaitForSeconds (3);
	GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
	Application.LoadLevelAdditive (5);
}
