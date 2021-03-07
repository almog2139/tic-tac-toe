import { toyService } from "../../services/toyService.js"

const initialState = {
    filterBy: {},
    // todos:todoService.query(),
    toys: [],
    msg:'',
    

}


export function toyReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_TOYS': {

            return { ...state, toys: [...action.toys] }
        }
        case 'SET_MSG': {

            return { ...state, msg: action.msg }
        }
        case 'CLEAR_MSG': {

            return { ...state, msg:null }
        }
        // case 'TOGGLE_ISDONE_TODO':
        //     return { ...state, todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo) }
        case 'ADD_TOY':
            return {
        
                ...state, toys: [...state.toys, action.toy]
            }
        case 'UPDATE_TOY':
            return {...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }
          
      
            
          
        case 'SET_FILTER': {
            return { ...state, filterBy: { ...action.filterBy } }
        }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        
     
        

        default:
            return state
    }
}