using UnityEngine;
using System.Collections;

public class SimpleCameraScrolling : MonoBehaviour {

	Vector3 mouseClickPos;
	bool isPanning;
	float panSpeed = 4.0f;

	// Use this for initialization
	void Start () {
		isPanning = false;
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonDown(0)) {
			mouseClickPos = Input.mousePosition;
			isPanning = true;
		}
		if(Input.GetMouseButtonUp(0)) {
			isPanning = false;
		}


		if(isPanning) {

			Vector3 pos = Camera.main.ScreenToViewportPoint(Input.mousePosition - mouseClickPos);
			
			Vector3 moveX = new Vector3(pos.x * panSpeed, 0, 0); //Local
			Vector3 moveZ = new Vector3(pos.y * panSpeed, 0, 0); //World

			transform.Translate(moveX, Space.Self);
			transform.Translate(-moveZ, Space.World);

		}
	}
}
