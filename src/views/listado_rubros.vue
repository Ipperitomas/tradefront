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
                <th> Eliminar </th>
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
              <td>
                <button class="btn btn-danger btn-sm" @click="Eliminar(elem_unico.id)">  <i class="fas fa-times"></i> </button>
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
      return {listado : null,pages:null,page_selected : null,ruta:"rubros"}
    },
    methods:{
      getRubros(page = 1){
        
        let vue_instance = this;
        this.attributes = this.getData(this.ruta,page).then(function response(response){
          vue_instance.listado = response.data.data;
          vue_instance.pages = response.data.data.links;
          vue_instance.page_selected = page;
        });
      },
      Editar(rubro_id){
        console.log(rubro_id);
        if(rubro_id){
          window.location.href = window.location.origin+"/rubros/edit/"+rubro_id;
        }
      },
      Eliminar(rubro_id){
        let vue_instance = this;
        swal({
          title: "¿ Estas Seguro de eliminar este rubro ?",
          text: "Si eliminas este rubro, sera imposible recuperarlo luego!",
          icon: "warning",
          buttons: ['Cancelar','Eliminar'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.attributes = this.DeleteById(this.ruta,rubro_id).then(function response(response){
              vue_instance.listado = response.data.data;
              vue_instance.pages = response.data.data.links;
              vue_instance.page_selected = page;
            });
          }
        });
      }
    },
    mounted:function(){
      console.log(this.$base_url);
      this.getRubros(1);
    }
  }
</script>