import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs',{})
        
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}

export function filterByTemperament(){
    return async function (dispatch){
        var temp = await axios("http://localhost:3001/temperament",{

        })
        return dispatch({
            type: 'FILTER_BY_TEMPERAMENT',
            payload: temp.data
        }) 
        
    }
}

export function posNewDog(payload){
    return async function (dispatch){
        const respuesta = await axios.post("http://localhost:3001/dog", payload);
        console.log("SOY POST:", respuesta)
    }
}

export function filterDogByUser(payload){
    return {
        type: "FILTER_BY_USER",
        payload
    }

}

export function filterByName(payload){
    return{
        type: 'FILTER_BY_NAME',
        payload
    }
}

export function searchNameDog(payload){
    return async function (dispatch){
        try {
            var json = await axios(`http://localhost:3001/dogs?raza=${payload}`)
            return dispatch({
                type: 'GET_DOG_BY_NAME',
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}