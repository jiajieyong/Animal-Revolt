#pragma strict
var speed = 20;
var minimumY = -45;
var maximumY = 90;
var rotationY = 0;

function Start () {

}

function Update () {
	//transform.Rotate(Vector3(Input.GetAxis("Mouse Y"), 0, 0), Time.deltaTime * -speed);
	rotationY += Input.GetAxis("Mouse Y") * speed; 			
	rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
	
	//transform.Rotate(Input.GetAxis("Mouse Y") * -speed,0,0);
	transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
}