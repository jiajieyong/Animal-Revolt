#pragma strict

 var theBullet : Rigidbody;
 var Speed = 10;
 var inventory : GameObject;
 
 var radius = 0;
     var power = 10;
     
     var ammo : int;
     var maxAmmo : int;
     var Reloading : boolean;
     private var timer = 0.0;
     var shootSpeed = 0.1;
     var enoughAmmo : boolean;
     var gun : Transform;
     
     var numShots = 3;            // Number of shots fired (should be odd); 
     var ratArray: Rigidbody[]; 
     
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
         
         if (numShots / 2 * 2 == numShots) numShots++; // Need an odd number of shots
         if (numShots < 3) numShots = 3;  // At least 3 shots for a fan
     }

 function Update () {
     if (Input.GetMouseButtonDown(0) && enoughAmmo == true && GameObject.Find("Canvas").GetComponent(LoadOnClickPause).pauseGame == false)
     {
         
         var clone: Rigidbody;
         
         for (var i = 0; i < numShots; i++) {
         
	         clone = Instantiate(theBullet, transform.position, Quaternion.AngleAxis(45-(90/(numShots-1))*i, transform.up) * transform.rotation);
	         clone.rigidbody.AddForce(clone.transform.forward * 1000);
	        
	         
	         	     Destroy (clone.gameObject, 2); 
		      
        }
        
         inventory.GetComponent(Inventory).decrementBullet();
         
         
         ammo -= 1;
         if(ammo <= 0)
         {
             AutoReload();
         }
         
         
     
     }
 }
 //function OnGUI()
 //{
 //GUI.Label(Rect(100,100,100,100), "ratAmmo: " + ammo);
 //GUI.Label(Rect(100,200,100,100), "Max stoneAmmo: " + maxAmmo);
 //}
 
 
 function AutoReload(){
 if(maxAmmo - (12 - ammo) >= 0){ ammo=12; maxAmmo-=ammo; }
 else{ ammo = maxAmmo; maxAmmo = 0; }
 }