import { toyService } from "../../services/toyService"

export function loadToys(filterBy) { // Action Creator
    return async (dispatch) => {
        const toys = await toyService.query(filterBy)
        const action = {
            type: 'SET_TOYS',
            toys
        }
        dispatch(action)
    }
}
export function removeToy(toyId) {
    return async (dispatch) => {
        await toyService.removeToy(toyId)
        const action = {
            type: 'REMOVE_TOY',
            toyId
        }
        dispatch(action)

    }
}
export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'SET_FILTER',
            filterBy
        }
        dispatch(action)
    }
}
export function setMsg(msg) {
    console.log('msg',msg);
    return (dispatch) => {
        let action = {
            type: 'SET_MSG',
            msg
        }
        dispatch(action)
        setTimeout(()=>{
            action={
                type:'CLEAR_MSG'
            }
            dispatch(action)
        },2000)
    }
}
export function clearMsg() {
    return (dispatch) => {
        const action = {
            type: 'CLEAR_MSG',
          
        }
        dispatch(action)
    }
}
export function saveToy(toyTosave) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    return  async(dispatch) => {
        const typeRes = (toyTosave._id) ? 'UPDATE_TOY' : 'ADD_TOY'
         const toy =await toyService.save(toyTosave)
    
                const action = {
                    type: typeRes,
                    toy
                }
                dispatch(action)
        
    }
}
