<template>
  <div class="content-wrapper">
    <div class="container">
      <form id="form_new_product" name="form_new_product" @submit.prevent="CreateProduct">
        <div class="row">
          <div class="col-3">
            <label for=""> Nombre </label>
            <input type="text" class="form-control" name="nombre" id="nombre">
          </div>
          <div class="col-3">
            <label for=""> Codigo </label>
            <input type="text" class="form-control" name="codigo" id="codigo">
          </div>
          <div class="col-3">
            <label for=""> Precio </label>
            <input type="text" class="form-control" name="precio" id="precio">
          </div>
          <div class="col-3">
            <label for=""> Rubro </label>
            <select name="rubro_id" id="rubro_id" class="form-control">
              <option v-for="elem_unico in listado_rubros.data" :value="elem_unico.id">{{elem_unico.nombre}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for=""> Stock Minimo </label>
            <input name="stock_minimo" id="stock_minimo" class="form-control">
          </div>
          <div class="col-3">
            <label for=""> Stock Maximo </label>
            <input name="stock_maximo" id="stock_maximo" class="form-control">
          </div>
          <div class="col-3">
            <label for=""> Descripcion </label>
            <textarea name="descripcion" id="descripcion" cols="30" rows="10" class="form-control"></textarea>
          </div>
          <div class="col-3">
            <label for=""> Caracteristicas </label>
            <textarea name="caracteristicas" id="caracteristicas" cols="30" rows="10" class="form-control"></textarea>
          </div>
          
        </div>
        <button class="btn btn-primary float-right mt-1" v-on:submit="CreateProduct"> Crear Producto </button>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  document.title = "Crear Productos";
  import requestLaravel from '@/components/request.vue';

  export default {
    data: function(){
      return {listado_rubros : null,pages:null,page_selected : null,form : null,result: true}
    },
    methods:{
      getData(){
        let vue_instance = this;
        axios.get(this.$base_url+"api/rubros/all").then(function (response){
          vue_instance.listado_rubros = response.data;
        })
      },
      CreateProduct(){
        this.form = this.RecolectarDatos();
        console.log(this.form);
        if(this.result){
          axios.post(this.$base_url+'api/products/', this.form)
            .then((res) => {
              swal({
                title: "Se creo el Producto correctamente!",
                text: "",
                icon: "success",
                button: "Ok",
              }).then((value) => {
                window.location.href = window.location.origin+"/listadosprod";
              });
            })
            .catch((error) => {
              console.error(error);
              swal({
                title: "Hubo problemas para crear su producto, reintente luego!",
                text: "",
                icon: "error",
                button: "Ok",
              })
  
            }).finally(() => {
              
          });
        }
      },
      RecolectarDatos(){
        var valores = null;
        
        var formulario = document.getElementById("form_new_product");
        if(formulario.stock_minimo.value > formulario.stock_maximo.value){
          swal({
              title: "El stock minimo no puede superar al maximo!",
              text: "",
              icon: "error",
              button: "Ok",
            });
            this.result = false;
        }
        valores = {
          "nombre":formulario.nombre.value,
          "codigo":formulario.codigo.value,
          "precio":formulario.precio.value,
          "rubro_id":formulario.rubro_id.value,
          "descripcion":formulario.descripcion.value,
          "caracteristicas":formulario.caracteristicas.value,
          "stock_min":formulario.stock_minimo.value,
          "stock_max":formulario.stock_maximo.value,
        }
        return valores;
      }
    },
    mounted:function(){
      this.getData();
      console.log(window.location.origin);
      // window.location.href = +"/listadoprod";

    }
  }
</script>