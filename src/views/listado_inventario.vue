<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-4 mt-4">
            <input type="date" id="fecha_search" name="fecha_search" class="form-control" v-model="fecha_search" @change="getListInventario">
        </div>
        <div class="col-4 mt-4">
          <select name="rubros_id" id="rubros" class="form-control" @change="getListInventario">
            <option value="all"> Todos </option>
            <option v-for="elem_rubros in listado_rubros" :value="elem_rubros.id" v-model="rubro_selected">{{elem_rubros.nombre}}</option>
          </select>
        </div>
        <div class="col-4 mt-4">
          <router-link to="/movimientos">
            <button class="btn btn-primary btn-sm float-right mb-3"> Nuevo Movimiento <i class="fas fa-plus"></i> </button>
          </router-link>
        </div>
      </div>
      <div class="table-responsive no-padding ">
        <table class="table table-hover table-bordered">
          <thead>
              <tr>
                <th> Articulo </th>
                <th> Rubro </th>
                <th> Cantidad Restante </th>
              </tr>
          </thead>
          <tbody v-if="listado && listado.data">
            <tr v-for="elem_unico in listado.data" v-if="listado.data">
              <td> 
                {{elem_unico.nombre_articulo}}
              </td>
              <td> 
                {{elem_unico.nombre_rubro}}
              </td>
              <td> 
                {{elem_unico.cantidad}}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr >
              <td colspan="5">
                No se encontraron datos para esta fecha {{fecha_search}} 
              </td>
            </tr> 
          </tbody>
        </table>
        <div class="box-footer clearfix">
          <ul class="pagination pagination-sm no-margin float-right">
            <li v-for="page in pages" v-if="page.url != null " >
              <div v-if="page_selected == page.label">
                <a class="btn btn-default ml-1 select_btn" @click="getData(page.label)"  >{{page.label}}</a>
              </div>
              <div v-else>
                <div v-if=" page.label == 'Next &raquo;'">
                  <a class="btn btn-default ml-1" @click="getData(page_selected+1)" > Siguente </a>
                </div>
                <div v-else>
                  <div v-if=" page.label == '&laquo; Previous'">
                    <a class="btn btn-default ml-1" @click="getData(page_selected-1)" > Anterior </a>
                  </div>
                  <div v-else>
                    <a class="btn btn-default ml-1" @click="getData(page.label)" >{{page.label}}</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import requestLaravel from '@/components/request.vue';

  document.title = "Listado de Movimientos"
  export default {
    mixins:[requestLaravel],
    data: function(){
      return {listado : null,listado_rubros:null,pages:null,page_selected : null,filters:"",fecha_search:null,rubro_selected:"all"}
    },
    methods:{
      getRubros(){
        let ruta = "rubros";
        let vue_instance = this;
        this.attributes = this.getData(ruta,"all").then(function response(response){
          vue_instance.listado_rubros = response.data.data;
        });
      },
      getListInventario(){
        let ruta = "inventory";
        let page = "all";
        let vue_instance = this;
        vue_instance.filters = "";
        if(vue_instance.fecha_search){
          vue_instance.filters = "&fecha="+this.fecha_search;
          console.log(vue_instance.rubro_selected);
          if(vue_instance.rubro_selected){
            vue_instance.filters += "&rubro="+document.getElementById("rubros").value;
          }
        }
        console.log(vue_instance.filters);
        this.attributes = this.getData(ruta,page,vue_instance.filters).then(function response(response){
          console.log("response",response.data.data);
          vue_instance.listado = response.data.data;
        });
      },
    },
    created:function(){
    },
    mounted:function(){
      this.getRubros();
      console.log(this.$base_url);
      let f = new Date();
      let mes = f.getMonth() +1;
      let dia = f.getDate();
      if(mes < 10){
        mes = "0"+mes;
      }
      if(dia < 10){
        dia = "0"+dia;
      }
      this.fecha_search = f.getFullYear() + "-" + (mes) + "-" + dia;
      console.log(this.fecha_search);
      this.getListInventario(1);
      
    }
  }
</script>