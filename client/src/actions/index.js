import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs', {})

        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}

export function filterByTemperament() {
    return async function (dispatch) {
        const respuesta = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: 'FILTER_BY_TEMPERAMENT',
            payload: respuesta.data
        });

    }
}

export function posNewDog(payload) {
    return async function (dispatch) {
        const respuesta = await axios.post("http://localhost:3001/dog", payload);
        console.log("SOY POST:", respuesta)
        return {
            type: 'POST_NEW_DOG',
            respuesta
        }
    }
}

    export function filterDogByUser(payload) {
        return {
            type: "FILTER_BY_USER",
            payload
        }

    }

    export function filterTemp(payload){
        console.log("temperament:",payload)
        return{
            type: 'FILTER_TEMP',
            payload
        }
    }

    export function filterByName(payload) {
        return {
            type: 'FILTER_BY_NAME',
            payload
        }
    }

    export function filterByW8(payload) {
        return {
            type: 'FILTER_BY_WEIGHT',
            payload
        }
    }

    export function searchNameDog(payload) {
        return async function (dispatch) {
            try {
                var json = await axios(`http://localhost:3001/dogs?raza=${payload}`)
                return dispatch({
                    type: 'GET_DOG_BY_NAME',
                    payload: json.data
                })
            } catch (error) {
                console.log("No se encontraron coincidencias para el termino")
            }
        }
    }

    export function dogDetails(id){
        return async function(dispatch){
            try{
                var json = await axios(`http://localhost:3001/dogs/${id}`)
                return dispatch ({
                    type: 'DETAIL',
                    payload: json.data
                })
            } catch(error){
                console.log("Esta fallando la ruta de detalle", error)
            }
        }
    }
