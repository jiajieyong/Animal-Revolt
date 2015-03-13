#pragma strict

var theBullet : Rigidbody;
 var Speed = 20;
 
 var radius = 0;
     var power = 10;
     
     var ammo : int;
     var maxAmmo : int;
     var Reloading : boolean;
     private var timer = 0.0;
     var shootSpeed = 0.1;
     var enoughAmmo : boolean;
     var gun : Transform;
     var isValidTarget = false;
     var showInvalid = false;
     var time : float;
     
     function Start () {
     ammo = 12;
     maxAmmo = 60;
     enoughAmmo = true;
         var explosionPos : Vector3 = transform.position;
         var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
         
         for (var hit : Collider in colliders) {
             if (hit && hit.rigidbody)
                 hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
         }
         
         time = Time.deltaTime;
     }
 
 function Update () {
 	
     if (Input.GetMouseButtonDown(0) && enoughAmmo == true)
     {
         
         if (isValidTarget) {
         	var clone = Instantiate(theBullet, transform.position, transform.rotation);
         	clone.velocity = transform.TransformDirection(Vector3(0, 0, Speed));
         	ammo -= 1;
         	if(ammo <= 0)
         	{
            	 AutoReload();
         	}
         	isValidTarget = false;
         }
     }
     if(Input.GetMouseButtonDown(1) && ammo != 12)
         {
 
         gun.animation.Play("reload");
         
             ammo = 12;
         Reloading = true;
         }
         if(Input.GetMouseButtonUp(1))
         {
         Reloading = false;
         }
      
     if(ammo <= 0 && maxAmmo <= 0){
     enoughAmmo = false;
     }
 }
 
 function OnGUI()
 {
 	GUI.Label(Rect(100,100,100,100), "stoneAmmo: " + ammo);
 	GUI.Label(Rect(100,200,100,100), "Max stoneAmmo: " + maxAmmo);
 	
 	if (showInvalid) {
 		time += Time.deltaTime;
 	
 		if (time < 5) {
 			var style = new GUIStyle();
         	style.richText = true;
         	
        	GUI.Label(Rect(200,200,1000,1000), "<size=20><color=red>Invalid Target</color></size>");
 		} else {
	 		time = 0;
	 		showInvalid = false;
	 	}
 	}
 }
 
 function updateTarget(target : Transform) {
 	if (target.gameObject.tag == "Enemy") {
 		isValidTarget = true;
 		this.theBullet.GetComponent(dogBullet).updateTarget(target);
 	} else {
 		showInvalid = true;
 	}
 }
 
 
 function AutoReload(){
 if(maxAmmo - (12 - ammo) >= 0){ ammo=12; maxAmmo-=ammo; }
 else{ ammo = maxAmmo; maxAmmo = 0; }
 }