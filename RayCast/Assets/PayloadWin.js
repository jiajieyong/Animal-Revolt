#pragma strict

var explosionPrefab : GameObject; 
var sound : AudioClip;

function OnTriggerEnter(collision : Collider) {
		if (collision.gameObject.name == "co_Farmhouse") {
			GameObject.Find("/Payload").GetComponent(payloadHealth).immortal = true;
			GameObject.Find("/First Person Controller").GetComponent(playerHealth).immortal = true;
			yield WaitForSeconds (0.5f);
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