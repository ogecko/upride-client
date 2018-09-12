import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios'

export default ({ Vue }) => {
    // create the feathers REST client, based on Axios
    const api = feathers();
    api.configure(rest().axios(axios));

    // make it easy to access
    Vue.prototype.$api = api
}
