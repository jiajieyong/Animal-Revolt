#pragma strict

private var ai : BossAI;

function Start () {
	ai = GetComponentInParent(BossAI);
}

function Update () {

}

function ApplyDamage(damage: int){
   	ai.dealDamage(damage);
}