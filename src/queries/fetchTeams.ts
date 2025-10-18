// const TEAMS_URL =
// 	"https://api.keukenkampioendivisie.nl/wp-json/statsperform/v1/current-round"

const TEAMS_URL =
	"https://api.keukenkampioendivisie.nl/wp-json/statsperform/v1/round-schedule"

export type TeamInfo = {
	teamName: string
	teamLogo: string
	teamGoals: number
}

type Match = {
	date: string
	awayContestant: {
		contestantClubName: string
		contestantLogo: string
	}
	homeContestant: {
		contestantClubName: string
		contestantLogo: string
	}
	scores?: {
		away?: number
		home?: number
	}
}

type ApiResponse = {
	matches: Match[]
}

export default async function createTeamsInfo(): Promise<TeamInfo[]> {
	const json = await fetchTeams()
	const teamsInfo = await parseTeams(json)
	return teamsInfo
}

const fetchTeams = async function (): Promise<ApiResponse> {
	try {
		const response = await fetch(TEAMS_URL)
		const json = await response.json()
		return json
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error fetching teams: ${error.message}`)
		} else {
			throw new Error(`Error fetching teams: ${String(error)}`)
		}
	}
}

const parseTeams = async function (json: ApiResponse): Promise<TeamInfo[]> {
	// const today = new Date().toISOString().split("T")[0]
	const today = "2025-08-08" // For testing purposes
	const filteredMatches = json.matches.filter(
		(match: Match) => match.date === today
	)

	const teamPropsArray = filteredMatches.flatMap((match: Match) => [
		{
			teamName: match.awayContestant.contestantClubName,
			teamLogo: match.awayContestant.contestantLogo,
			teamGoals: match.scores?.away || 0,
		},
		{
			teamName: match.homeContestant.contestantClubName,
			teamLogo: match.homeContestant.contestantLogo,
			teamGoals: match.scores?.home || 0,
		},
	])
	return teamPropsArray
}
