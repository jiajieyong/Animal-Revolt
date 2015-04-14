#pragma strict

/// MouseLook rotates the transform based on the mouse delta.
/// Minimum and Maximum values can be used to constrain the possible rotation

/// To make an FPS style character:
/// - Create a capsule.
/// - Add the MouseLook script to the capsule.
///   -> Set the mouse look to use LookX. (You want to only turn character but not tilt it)
/// - Add FPSInputController script to the capsule
///   -> A CharacterMotor and a CharacterController component will be automatically added.

/// - Create a camera. Make the camera a child of the capsule. Reset it's transform.
/// - Add a MouseLook script to the camera.
///   -> Set the mouse look to use LookY. (You want the camera to tilt up and down like a head. The character already turns.)

	enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	var axes = RotationAxes.MouseXAndY;
	var sensitivityX = 15;
	var sensitivityY = 15;

	var minimumX = -360;
	var maximumX = 360;

	var minimumY = -20;
	var maximumY = 20;

	var rotationY = 0;

	function Update ()
	{

		if (axes == RotationAxes.MouseXAndY)
		{
			var rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
		}
		else if (axes == RotationAxes.MouseX)
		{
			transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
		}
		else
		{
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		}
	}
	
	function Start ()
	{
		// Make the rigid body not change rotation
		if (GetComponent.<Rigidbody>())
			GetComponent.<Rigidbody>().freezeRotation = true;
	}
