
const initialState ={
    dogs : [],
    allDog : [],
    // allDog2 : [],
    temperament : [],
    details: []

}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDog: action.payload 
            }
            case 'FILTER_BY_TEMPERAMENT':
                // const temperament = state.dogs
                // const filtradostatus  = action.payload
                return {
                    ...state,
                    temperament: action.payload

                }
            case 'FILTER_BY_USER':
                // const allDog = state.dogs
                const filterUser = action.payload === 'myDog' ? state.allDog.filter(d => d.flagByUser)
                : state.allDog.filter(d => !d.flagByUser)
                return {
                    ...state,
                    dogs: action.payload === "Unify" ? state.allDog : filterUser
                }
            case 'FILTER_TEMP':
                const alldog2 = state.dogs
                const filtemp = action.payload === "Todos" ? alldog2
                : alldog2.filter(d => {
                    if(d.temperament !== undefined){
                       if(typeof d.temperament[0] === 'string'){
                        
                       return d.temperament?.includes(action.payload)
                    }
                    let arr = d.temperament?.map(e => e.name)
                    return arr.includes(action.payload) 
                    }
                    
                })

                // const ffiltemp = action.payload === 'Active' ? state.allDog.filter(t =>t.temperament.includes("Active"))
                // : action.payload === 'Clever' ? state.allDog.filter(t =>t.temperament.includes("Clever"))
                // : action.payload === 'Intelligent' ? state.allDog.filter(t =>t.temperament.includes("Intelligent"))
                // :action.payload === 'Playful' ? state.allDog.filter(t =>t.temperament.includes("Playful"))
                // : null
                return { 
                    ...state,
                    dogs: filtemp
                }
            case 'FILTER_BY_NAME':
                //es un array
                const filterByName = action.payload === 'az' ? state.dogs.sort(function (p1,p2){
                    return (p1.name > p2.name)? 1
                    :(p2.name > p1.name)? -1
                    : 0
                })
                : state.dogs.sort(function (p1,p2){
                    return (p1.name > p2.name)? -1
                    :(p2.name > p1.name)? 1
                    : 0
                });
                return {
                    ...state,
                    dogs : filterByName
                }

            case 'FILTER_BY_WEIGHT':
                const filterW8 = action.payload === "mayor" ? state.dogs.sort(function (a, b){
                    let p1= a.weight.split("-")
                    let p2=b.weight.split("-")
                    let prom1= Math.ceil(((parseInt(p1[0]) + parseInt(p1[1])) /2))
                    let prom2= Math.ceil(((parseInt(p2[0]) + parseInt(p2[1])) /2))
                    return prom1 - prom2
                })
                : state.dogs.sort(function (a, b){
                    let p1= a.weight.split("-")
                    let p2=b.weight.split("-")
                    let prom1= Math.ceil(((parseInt(p1[0]) + parseInt(p1[1])) /2))
                    let prom2= Math.ceil(((parseInt(p2[0]) + parseInt(p2[1])) /2))
                    return prom2 - prom1
                })
                return {
                    ...state,
                    dogs: filterW8
                }

            case 'GET_DOG_BY_NAME':
                return {
                    ...state,
                    dogs: action.payload 
                }
                case 'POST_NEW_DOG':
                    return {
                        ...state,
                    }
                case 'DETAIL':
                    return{
                        ...state,
                        details: action.payload
                    }
            default:
                return state;
    }
}

export default rootReducer;