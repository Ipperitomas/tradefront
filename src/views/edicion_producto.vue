<template>
  <div class="content-wrapper">
    <div class="container">
      <form id="form_new_product" name="form_new_product" @submit.prevent="EditProduct">
        <div class="row">
          <div class="col-3">
            <label for=""> Nombre </label>
            <input type="text" class="form-control" name="nombre" id="nombre" v-model="datos.nombre">
          </div>
          <div class="col-3">
            <label for=""> Codigo </label>
            <input type="text" class="form-control" name="codigo" id="codigo" v-model="datos.codigo">
          </div>
          <div class="col-3">
            <label for=""> Precio </label>
            <input type="text" class="form-control" name="precio" id="precio" v-model="datos.precio">
          </div>
          <div class="col-3">
            <label for=""> Rubro </label>
            <select name="rubro_id" id="rubro_id" class="form-control">
              <option v-for="elem_unico in listado_rubros.data" selected v-model="datos.rubro_id" :value="elem_unico.id">{{elem_unico.nombre}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for=""> Stock Minimo </label>
            <input name="stock_minimo" id="stock_minimo" class="form-control" v-model="datos.stock_min">
          </div>
          <div class="col-3">
            <label for=""> Stock Maximo </label>
            <input name="stock_maximo" id="stock_maximo" class="form-control" v-model="datos.stock_max">
          </div>
          <div class="col-3">
            <label for=""> Descripcion </label>
            <textarea name="descripcion" id="descripcion" v-model="datos.descripcion" cols="30" rows="10" class="form-control" value=""></textarea>
          </div>
          <div class="col-3">
            <label for=""> Caracteristicas </label>
            <textarea name="caracteristicas" id="caracteristicas"  v-model="datos.caracteristicas" cols="30" rows="10" class="form-control" value=""></textarea>
          </div>
        </div>
        <button class="btn btn-primary float-right mt-2" v-on:submit="EditProduct"> Guardar Producto </button>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import requestLaravel from '@/components/request.vue';
  document.title = "Editar Producto";
  export default {
    mixins:[requestLaravel],

    data: function(){
      return {
        listado_rubros : null,
        form : null,
        id_product:null,
        datos:{
          nombre:null,
          codigo:null,
          precio:null,
          rubro_id:null,
          descripcion:null,
          caracteristicas:null,
        }
      }
    },
    methods:{
      GetRubros(){
        let ruta = "rubros";
        let vue_instance = this;
        let rsp = this.getData(ruta,"all").then(function response(response){
          vue_instance.listado_rubros = response.data.data;
        });
      },
      GetProductById(){
        let ruta = "products";
        let vue_instance = this;
        let rsp = this.getDataById(ruta,vue_instance.id_product).then(function response(response){
          vue_instance.datos = response.data.data;
          document.getElementById("rubro_id").value = vue_instance.datos.rubro_id;
        });
      },
      EditProduct(){
        this.form = this.RecolectarDatos();
        console.log(this.form);
        let vue_instance = this;
        let ruta = 'products/'+this.id_product;
        console.log(ruta);
        this.Save(ruta,vue_instance.form).then(function response(response){
          swal({
              title: "Se modifico el Producto correctamente!",
              text: "",
              icon: "success",
              button: "Ok",
            }).then((value) => {
              // window.location.href = window.location.origin+"/listadosprod";
            });
        }).catch((error) => 
        {
          swal({
              title: "Hubo problemas para modificar su producto, reintente luego!",
              text: "",
              icon: "error",
              button: "Ok",
            })
        });
      },
      RecolectarDatos(){
        var valores = null;
        var formulario = document.getElementById("form_new_product");
        valores = {
          "nombre":formulario.nombre.value,
          "codigo":formulario.codigo.value,
          "precio":formulario.precio.value,
          "stock_min":formulario.stock_minimo.value,
          "stock_max":formulario.stock_maximo.value,
          "rubro_id":formulario.rubro_id.value,
          "descripcion":formulario.descripcion.value,
          "caracteristicas":formulario.caracteristicas.value,
        }
        return valores;
      }
    },
    mounted:function(){
      this.GetRubros();
      this.id_product = this.$route.params.id;
      this.GetProductById();
    }
  }
</script>