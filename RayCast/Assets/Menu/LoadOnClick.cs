using UnityEngine;
using System.Collections;

public class LoadOnClick : MonoBehaviour {
	
	public GameObject loadingImage;
	
	public void LoadScene(int level)
	{
		loadingImage.SetActive(true);
		Screen.showCursor = false;
		Application.LoadLevel(level);
	}

	public void ReloadScene()
	{
		loadingImage.SetActive(true);
		Screen.showCursor = false;
		Application.LoadLevel(Application.loadedLevel);
	}
}