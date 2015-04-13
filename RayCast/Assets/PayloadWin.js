#pragma strict

var explosionPrefab : GameObject; 
var sound : AudioClip;

function OnCollisionEnter(collision : Collision) {
		if (collision.gameObject.name == "co_Farmhouse") {
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).immortal = true;
			yield WaitForSeconds (1);
			// payload explode
			Instantiate(explosionPrefab, transform.position, transform.rotation);
			AudioSource.PlayClipAtPoint(sound, transform.position);
			Destroy(gameObject);
			
			// house explode
			Instantiate(explosionPrefab, collision.gameObject.transform.position, collision.gameObject.transform.rotation);
		 	AudioSource.PlayClipAtPoint(sound, collision.gameObject.transform.position);
			Destroy(collision.gameObject);
			
			GameObject.Find("/First Person Controller/Main Camera").GetComponent(crosshair).enabled = false;
    		// show win menu
			Application.LoadLevelAdditive (5);
		}
	}