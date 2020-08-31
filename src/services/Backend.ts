import axios from 'axios';
const config = require('../config.json');


function getRegistrs(): Promise<Record<string, string>[]> {
    return new Promise(async (resolve, reject) => {
        console.log(`obteniendo registros...`);
        axios.get(config.url+'/registros')
            .then((res: { data: Record<string, any>[]; }) => {
                console.log(`registros obtenidos correctamente`);
                resolve(res.data)
            })
            .catch(reject)
    })
}

