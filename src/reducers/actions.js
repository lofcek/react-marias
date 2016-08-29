export const TOURNAMENT_CHANGE = 'TOURNAMENT_CHANGE';
export const PLAYER_CHANGE = 'PLAYER_CHANGE';
export const PLAYER_APPEND = 'PLAYER_APPEND';

export function playerChange(index, player) {
    return {
        type: 'PLAYER_CHANGE',
        payload: {index, player}
    }
}

export function playerAppend(name, club) {
    return {
        type: 'PLAYER_APPEND',
        player: {name, club}
    }
}

export function tournamentChange(name, date) {
    return {
        type: 'TOURNAMENT_CHANGE',
        payload: {tournament: {name, date}}
    }
}