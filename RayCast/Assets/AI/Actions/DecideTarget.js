import RAIN.Action;
import RAIN.Core;

@RAINAction
class DecideTarget extends RAIN.Action.RAINAction
{
	private var wpset;
	private var playerMaxHealth: int;
	private var myMaxHealth: int;
	private var payloadMaxHealth : int;
	
	private var M_desirability : DesirabilityMembership;
	private var M_playerThreat : PlayerThreatMembership;
	private var M_payloadThreat : PayloadThreatMembership;
	private var M_distance : DistanceMembership;
	private var M_playerHealth : PlayerHealthMembership;
	private var M_payloadHealth : PayloadHealthMembership;
	
    function Start(ai:RAIN.Core.AI):void
	{
		wpset = RAIN.Navigation.NavigationManager.Instance.GetWaypointSet("PayloadRoute");
		var wpLength = wpset.Waypoints.Count;
		playerMaxHealth = ai.WorkingMemory.GetItem("playerMaxHealth");
		myMaxHealth = ai.WorkingMemory.GetItem("myMaxHealth");
		payloadMaxHealth = ai.WorkingMemory.GetItem("payloadMaxHealth");
		
		M_desirability = new DesirabilityMembership(25, 50, 75);
		M_playerThreat = new PlayerThreatMembership(myMaxHealth/4, myMaxHealth/2, myMaxHealth*3/4);
		M_payloadThreat = new PayloadThreatMembership(wpLength/5, wpLength/2, wpLength*3/4);
		M_distance = new DistanceMembership(10.74/2, 10.74*2/3, 10.74*3/4);
		M_playerHealth = new PlayerHealthMembership(playerMaxHealth/4, playerMaxHealth/2, playerMaxHealth*3/4);
		M_payloadHealth = new PayloadHealthMembership(payloadMaxHealth/4, payloadMaxHealth/2, payloadMaxHealth*3/4);
		
        super.Start(ai);
	}

    function Execute(ai:RAIN.Core.AI):ActionResult
	{
		//Get all measured params
		var player : GameObject = ai.WorkingMemory.GetItem("player");
		var payload : GameObject = ai.WorkingMemory.GetItem("payload");
		var myself : GameObject = ai.WorkingMemory.GetItem("myself");
		var myPos : Vector3 = myself.transform.position;
		
		var index : float = wpset.GetNextSequentialWaypointIndex(payload.transform.position, false);
		var myHealth = myself.GetComponent(SampleEnemy).health;
		var player_Health = player.GetComponent(playerHealth).playerHealth;
		var payload_Health = payload.GetComponent(payloadHealth).payLoadHealth;
		var playerDistance = Vector3.Distance(player.transform.position, myPos);
		var payloadDistance = Vector3.Distance(payload.transform.position, myPos);
		
		var playerUndesirable = calculateUndesirable(playerDistance, myHealth, player_Health, "Player");
		var playerDesirable = calculateDesirable(playerDistance, myHealth, player_Health, "Player");
		var playerVeryDesirable = calculateVeryDesirable(playerDistance, myHealth, player_Health, "Player");
		
		var playerDesirability = (12.5*playerUndesirable + 50*playerDesirable + playerVeryDesirable*87.5)/(playerUndesirable + playerDesirable + playerVeryDesirable);
		
		var payloadUndesirable = calculateUndesirable(payloadDistance, index, payload_Health, "Payload");
		var payloadDesirable = calculateDesirable(payloadDistance, index, payload_Health, "Payload");
		var payloadVeryDesirable = calculateVeryDesirable(payloadDistance, index, payload_Health, "Payload");
		
		var payloadDesirability = (12.5*payloadUndesirable + 50*payloadDesirable + payloadVeryDesirable*87.5)/(payloadUndesirable + payloadDesirable + payloadVeryDesirable);
		
		var target : GameObject;
		if (payloadDesirability > playerDesirability) {
			target = payload;
		} else {
			target = player;
		}
		
        return ActionResult.SUCCESS;
	}

	function Stop(ai:RAIN.Core.AI):void
	{
        super.Stop(ai);
	}
	
	function calculateUndesirable(distance: float, threat: float, health: float, type: String) : float {
	
		var undesirableValue : float = 0;
		var undesirableArray = new ArrayList();
		var pl_far = M_distance.far(distance);
		var pl_medium = M_distance.medium(distance);
		var pl_near = M_distance.near(distance);
		
		var pl_notThreat;
		var pl_threat;
		var pl_veryThreat;
		
		var pl_dying = M_playerHealth.dying(health);
		var pl_healthy = M_playerHealth.healthy(health);
		var pl_veryHealthy = M_playerHealth.veryHealthy(health);
		
		if (type == "Player") {
			pl_notThreat = M_playerThreat.notThreatening(threat);
			pl_threat = M_playerThreat.threatening(threat);
			pl_veryThreat = M_playerThreat.veryThreatening(threat);
			
			pl_dying = M_playerHealth.dying(health);
			pl_healthy = M_playerHealth.healthy(health);
			pl_veryHealthy = M_playerHealth.veryHealthy(health);
		} else if (type == "Payload"){
			pl_notThreat = M_payloadThreat.notThreatening(threat);
			pl_threat = M_payloadThreat.threatening(threat);
			pl_veryThreat = M_payloadThreat.veryThreatening(threat);
			
			pl_dying = M_payloadHealth.dying(health);
			pl_healthy = M_payloadHealth.healthy(health);
			pl_veryHealthy = M_payloadHealth.veryHealthy(health);
		}
		
		var f = Mathf.Min(pl_far, Mathf.Min(pl_threat, pl_healthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_threat, pl_veryHealthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_notThreat, pl_healthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_notThreat, pl_veryHealthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_threat, pl_veryHealthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_notThreat, pl_healthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_notThreat, pl_veryHealthy));
		undesirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_notThreat, pl_veryHealthy));
		undesirableArray.Add(f);
		
		for (var i = 0; i < undesirableArray.Count; i++) {
			if (undesirableArray[i] > undesirableValue) {
				undesirableValue = undesirableArray[i];
			}
		}
		
		return undesirableValue;
	}
	
	function calculateDesirable(distance: float, threat: float, health: float, type: String) : float {
	
		var desirableValue : float = 0;
		var desirableArray = new ArrayList();
		var pl_far = M_distance.far(distance);
		var pl_medium = M_distance.medium(distance);
		var pl_near = M_distance.near(distance);
		
		var pl_notThreat;
		var pl_threat;
		var pl_veryThreat;
		
		var pl_dying = M_playerHealth.dying(health);
		var pl_healthy = M_playerHealth.healthy(health);
		var pl_veryHealthy = M_playerHealth.veryHealthy(health);
		
		if (type == "Player") {
			pl_notThreat = M_playerThreat.notThreatening(threat);
			pl_threat = M_playerThreat.threatening(threat);
			pl_veryThreat = M_playerThreat.veryThreatening(threat);
			
			pl_dying = M_playerHealth.dying(health);
			pl_healthy = M_playerHealth.healthy(health);
			pl_veryHealthy = M_playerHealth.veryHealthy(health);
		} else if (type == "Payload"){
			pl_notThreat = M_payloadThreat.notThreatening(threat);
			pl_threat = M_payloadThreat.threatening(threat);
			pl_veryThreat = M_payloadThreat.veryThreatening(threat);
			
			pl_dying = M_payloadHealth.dying(health);
			pl_healthy = M_payloadHealth.healthy(health);
			pl_veryHealthy = M_payloadHealth.veryHealthy(health);
		}
		
		var f = Mathf.Min(pl_far, Mathf.Min(pl_veryThreat, pl_healthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_veryThreat, pl_veryHealthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_notThreat, pl_dying));
		desirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_veryThreat, pl_healthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_veryThreat, pl_veryHealthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_threat, pl_healthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_notThreat, pl_dying));
		desirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_veryThreat, pl_veryHealthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_threat, pl_healthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_threat, pl_veryHealthy));
		desirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_notThreat, pl_healthy));
		desirableArray.Add(f);
		
		for (var i = 0; i < desirableArray.Count; i++) {
			if (desirableArray[i] > desirableValue) {
				desirableValue = desirableArray[i];
			}
		}
		
		return desirableValue;
	}
	
	function calculateVeryDesirable(distance: float, threat: float, health: float, type: String) : float {
	
		var veryDesirableValue : float = 0;
		var veryDesirableArray = new ArrayList();
		var pl_far = M_distance.far(distance);
		var pl_medium = M_distance.medium(distance);
		var pl_near = M_distance.near(distance);
		
		var pl_notThreat;
		var pl_threat;
		var pl_veryThreat;
		
		var pl_dying = M_playerHealth.dying(health);
		var pl_healthy = M_playerHealth.healthy(health);
		var pl_veryHealthy = M_playerHealth.veryHealthy(health);
		
		if (type == "Player") {
			pl_notThreat = M_playerThreat.notThreatening(threat);
			pl_threat = M_playerThreat.threatening(threat);
			pl_veryThreat = M_playerThreat.veryThreatening(threat);
			
			pl_dying = M_playerHealth.dying(health);
			pl_healthy = M_playerHealth.healthy(health);
			pl_veryHealthy = M_playerHealth.veryHealthy(health);
		} else if (type == "Payload"){
			pl_notThreat = M_payloadThreat.notThreatening(threat);
			pl_threat = M_payloadThreat.threatening(threat);
			pl_veryThreat = M_payloadThreat.veryThreatening(threat);
			
			pl_dying = M_payloadHealth.dying(health);
			pl_healthy = M_payloadHealth.healthy(health);
			pl_veryHealthy = M_payloadHealth.veryHealthy(health);
		}
		
		var f = Mathf.Min(pl_far, Mathf.Min(pl_veryThreat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_far, Mathf.Min(pl_threat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_veryThreat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_medium, Mathf.Min(pl_threat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_veryThreat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_veryThreat, pl_healthy));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_threat, pl_dying));
		veryDesirableArray.Add(f);
		f = Mathf.Min(pl_near, Mathf.Min(pl_notThreat, pl_dying));
		veryDesirableArray.Add(f);
		
		for (var i = 0; i < veryDesirableArray.Count; i++) {
			if (veryDesirableArray[i] > veryDesirableValue) {
				veryDesirableValue = veryDesirableArray[i];
			}
		}
		
		return veryDesirableValue;
	}
}

class PayloadHealthMembership extends Membership{
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function PayloadHealthMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function veryHealthy(x : float) : float {
		return grade(x1, x2, x);
	}
	
	function healthy(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function dying(x : float) : float {
		return revGrade(x0, x1, x);
	}
}

class PlayerHealthMembership extends Membership{
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function PlayerHealthMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function veryHealthy(x : float) : float {
		return grade(x1, x2, x);
	}
	
	function healthy(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function dying(x : float) : float {
		return revGrade(x0, x1, x);
	}
}

class DistanceMembership extends Membership {
	//Fuzzy set for Distance of a target to the AI
	//NOT_THREATENING = revGrade(wpLength/4, wpLength/2)
	//THREATENING = triangle(wpLength/4, wpLength/2, wpLength*3/4)
	//VERY_THREATENING = revGrade(wpLength/2, wpLength*3/4)
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function DistanceMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function near(x : float) : float {
		return revGrade(x0, x1, x);
	}
	
	function medium(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function far(x : float) : float {
		return grade(x1, x2, x);
	}	
}

class PayloadThreatMembership extends Membership {
	//Fuzzy set for Threat level of Payload, based on number of waypoints passed to goal
	//NOT_THREATENING = revGrade(wpLength/4, wpLength/2)
	//THREATENING = triangle(wpLength/4, wpLength/2, wpLength*3/4)
	//VERY_THREATENING = revGrade(wpLength/2, wpLength*3/4)
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function PayloadThreatMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function notThreatening(x : float) : float {
		return revGrade(x0, x1, x);
	}
	
	function threatening(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function veryThreatening(x : float) : float {
		return grade(x1, x2, x);
	}	
}

class DesirabilityMembership extends Membership {
	//Fuzzy set for Desirablitiy
	//UNDESIRABLE = revGrade(25, 50)
	//DESIRABLE = triangle(25, 50, 75)
	//VERY_DESIRABLE = grade(50, 75)
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function DesirabilityMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function undesirable(x : float) : float {
		return revGrade(x0, x1, x);
	}
	
	function desirable(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function veryDesirable(x : float) : float {
		return grade(x1, x2, x);
	}
}

class PlayerThreatMembership extends Membership{
	//Fuzzy set for Threat level of Player, based on current AI's health
	//NOT_THREATENING = grade(myMaxHealth/2, myMaxHealth*3/4)
	//THREATENING = triangle(myMaxHealth/4, myMaxHealth/2, myMaxHealth*3/4)
	//VERY_THREATENING = revGrade(myMaxHealth/4, myMaxHealth/2)
	private var x0 : float;
	private var x1 : float;
	private var x2 : float;
	
	function PlayerThreatMembership(p0: float, p1: float, p2: float) {
		x0 = p0;
		x1 = p1;
		x2 = p2;
	}
	
	function notThreatening(x : float) : float {
		return grade(x1, x2, x);
	}
	
	function threatening(x : float) : float {
		return triangularMem(x0, x1, x2, x);
	}
	
	function veryThreatening(x : float) : float {
		return revGrade(x0, x1, x);
	}
}

class Membership {
	
	function Membership() {

	}
	
	function revGrade(x0: float, x1: float, x: float) : float {
		if (x <= x0) {
			return 1;
		} else if (x >= x1) {
			return 0;
		} else {
			return (-x/(x1 - x0) + x1/(x1 - x0));
		}
	}
	
	function triangularMem(x0: float, x1: float, x2: float, x: float) : float {
		if (x <= x0 || x >= x2) {
			return 0;
		} else if (x == x1) {
			return 1;	
		} else if (x0 < x && x < x1) {
			return (x/(x1 - x0) - x0/(x1 - x0));
		} else {
			return (-x/(x2 - x1) + x2/(x2 - x1));
		}
	}
	
	function grade(x0: float, x1: float, x: float) : float {
		if (x <= x0) {
			return 0;
		} else if (x >= x1) {
			return 1;
		} else {
			return (x/(x1 - x0) - x0/(x1 - x0));
		}
	}
}