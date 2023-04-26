import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const readLinkFilter = (filter) => {
    let le_ble = ''
    let bla_filter = filter
    bla_filter.page ? delete bla_filter.page : {}
    let bla_keys = Object.keys(bla_filter)
    let bla_values = Object.values(bla_filter)
    let bla_pairs = bla_keys.concat(bla_values)
    if (bla_pairs != []) {
        for (let i=0; i< (bla_pairs.length/2); i++){
            let string = `${bla_pairs[i]}=${bla_pairs[i+bla_pairs.length/2]}&`
            le_ble += string
        }
    }
}

export {
    __dirname,
    readLinkFilter
}

