import * as Actions from './actions'
import * as eng from '../localization/english.json';
import * as svk from '../localization/slovak.json'

export const en = Object.assign({}, eng, {lang: 'en', pluralForm: n => n===1? 0 : 1})
export const sk = Object.assign({}, eng, svk, {lang: 'sk', pluralForm: n => n===1? 0 : (n<=4 ? 1 : 2)})

export const availableLang = [en, sk]

const initialState = sk;
export default function langReducer(state = initialState, action) {
    switch(action.type) {
    case Actions.CHANGE_LANG:
        let lang = availableLang.find(l => l.lang === action.payload.lang);
        if (lang) return lang;
        return state
    default:
        return state
    }
}