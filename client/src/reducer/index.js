
const initialState ={
    dogs : []
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload 
            }
            case 'FILTER_BY_TEMPERAMENT':
                const temperament = state.dogs
                const filtradostatus  = action.payload
                return {

                }
            case 'FILTER_BY_USER':
                // const allDog = state.dogs
                const filterUser = action.payload === 'myDog' ? state.allDog?.filter(d => d.flagByUser)
                : state.allDog?.filter(d => !d.flagByUser)
                return {
                    ...state,
                    dogs: filterUser
                }
            case 'FILTER_BY_NAME':
                //es un array
                const filterByName = action.payload === 'as' ? state.dogs.sort(function (p1,p2){
                    return (p1.name > p2.name)? 1
                    :(p2.name > p1.name)? -1
                    : 0
                })
                : state.dogs.sort(function (p1,p2){
                    return (p1.name > p2.name)? -1
                    :(p2.name > p1.name)? 1
                    : 0
                })
            case 'GET_DOG_BY_NAME':
                return {
                    ...state,
                    dogs: action.payload 
                }
            default:
                return state;
    }
}

export default rootReducer;