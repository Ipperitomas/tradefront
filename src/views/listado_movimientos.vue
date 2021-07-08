<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-8 mt-4">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Buscar Por N° de Comprobante" id="busqueda" name="busqueda" v-model="busqueda" @keyup="getListInventario(page_selected,'&busqueda='+busqueda)" >
            <div class="input-group-append">
              <button class="btn btn-primary float-right " @click="getListInventario(page_selected,'&busqueda='+busqueda)"> <i class="fas fa-search"></i></button>
            </div>
          </div>
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
                <th> Id </th>
                <th> Fecha </th>
                <th> N° Comprobante </th>
                <th> Tipo Movimiento </th>
                <th> Ver Detalle </th>
              </tr>
          </thead>
          <tbody v-if="listado && listado.data">
            <tr v-for="elem_unico in listado.data" v-if="listado.data">
              <td> 
                {{elem_unico.id}}
              </td>
              <td> 
                {{elem_unico.fecha}}
              </td>
              <td> 
                {{elem_unico.nro_comprobante}}
              </td>
              <td> 
                {{elem_unico.tipo_accion}}
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="Ver(elem_unico.id)">  <i class="fas fa-eye"></i> </button>
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
      return {listado : null,listado_rubros:null,pages:null,page_selected : null,busqueda:null}
    },
    methods:{
      getRubros(){
        let ruta = "rubros";
        let vue_instance = this;
        this.attributes = this.getData(ruta,"all").then(function response(response){
          vue_instance.listado_rubros = response.data.data;
        });
      },
      getListInventario(page = 1, filter = ""){
        let ruta = "inventory/heads";
        let vue_instance = this;
        this.attributes = this.getData(ruta,page,filter).then(function response(response){
          vue_instance.listado = response.data.data;
          vue_instance.page_selected = page;
        });
      },
      Ver(id){
        window.location.href = window.location.origin+"/inventario/ver/"+id;

      }
    },
    mounted:function(){
      console.log(this.$base_url);
      this.getListInventario(1);
    },
  }
</script>