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

//para poner en mayusculas los nombres
// const upperCase = function (mayus){ return mayus[0].toUpperCase() + mayus.slice(1)}

//aunque sean cadenas separadas
//https://es.stackoverflow.com/questions/111241/como-puedo-hacer-para-que-aparezcan-las-primeras-letras-de-las-palabras-en-mayu
const upperCase = function (mayus){ return mayus.replace(/\b\w/g, l => l.toUpperCase())}




//llenemos la tabla
// const llenartabla = async (req, res) => {
//     const temperamentAPI = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${yek_u}`);
//     let transition = []
//     let uniqueTemperamentos = []
//     const temperament = temperamentAPI.data.map(e => {
//         //no incluyo los undefined
//         // /\s+/g
//         if (e.temperament != undefined) { transition.push(e.temperament.split(",")) }
//         //no se aplanan :/
//         // let plano = transition.flat(Infinity)

//         //iteracion y unicidad de temperamentos
//         for (let i = 0; i < transition.length; i++) {
//             transition[i].forEach((t => {
//                 if (!uniqueTemperamentos.includes(t)) {
//                     uniqueTemperamentos.push(t)
//                 }
//             }))
//         }
//     })

//     //guardar en mi DB
//     uniqueTemperamentos.forEach(t => {
//         Temperament.create({
//             where: { name: t }
//         })
//     })

//     const ttemperament = await Temperament.findAll()

//     // console.log("lin128", temperament)
//     // console.log("lin129", transition)
//     console.log("lin136", uniqueTemperamentos)
//     console.log("lin140", uniqueTemperamentos.length)

//     /* const filtradoTemp = new Set()
//     for (let i of temperament){
//         filtradoTemp.add(i)
//     }
//     console.log(filtradoTemp) */

//     // let result = [...filtradoTemp]
//     // console.log(result)

//     console.log("Las tablas detemperaments fueron pobladas")
//     // res.send(uniqueTemperamentos)
// }
// llenartabla();


//0800 api 
const starterApi = async () => {
    const pathApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${yek_u}`);

    // console.log("lo que guarde en la llamada de la API", pathApi)
    //data

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

//quokka
// console.log(starterApi())


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

console.log(getUnifying())

//════════════════════════════════════════════════════════════════════════════════════════════════



router.get('/dogs', async (req, res) => {
    //con esta regex quito los "%20"
    let raza = req.query.raza //replace(/%20/g, " ");
    let razas = await getUnifying();

    console.log("raza solicitada:", raza)

    if (raza) {
        raza = raza.toUpperCase();

        // console.log("antes de filtrar", raza)
        // console.log("lo de unificado", razas)
        // console.log("termino de cargar razas")

        let razaName = await razas.filter(e => e.name.toUpperCase().includes(raza))
        console.log(razaName)

        if (razaName.length != 0) {
            return res.status(200).json(razaName)
        }

        return res.status(404).send(`No se encontraron coincidencias para el termino ${raza}.\n Intente alguna de las siguientes opciones:\n 🐶 Realizar la busqueda con un termino diferente.\n🐶 O puedes añadir una nueva raza`)
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
        //no incluyo los undefined
        // /\s+/g
        if (e.temperament != undefined) { transition.push(e.temperament.split(",")) }
        //no se aplanan :/
        // let plano = transition.flat(Infinity)

        //iteracion y unicidad de temperamentos
        for (let i = 0; i < transition.length; i++) {
            transition[i].forEach((t => {
                if (!uniqueTemperamentos.includes(t.trim())) {
                    uniqueTemperamentos.push(t.trim())
                }
            }))
        }
    })

    //guardar en mi DB
    uniqueTemperamentos.forEach(t => {
        Temperament.create({
            where: { name: t }
        })
    })

    const ttemperament = await Temperament.findAll()

    // console.log("lin128", temperament)
    // console.log("lin129", transition)

    console.log("lin136", uniqueTemperamentos.sort())
    console.log("lin140", uniqueTemperamentos.length)

    /* const filtradoTemp = new Set()
    for (let i of temperament){
        filtradoTemp.add(i)
    }
    console.log(filtradoTemp) */

    // let result = [...filtradoTemp]
    // console.log(result)

    // res.send(ttemperament)
    res.send(uniqueTemperamentos)
})


router.post("/dog", async (req, res) => {
    //creo que no me olvido ninguno
    let { name, height, weight, temperament,
        life_span, Image, flagByUser } = req.body

        name = upperCase(name)
        console.log(name)

        console.log("body llega:","1",name, "2",height, "3",weight, "4",temperament,
            "5",life_span, "6",Image,"7", flagByUser)

    if (name && height && weight 
        && life_span && flagByUser) {
            
        if (!Image) { Image = "https://i.ibb.co/nCRkqJp/D1.png"; }
        let newdog = await Dog.create(
            {
                name,
                height,
                weight,
                life_span,
                Image,
                flagByUser,
                temperament
            })

        let dbTem = await Temperament.findAll({
            where: { name: temperament }
        })

        newdog.addTemperament(dbTem)
        return res.send("la raza fue añadida de manera satisfactoria")
    }




    res.status(404).send("faltan algunos parametros para la creacion de la raza")
})


router.get("/dogs/:idRaza", async (req,res)=>{
    const {idRaza} = req.params;
    const fullDog = await getUnifying()
    if(idRaza){
        let dogId = await fullDog.filter( p => p.id == idRaza)
        if(dogId.length > 0){return res.json(dogId)}
        return res.status(400).send(`No se encontraron coincidencias con el id:${idRaza}\n Prueba con otros terminos de busqueda`)
    }
})

module.exports = router;
