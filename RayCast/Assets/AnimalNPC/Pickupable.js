#pragma implicit

function Start () {

}

function Update () {

}

function OnTriggerEnter(other: Collider) {
		if (other.transform.CompareTag("inventory")) {
			var ob : Behaviour = GetComponent("Halo");
			ob.enabled = true;
		} 
		
}

function OnTriggerExit(other: Collider) {
		if (other.transform.CompareTag("inventory")) {
			var ob : Behaviour = GetComponent("Halo");
			ob.enabled = false;
		} 
		
		
}