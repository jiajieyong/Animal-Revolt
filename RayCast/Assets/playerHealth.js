#pragma strict
var playerHealth = 100;
var heart : Texture2D;

var style : GUIStyle; 
private var msgList = new List.<Container>();

function Start () {

}

function Update () {

}

function ApplyDamage(damage: int){
    playerHealth -= damage;
    var c : Container = new Container(damage, null, null, "");
    msgList.Add(c);
}

function OnGUI () { 
		GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 100 ,100, 100), "" + playerHealth, style); 
        GUI.DrawTexture(Rect(Screen.width * 0.5 - 300,Screen.height - 100 ,75,75), heart);
        
        var count : int = msgList.Count;
        var time = Time.deltaTime;
        
        for (var i = 0; i < count; i++) {
			var msg = msgList[0];
		
			if (msg._time > 1) {
				msgList.RemoveAt(0);
			}
			
			style.normal.textColor = Color.red;
			
			//Fade out
			style.normal.textColor.a = 1.5 - msg._time;
				
			//Float up
			var floatingOffset = 50*(msg._time/1.5);
		
			GUI.Label(Rect(Screen.width * 0.5 - 200,Screen.height - 130 - floatingOffset ,100, 100), "" + -msg._dmg, style);
		
			msg._time += time;
		}
		
		style.normal.textColor = Color.white;
}