export const TOURNAMENT_CHANGE = 'TOURNAMENT_CHANGE';
export const PLAYER_CHANGE = 'PLAYER_CHANGE';

export function playerChange(index, player) {
    return {
        type: 'PLAYER_CHANGE',
        payload: {index, player}
    }
}

export function tournamentChange(name, date) {
    return {
        type: 'TOURNAMENT_CHANGE',
        payload: {tournament: {name, date}}
    }
}