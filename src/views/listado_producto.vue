<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-2 mb-4">
          <label for=""> Buscar Por</label>
            <select class="form-control" id="filter_selected" name="filter_selected" v-model="filter_selected" @change="MovePlace">
              <option value="id" selected> Id </option>
              <option value="nombre"> Nombre </option>
              <option value="codigo"> Codigo </option>
            </select>
        </div>
        <div class="col-6 mt-4">
          <div class="input-group mb-3">
            <!--  -->
            <input type="text" class="form-control" :placeholder="place_holder" id="busqueda" name="busqueda" v-model="busqueda" @keyup="GetArticulo(page_selected)" >
            <div class="input-group-append">
              <button class="btn btn-primary float-right " @click="GetArticulo(page_selected)"> <i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
        <div class="col-4 mt-4">
          <router-link to="/productos/new">
              <button class="btn btn-primary btn-sm float-right mb-3"> Crear Producto <i class="fas fa-plus"></i> </button>
          </router-link>
        </div>
      </div>
      <div class="table-responsive no-padding ">
        <table class="table table-hover table-bordered">
          <thead>
              <tr>
                <th> Id </th>
                <th> Nombre </th>
                <th> Codigo </th>
                <th> Rubro </th>
                <th> Precio </th>
                <th> Min. Stock </th>
                <th> Max. Stock </th>
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
                {{elem_unico.codigo}}
              </td>
              <td> 
                {{elem_unico.nombre_rubro}}
              </td>
              <td> 
                {{elem_unico.precio}}
              </td>
              <td> 
                {{elem_unico.stock_min}}
              </td>
              <td> 
                {{elem_unico.stock_max}}
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="Editar(elem_unico.id)">  <i class="fas fa-edit"></i> </button>
              </td>
              <td>
                <button class="btn btn-danger btn-sm" @click="Eliminar(elem_unico.id)">  <i class="fas fa-times"></i> </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <td colspan="8"> No se encontraron Productos </td>
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
  
  import requestLaravel from '@/components/request.vue';
  document.title = "Listado de Productos";

  export default {
    mixins:[requestLaravel],
    data: function(){
      return {listado : null,pages:null,page_selected : null,attributes:null,filters:"",busqueda:null,filter_selected:"id",place_holder:"",ruta:"products"}
    },
    methods:{
      GetArticulo(page,filter = ""){
        let ruta = "products";
        let vue_instance = this;
        vue_instance.filters = "";
        if(this.busqueda){
          vue_instance.filters = "&"+this.filter_selected+"="+this.busqueda;
        }
        
        this.attributes = this.getData(ruta,page,vue_instance.filters).then(function response(response){
          vue_instance.listado = response.data.data;
          vue_instance.pages = response.data.data.links;
          vue_instance.page_selected = page;
        });
      },
      Editar(product_id){
        console.log(product_id);
        if(product_id){
          window.location.href = window.location.origin+"/productos/edit/"+product_id;
        }
      },
      MovePlace(){
        this.place_holder = "Buscar por "+this.filter_selected+" de Producto";
      },
      Eliminar(article_id){
        let vue_instance = this;
        swal({
          title: "¿ Estas Seguro de eliminar este Articulo ?",
          text: "Si eliminas este Articulo , sera imposible recuperarlo luego!",
          icon: "warning",
          buttons: ['Cancelar','Eliminar'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.attributes = this.DeleteById(this.ruta,article_id).then(function response(response){
              console.log(response);
              vue_instance.listado = response.data.data;
              vue_instance.pages = response.data.data.links;
              vue_instance.page_selected = vue_instance.page_selected;
            });
          }
        });
      }
    },
    mounted:function(){
      this.GetArticulo(1);
      this.place_holder = "Buscar por "+this.filter_selected+" de Producto";
      
    },
    components:{
      // requestLaravel
    }
  }
</script>