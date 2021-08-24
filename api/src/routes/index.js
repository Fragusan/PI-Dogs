const { Router } = require('express');
//no veo en que cambia que tenga o no apikey
const { yek_u } = process.env
//instalo e importo axios
//deberia hacerlo tambien con fetch?
//si queda tiempo
const axios = require('axios');

//traigo mis tablas (queria traer mis modelos )
const { Dog, Temperament } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




//0800 api 
const starterApi = async () => {
    const pathApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${yek_u}`);
    console.log("lo que guarde en la llamada de la API", pathApi)
    //un filtrado de lo que necesito de la api
    // y lo pongo en una constante
    const dataApi = await pathApi.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            temperament: e.temperament,
            life_span: e.life_span.replace("years", "años"),
            Image: e.image.url,
        }
    })
    return dataApi;
}



const starterDB = async () => {
    return await Dog.findAll({
        //con esto podre hacer la relacion
        include: {
            model: Temperament,
            //seteo esto para traer la data de la 2da tabla
            //funciona como un destructuring?
            //https://sequelize.org/master/manual/eager-loading.html
            // 😂 carga anciosa
            //comprobacion
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}


const getUnifying = async () => {
    const startApi = await starterApi();
    const startDB = await starterDB();
    //deberia usar el operador spread?
    const unify = startApi.concat(startDB)

    return unify
}


//════════════════════════════════════════════════════════════════════════════════════════════════



router.get('/dogs', async (req, res) => {
    let raza = req.query.raza;
    let razas = await getUnifying();

    console.log("raza solicitada:", raza)

    if (raza) {
        raza = raza.toUpperCase();

        console.log("antes de filtrar", raza)
        console.log("lo de unificado", razas)
        console.log("termino de cargar razas")

        let razaName = await razas.filter(e => e.name.toUpperCase().includes(raza))
        console.log(razaName)

        if (razaName.length != 0) {
            return res.status(200).json(razaName)
        }

        return res.status(200).send(`No se encontraron coincidencias para el termino ${raza}.\n Intente alguna de las siguientes opciones:\n 🐶 Realizar la busqueda con un termino diferente.\n🐶 O puedes añadir una nueva raza`)
    }
    //deberia mostrar solo id + name de raza?
    // o toda la data junta


    /*  let name = razas.map(e => {
         return {
             id: e.id,
             name: e.name,
         }})
 
     res.status(200).json(name) */


    res.status(200).json(razas)
    // res.status(200).send("cabeza de uncaca, no entra en razas")
});




router.get("/temperament", async (req, res) => {
    const temperamentAPI = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${yek_u}`);
    let transition = []
    let uniqueTemperamentos = []
    const temperament = temperamentAPI.data.map(e => {
        if (e.temperament != undefined) {
            transition.push(e.temperament.split(",")) // /\s+/g
        }
        // let plano = transition.flat(Infinity)
        for (let i = 0; i < transition.length; i++) {
            transition[i].forEach((t => {
                if (!uniqueTemperamentos.includes(t)) {
                    uniqueTemperamentos.push(t)
                }
            })
            )
        }



    })





    console.log("lin128", temperament)
    console.log("lin129", transition)
    console.log("lin136", uniqueTemperamentos)
    console.log("lin140", uniqueTemperamentos.length)

    /* const filtradoTemp = new Set()
    for (let i of temperament){
        filtradoTemp.add(i)
    }
    console.log(filtradoTemp) */

    // let result = [...filtradoTemp]
    // console.log(result)

    res.status(200).json(uniqueTemperamentos)
})

module.exports = router;
