export const TOURNAMENT_CHANGE = 'TOURNAMENT_CHANGE';
export const PLAYER_CHANGE = 'PLAYER_CHANGE';
export const ACTIVE_SCREEN_CHANGE = 'ACTIVE_SCREEN_CHANGE';

export const ACTIVE_SCREEN_TOUR    = 'ACTIVE_SCREEN_TOUR';
export const ACTIVE_SCREEN_PLAYERS = 'ACTIVE_SCREEN_PLAYERS';
export const ACTIVE_SCREEN_ROUNDS  = 'ACTIVE_SCREEN_ROUNDS';


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

export function activeScreenChange(screen) {
    return {
        type: 'ACTIVE_SCREEN_CHANGE',
        payload: {screen}
    }
}