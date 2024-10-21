import * as types from './ActionType';
import axios from 'axios';


const getItems = (items) => ({
    type: types.GET_ITEMS,
    payload: items,
});

const itemDeleted = () => ({
    type: types.DELETE_ITEM,
});

const itemAdded = () => ({
    type: types.ADD_ITEM,
});

const getItem = (item) => ({
    type: types.GET_SINGLE_ITEM,
});

// const updateItemSuccess = () => ({
//     type: types.UPDATE_ITEM,
//   });

export const loadItems = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`) 
            .then((res) => {
                console.log('res', res);
                dispatch(getItems(res.data));
            })
            .catch(error => console.log(error));
    }
}

export const deleteItem = (id) => {
    return function (dispatch) {
        console.log('Delete item with ID:', id); 
        axios.delete(`${process.env.REACT_APP_API}/${id}`) 
            .then((res) => {
                console.log('res', res);
                dispatch(itemDeleted());
                dispatch(loadItems());
            })
            .catch(error => console.log(error));
    }
}

export const addItem = (item) => {
    return function (dispatch) {
        
        axios.post(`${process.env.REACT_APP_API}`, item) 
            .then((res) => {
                console.log('res', res);
                dispatch(itemAdded());
                dispatch(loadItems());
            })
            .catch(error => console.log(error));
    }
}

export const getSingleItem = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`) 
            .then((res) => {
                console.log('res', res);
                dispatch(getItem(res.data));
            })
            .catch(error => console.log(error));
    }
}


// export const updateItem = (item) => {
//     return async (dispatch) => {
//       try {
//         const response = await axios.put(`${process.env.REACT_APP_API}/${item.id}`, item);
//         dispatch({
//           type: 'UPDATE_ITEM',
//           payload: response.data,  
//         });
//         dispatch(updateItemSuccess());
//       } catch (error) {
//         console.error('Error updating item:', error);
//       }
//     };
//   };
  
  export const updateItem = (item) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API}/${item.id}`, item);
        dispatch({
          type: 'UPDATE_ITEM',
          payload: response.data,
        });
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
  };