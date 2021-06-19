<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-8"></div>
        <div class="col-4 mt-4">
          <router-link to="/rubros/new">
            <button class="btn btn-primary btn-sm float-right mb-3"> Crear Rubro <i class="fas fa-plus"></i> </button>
          </router-link>
        </div>
      </div>
      <div class="table-responsive no-padding ">
        <table class="table table-hover table-bordered">
          <thead>
              <tr>
                <th> Id </th>
                <th> Nombre </th>
                <th> Edición </th>
              </tr>
          </thead>
          <tbody v-if="listado && listado.data">
            <tr v-for="elem_unico in listado.data" v-if="listado.data">
              <td> 
                {{elem_unico.id}}
              </td>
              <td> 
                {{elem_unico.nombre}}
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="Editar(elem_unico.id)">  <i class="fas fa-edit"></i> </button>
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

  document.title = "Listado de Rubros";
  export default {
    mixins:[requestLaravel],
    data: function(){
      return {listado : null,listado_rubros:null,pages:null,page_selected : null}
    },
    methods:{
      getRubros(){
        let ruta = "rubros";
        let vue_instance = this;
        this.attributes = this.getData(ruta,"all").then(function response(response){
          vue_instance.listado_rubros = response.data.data;
        });
      },
      getListInventario(page = 1, filter){
        let ruta = "inventory";
        let vue_instance = this;
        this.attributes = this.getData(ruta,page,filter).then(function response(response){
          vue_instance.listado_rubros = response.data.data;
        });
      },
    },
    mounted:function(){
      console.log(this.$base_url);
      this.getRubros(1);
    }
  }
</script>