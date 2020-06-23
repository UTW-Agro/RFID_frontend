import axios from 'axios';
import store from "../store";
const config = require('../config.json');


function loggin(user:string, pass:string): Promise<Record<string, string>> {
    return new Promise(async (resolve, reject) => {
        axios.get(config.url+'/login', {
            params: {
                user: user,
                pass: pass
            }
        })
            .then((res: { data: Record<string, string>; }) => {
                resolve(res.data)
            })
            .catch(reject)
    })
}


// function getParcelas(): Promise<Record<string, any>[]> {
//     return new Promise(async (resolve, reject) => {
//         console.log(`obteniendo parcelas...`);
//         axios.get(config.url+'/parcelas')
//             .then((res: { data: Record<string, any>[]; }) => {
//                 console.log(`parcelas obtenidas correctamente`);
//                 resolve(res.data)
//             })
//             .catch(reject)
//     })
// }

