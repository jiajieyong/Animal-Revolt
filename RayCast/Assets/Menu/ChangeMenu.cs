using UnityEngine;
using System.Collections;

public class ChangeMenu : MonoBehaviour {

	public GameObject Menu1;
	public GameObject Menu2;

	public void changeMenu()
	{
		Menu1.SetActive(!Menu1.activeInHierarchy);
		Menu2.SetActive(!Menu2.activeInHierarchy);
	}
}
