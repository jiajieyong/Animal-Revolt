var tex : Texture2D;       // Texture to be rotated

private var angle : float = 0;
private var rect : Rect;
private var pivot : Vector2;
private var isReloading = false;

function Start() {
    rect = Rect(Screen.width * 0.5 + 195,Screen.height - 93,60, 60);
    pivot = Vector2(Screen.width * 0.5 + 195 + 30, Screen.height - 93 + 30);
}

function Update () {
	if (isReloading) {
		angle += 5;

		if (angle > 360) {
			angle = 0;
		}
	}
}

function OnGUI() {
	if (isReloading) {
		var matrixBackup : Matrix4x4 = GUI.matrix;
    	GUIUtility.RotateAroundPivot(angle, pivot);
    	GUI.DrawTexture(rect, tex);
    	GUI.matrix = matrixBackup;
    }
}

function reload() {
	isReloading = !isReloading;
}

function isLoading() {
	return isReloading;
}

