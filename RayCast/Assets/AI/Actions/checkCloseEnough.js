import RAIN.Action;
import RAIN.Core;

@RAINAction
class checkCloseEnough extends RAIN.Action.RAINAction
{
    function Start(ai:RAIN.Core.AI):void
	{
        super.Start(ai);
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{
		//var payload : GameObject = ai.WorkingMemory.GetItem("payload");
		var hit : RaycastHit;
		
		var myself : GameObject = ai.WorkingMemory.GetItem("myself");
		var payload : GameObject = ai.WorkingMemory.GetItem("payload");
		var empty : GameObject = ai.WorkingMemory.GetItem("empty");
		
		
		var myPos : Vector3 = myself.transform.position;
		//Debug.Log(myPos);
		
		var rayOrigin = new Vector3(myself.transform.position.x, myself.transform.position.y + 1.1f, myself.transform.position.z);
		
		if (Physics.Raycast (rayOrigin, myself.transform.TransformDirection(Vector3.forward), hit, 2)) {		
			
			if (hit.collider.tag == "Payload") {
			ai.WorkingMemory.SetItem("varNearPayload", payload);
			//ai.WorkingMemory.SetItem("varPayload", payload);
			//Debug.Log(ai.WorkingMemory.GetItem("varNearPayload"));
			}
			else {
			ai.WorkingMemory.SetItem("varNearPayload", empty);
			}
			
		}
		else 
			ai.WorkingMemory.SetItem("varNearPayload", empty);
			
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
}