import { geetlist} from './actionType';
import { fromJS } from 'immutable';

export const setList=(value)=>({
    type:geetlist,
    value:fromJS(value)
})
