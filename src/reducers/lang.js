import * as Actions from './actions'
//var en = require('../localization/english.json)); 
import * as eng from '../localization/english.json';
import * as svk from '../localization/slovak.json'

//import Immutable from 'immutable'
console.log(eng);
export const en = Object.assign({}, eng, {lang: 'en'})
export const sk = Object.assign({}, svk, {lang: 'sk'})

export const availableLang = [en, sk]

const initialState = sk;
export default function langReducer(state = initialState, action) {
    console.log(state);
    switch(action.type) {
    case Actions.CHANGE_LANG:
        let lang = availableLang.find(l => l.lang === action.payload.lang);
        if (lang) return lang;
        return state
    default:
        return state
    }
}