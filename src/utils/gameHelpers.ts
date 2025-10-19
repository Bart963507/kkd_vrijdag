import type { TeamInfo } from "@/queries/fetchTeams"
import type { Player } from "@/components/context/GameContext"

export interface AssignedTeamInfo extends TeamInfo {
	assigned: boolean
	assignedPlayer: number | null
}

export const assignTeam = function (
	teams: AssignedTeamInfo[],
	player: Player
): {
	teams: AssignedTeamInfo[]
	player: Player
} {
	const team = getRandomTeam(teams)
	team.assignedPlayer = player.id
	team.assigned = true
	player.assignedTeams.push(team)
	return { teams, player }
}

const getRandomTeam = function (teams: AssignedTeamInfo[]) {
	teams = teams.filter((team) => team.assigned !== true)
	const randomTeam = teams[getRandomInt(0, teams.length - 1)]
	randomTeam.assigned = true
	return randomTeam
}

const getRandomInt = function (min: number, max: number): number {
	const minCeil = Math.ceil(min)
	const maxCeil = Math.floor(max)
	const result = Math.floor(Math.random() * (maxCeil - minCeil + 1))
	return result
}
