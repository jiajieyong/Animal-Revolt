using UnityEngine;
using System.Collections;

public class AnimationController : MonoBehaviour {

	Animator animator;
	bool grounded = true;
	
	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
		if (grounded) {
			float h = Input.GetAxis ("Horizontal");
			float v = Input.GetAxis ("Vertical");

			animator.SetBool("Grounded", true);
			animator.SetFloat ("Forward", v);
			animator.SetFloat ("Side", h);
		} else {
			// magic fairy here for jump

			animator.SetBool("Grounded", false);
			animator.SetFloat ("Forward", 0);
			animator.SetFloat ("Side", 0);
		}
	}
}
