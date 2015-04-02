#pragma strict
var Target : Transform;
var Speed = 20;
var theBullet : Rigidbody;

function Start () {
}

function Update () {

}

function AIShoot() {
		var newBlast = Instantiate(theBullet, transform.position, transform.rotation);
		newBlast.GetComponent(stoneBullet).updateOrigin(transform.position);
		newBlast.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
		
		Destroy(newBlast.gameObject, 2f);
}