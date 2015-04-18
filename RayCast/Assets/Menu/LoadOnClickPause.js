#pragma strict

var loadingImage : GameObject;
var pauseUI : GameObject;
var pauseGame = false;

function Update() {
	if (Input.GetKeyDown(KeyCode.Escape)){
		Pause();
	}
}

function LoadScene(level : int)
	{
		if (GameObject.Find("/First Person Controller") != null)
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(DDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(ImpactDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Inventory") != null)
			GameObject.Find("/First Person Controller/Inventory").SetActive(false);
		if (GameObject.Find("/Payload") != null)
			GameObject.Find("/Payload").GetComponent(payloadHealth).enabled = false;
		Time.timeScale = 1;
		loadingImage.SetActive(true);
		Screen.showCursor = false;
		Application.LoadLevel(level);
	}
	
function ReloadScene()
	{
		if (GameObject.Find("/First Person Controller") != null)
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(DDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(ImpactDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Inventory") != null)
			GameObject.Find("/First Person Controller/Inventory").SetActive(false);
		if (GameObject.Find("/Payload") != null)
			GameObject.Find("/Payload").GetComponent(payloadHealth).enabled = false;
		Time.timeScale = 1;
		loadingImage.SetActive(true);
		Screen.showCursor = false;
		Application.LoadLevel(Application.loadedLevel);
	}

function NextScene()
	{
		if (GameObject.Find("/First Person Controller") != null)
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(DDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Display") != null)
			GameObject.Find("/First Person Controller/Display").GetComponent(ImpactDisplay).enabled = false;
		if (GameObject.Find("/First Person Controller/Inventory") != null)
			GameObject.Find("/First Person Controller/Inventory").SetActive(false);
		if (GameObject.Find("/Payload") != null)
			GameObject.Find("/Payload").GetComponent(payloadHealth).enabled = false;
		Time.timeScale = 1;
		loadingImage.SetActive(true);
		Screen.showCursor = false;
		if (Application.loadedLevel >= 3) {
			Application.LoadLevel (0);
		} else {
			Application.LoadLevel (Application.loadedLevel + 1);
		}
	}

function QuitGame()
	{
		Application.Quit ();
	}
	
function Pause() 
	{
		pauseGame = !pauseGame;

		if(pauseGame == true)
		{
			Screen.showCursor = true;
			Time.timeScale = 0;
			pauseGame = true;
			GameObject.Find("/First Person Controller").GetComponent(CharacterController).enabled = false;
			GameObject.Find("/First Person Controller").GetComponent(CharacterMotor).enabled = false;
			GameObject.Find("/First Person Controller").GetComponent(FPSInputController).enabled = false;
			GameObject.Find("/First Person Controller").GetComponent(MouseLook).enabled = false;
			GameObject.Find("/First Person Controller").GetComponent(switchCam).enabled = false;
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(MouseLookJS).enabled = false;
			GameObject.Find("/First Person Controller/pig arm").GetComponent(rotateArm).enabled = false;
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
			pauseUI.SetActive(true);
		}

		if(pauseGame == false)
		{
			Screen.showCursor = false;
			Time.timeScale = 1;
			pauseGame = false;
			GameObject.Find("/First Person Controller").GetComponent(CharacterController).enabled = true;
			GameObject.Find("/First Person Controller").GetComponent(CharacterMotor).enabled = true;
			GameObject.Find("/First Person Controller").GetComponent(FPSInputController).enabled = true;
			GameObject.Find("/First Person Controller").GetComponent(MouseLook).enabled = true;
			GameObject.Find("/First Person Controller").GetComponent(switchCam).enabled = true;
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(MouseLookJS).enabled = true;
			GameObject.Find("/First Person Controller/pig arm").GetComponent(rotateArm).enabled = true;
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = true;
			pauseUI.SetActive(false);
		}
	}