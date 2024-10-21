import * as types from './ActionType';

const initialSate = {
    items: [],
    item: {},
    loading: true,
}

const shoppingListReducer= (state = initialSate, action) =>{
switch(action.type){
    case types.GET_ITEMS:
        return {
            ...state,
            items: action.payload,
            loading: false,
        }
    case types.DELETE_ITEM:
    case types.ADD_ITEM:
        return {
            ...state,
            loading: false,
        }
    case types.GET_SINGLE_ITEM:
        return {
            ...state,
            user: action.payload,
            loading: false,
        }
    case types.UPDATE_ITEM:
        return {
             ...state,
              loading: false,
        };
    default:
        return state;
}
};

export default shoppingListReducer