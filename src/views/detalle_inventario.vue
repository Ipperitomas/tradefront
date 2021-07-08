<template>
  <div class="content-wrapper">
    <div class="container">
        <div class="row mt-4">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                      <th> Fecha </th>
                      <th> N° Comprobante </th>
                      <th> Tipo Movimiento </th>
                      <th> Producto </th>
                      <th> Precio Unitario </th>
                      <th> Cantidad </th>
                      <th> Total </th>
                    </tr>
                </thead>
                <tbody v-if="datos">
                  <tr v-for="elem_unico in datos" v-if="datos">
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
                        {{elem_unico.nombre_articulo}}
                    </td>
                    <td> 
                        {{elem_unico.precio}}
                    </td>
                    <td> 
                        {{elem_unico.cantidad}}
                    </td>
                    <td> 
                        {{elem_unico.p_total}}
                    </td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import requestLaravel from '@/components/request.vue';
  document.title = "Ver detalle";
  export default {
    mixins:[requestLaravel],

    data: function(){
      return {datos:""}
    },
    methods:{
      GetDetalleCabeceraById(){
        let ruta = "inventory";
        let vue_instance = this;
        let rsp = this.getDataById(ruta,vue_instance.id_cabeza).then(function response(response){
          console.log(response.data.data);
            vue_instance.datos = response.data.data;
        });
      },
      
    },
    mounted:function(){
      this.id_cabeza = this.$route.params.id;
      this.GetDetalleCabeceraById();
    }
  }
</script>