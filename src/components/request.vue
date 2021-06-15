
<script>
import axios from 'axios';
export default {
    methods : {
        getData(ruta,page = 1){
            let response = {};
            console.log("ruta -> ",ruta);
            return axios.get("http://127.0.0.1:8000/api/"+ruta+"?page="+page).then(function (response){
                response.listado = response.data.data;
                response.pages = response.data.data.links;
                return response;
            }).catch(err => console.error(err));
        },
        getDataById(ruta,id = null){
            let response = {};
            console.log("ruta -> ",ruta);
            return axios.get("http://127.0.0.1:8000/api/"+ruta+"/"+id).then(function (response){
                return response;
            }).catch(err => console.error(err));
        },
        Save(ruta,data){
            let response = {};
            return axios.put('http://127.0.0.1:8000/api/'+ruta+'/', this.form).then(function (response){
                return response;
            }).catch(err => console.log(err));
        }
    },
}
</script>
