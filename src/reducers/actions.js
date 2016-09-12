export const TOURNAMENT_CHANGE = 'TOURNAMENT_CHANGE';
export const PLAYER_CHANGE = 'PLAYER_CHANGE';
export const CHANGE_LANG = 'CHANGE_LANG'
export const ACTIVE_SCREEN_CHANGE = 'ACTIVE_SCREEN_CHANGE';
export const MAKE_FIXED_DRAW = 'MAKE_FIXED_DRAW';
export const MONEY_CHANGE = 'MONEY_CHANGE';

export const ACTIVE_SCREEN_TOUR = 'ACTIVE_SCREEN_TOUR';
export const ACTIVE_SCREEN_PLAYERS = 'ACTIVE_SCREEN_PLAYERS';
export const ACTIVE_SCREEN_DRAW = 'ACTIVE_SCREEN_DRAW';
export const ACTIVE_SCREEN_ROUNDS = 'ACTIVE_SCREEN_ROUNDS';
export const ACTIVE_SCREEN_STANDINGS = 'ACTIVE_SCREEN_STANDINGS';


export function playerChange(index, player) {
  return {
    type: PLAYER_CHANGE,
    payload: { index, player }
  }
}

export function tournamentChange(dict) {
  return {
    type: TOURNAMENT_CHANGE,
    payload: dict
  }
}

export function activeScreenChange(screen) {
  return {
    type: ACTIVE_SCREEN_CHANGE,
    payload: screen 
  }
}

export function changeLang(lang) {
  return {
    type: CHANGE_LANG,
    payload: { lang }
  }
}

export function makeFixedDraw(round, numPlayers) {
  return {
    type: MAKE_FIXED_DRAW,
    payload: {
      round,
      numPlayers
    }
  }
}

export function moneyChange(round, table, player, money) {
  return {
    type: MONEY_CHANGE,
    payload: {
      round,
      table,
      player,
      money
    }
  }
}