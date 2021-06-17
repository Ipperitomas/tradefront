<template>
  <div class="content-wrapper">
    <div class="container">
      <form id="form_edit_rubro" name="form_edit_rubro"  @submit.prevent="EditRubro">
        <div class="row pt-5">
          <div class="col-4"></div>
          <div class="col-4">
            <label for=""> Nombre del rubro </label>
            <input type="text" class="form-control" name="nombre" id="nombre" v-model="datos.nombre">
          </div>
        </div>
        <button class="btn btn-primary float-right mt-1" v-on:submit="EditRubro"> Editar Rubro </button>
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
        id_rubro:null,
        datos:{
          nombre:null
        }
      }
    },
    methods:{
      GetRubroById(){
        let ruta = "rubros";
        let vue_instance = this;
        let rsp = this.getDataById(ruta,vue_instance.id_rubro).then(function response(response){
          vue_instance.datos = response.data.data;
        });
      },
      EditRubro(){
        this.form = this.RecolectarDatos();
        let vue_instance = this;
        let ruta = 'rubros/'+this.id_rubro;
        console.log(ruta);
        this.Save(ruta,vue_instance.form).then(function response(response){
          swal({
              title: "Se modifico el Rubro correctamente!",
              text: "",
              icon: "success",
              button: "Ok",
            }).then((value) => {
              window.location.href = window.location.origin+"/listadorubros";
            });
        }).catch((error) => 
        {
          
          swal({
              title: "Hubo problemas para modificar su rubro, reintente luego!",
              text: message.error,
              icon: "error",
              button: "Ok",
            })
        });
      },
      RecolectarDatos(){
        var valores = null;
        var formulario = document.getElementById("form_edit_rubro");
        valores = {
          "nombre":formulario.nombre.value,
        }
        return valores;
      }
    },
    mounted:function(){
      this.id_rubro = this.$route.params.id;
      this.GetRubroById();
    }
  }
</script>