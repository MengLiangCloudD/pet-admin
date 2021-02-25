import { TypeListForm} from './actionType';
import { fromJS } from 'immutable';

export const setTypeListForm=(value)=>({
    type:TypeListForm,
    value:fromJS(value)
})
