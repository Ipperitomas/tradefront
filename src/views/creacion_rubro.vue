<template>
  <div class="content-wrapper">
    <div class="container">
      <form id="form_new_rubro" name="form_new_rubro"  @submit.prevent="CreateRubro">
        <div class="row pt-5">
          <div class="col-4"></div>
          <div class="col-4">
            <label for=""> Nombre del rubro </label>
            <input type="text" class="form-control" name="nombre" id="nombre">
          </div>
        </div>
        <button class="btn btn-primary float-right mt-1" v-on:submit="CreateRubro"> Crear Rubro </button>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  document.title = "Crear Rubros";
  export default {
    data: function(){
      return {form:null}
    },
    methods:{
      CreateRubro(){
        
        this.form = this.RecolectarDatos();
        console.log(this.form);
        axios.post('http://127.0.0.1:8000/api/rubros/', this.form)
          .then((res) => {
            swal({
              title: "Se creo el rubro correctamente!",
              text: "",
              icon: "success",
              button: "Ok",
            }).then((value) => {
              window.location.href = window.location.origin+"/listadorubros";
            });
          })
          .catch((error) => {
            swal({
              title: "Hubo problemas para crear su rubro, reintente luego!",
              text: error.response.data.message.error,
              icon: "error",
              button: "Ok",
            })
          }).finally(() => {
            
          });
      },
      RecolectarDatos(){
        var valores = null;
        var formulario = document.getElementById("form_new_rubro");
        valores = {
          "nombre":formulario.nombre.value,
        }
        return valores;
      }
    },
    mounted:function(){
      
    }
  }
</script>