<template>
  <div class="content-wrapper mt-5">
    <div class="container">
      <div class="section" v-show="view_cabecera">
        <h4> Cabecera </h4>
        <div class="row mb-5" >
          <div class="col-3">
            <label for=""> Fecha </label>
            <input class="form-control" type="date" name="fecha_cabecera" id="fecha_cabecera" v-model="fecha_selected" value="fecha_selected"> 
            <p class="text-danger float-left pt-2" v-show="msg_err.fecha_cabecera"> {{msg_err.fecha_cabecera}}</p>
          </div>
          <div class="col-3">
            <label for=""> Accion </label>
              <select name="accion_cabecera" id="accion_cabecera" class="form-control" v-model="accion_cabecera">
                <option value="Compra" selected> Comprar </option>
                <option value="Venta"> Vender </option>
              </select>
              <p class="text-danger float-left pt-2" v-show="msg_err.accion_cabecera"> {{msg_err.accion_cabecera}}</p>
          </div>
          <div class="col-3">
            <label for=""> N° Comprobante </label>
            <input class="form-control" type="text" name="nro_comprobante" id="nro_comprobante" v-model="nro_comprobante" > 
            <p class="text-danger float-left pt-2" v-show="msg_err.nro_comprobante"> {{msg_err.nro_comprobante}}</p>
          </div>
          <div class="col-2 mt-4 pt-2">
            <button class="btn btn-primary" @click="CreateCabecera" > Crear Cabecera </button>
          </div>
        </div>
      </div>
      <div class="section" v-show="view_body">
        <h4> Cuerpo </h4>
        <div class="row mb-5" >
          <div class="col-4">
            <label for=""> Productos </label>
              <select name="productos" id="productos" class="form-control">
                <option v-for="elem_unico in listado_productos" v-if="listado_productos" :value="elem_unico.id" :data-set="elem_unico.precio" :data-max_stock="elem_unico.stock_max" :data-min_stock="elem_unico.stock_min"> {{elem_unico.nombre}} </option>
              </select>
          </div>
          <div class="col-4">
            <label for=""> Cantidad </label>
            <input class="form-control" type="number" name="cantidad_seleccionada" id="cantidad_seleccionada" v-model="cantidad_selected">
            <p class="text-danger float-left pt-2" v-show="msg_err.cantidad"> {{msg_err.cantidad}}</p>
          </div>
          <div class="col-2 mt-4 pt-2">
            <button class="btn btn-success" @click="AddProduct"> <i class="fas fa-plus"> </i></button>
          </div>
        </div>
      </div>
      <div v-show="view_factura">
        <div leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color:#ffffff;  max-width:22cm; height: 27.3cm; font-family: Helvetica,Arial,sans-serif !important; margin-bottom: 40px; position: relative;">
          <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="width:100%; background-color:#ffffff;border-collapse:separate !important; border-spacing:0;color:#242128; margin:0;padding:30px; padding-top: 20px;" heigth="auto">
            <tbody>
              <tr>
                <td align="left" valign="center" style="padding-bottom:20px;border-top:0;max-width:100% !important;">
                  <img src="../assets/logo.png" style="max-width:160px !important;" />
                </td>
                <td align="right" valign="center" style="padding-bottom:20px;border-top:0;width:100% !important;">
                  <p style="color: #8f8f8f; font-weight: normal; line-height: 1.2; font-size: 12px; white-space: nowrap; ">
                    {{nombre_compania}}<br> {{direccion}} <br>{{Telefono}}
                    </p>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding-top:30px; border-top:1px solid #f1f0f0">
                  <table style="width: 100%;">
                    <tbody>
                      <tr>
                        <td style="vertical-align:middle; border-radius: 3px; padding:30px; background-color: #f9f9f9; border-right: 5px solid white;">
                          <p style="color:#303030; font-size: 14px;  line-height: 1.6; margin:0; padding:0;">
                            {{accion_cabecera}}
                          </p>
                        </td>
                        <td style="text-align: right; padding-top:0px; padding-bottom:0; vertical-align:middle; padding:30px; background-color: #f9f9f9; border-radius: 3px; border-left: 5px solid white;">
                          <p style="color:#8f8f8f; font-size: 14px; padding: 0; line-height: 1.6; margin:0; ">
                            Factura N° {{no_factura}}<br>
                            {{fecha_selected}}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table style="width: 100%; margin-top:40px;">
                    <thead>
                      <tr>
                        <th style="text-align:center; font-size: 12px; color:#8f8f8f; padding-bottom: 15px;">
                          Articulos
                        </th>
                        <th style="text-align:center; font-size: 12px; color:#8f8f8f; padding-bottom: 15px;">
                          Cantidad
                        </th>
                        <th style="text-align:right; font-size: 12px; color:#8f8f8f; padding-bottom: 15px;">
                          Precio Unitario
                        </th>
                        <th style="text-align:right; font-size: 12px; color:#8f8f8f; padding-bottom: 15px;">
                          Precio Total
                        </th>
                        <th style="text-align:right; font-size: 12px; color:#8f8f8f; padding-bottom: 15px;">

                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="elem_selected in productos_selected" >
                        <td style="padding-top:0px; padding-bottom:5px;">
                          <h4 style="font-size: 16px; line-height: 1; margin-bottom:0; color:#303030; font-weight:500; margin-top: 10px;">
                          {{elem_selected.nombre}}</h4>
                        </td>
                        <td>
                          <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1; color:#909090; margin-top:0px; margin-bottom:0;">
                          {{elem_selected.cantidad}}</p>
                        </td>
                        <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                          <p style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">$
                          {{elem_selected.p_unitario}}</p>
                        </td>
                        <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                          <p style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">$
                          {{elem_selected.p_total}}</p>
                        </td>
                        <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                          <button @click="EliminarArticulo(elem_selected.indice)" class="btn btn-danger btn-xs"> <i class="fas fa-times"> </i></button>
                        </td>
                      </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>      
        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="position:absolute; bottom:0; width:100%; background-color:#ffffff;border-collapse:separate !important; border-spacing:0;color:#242128; margin:0;padding:30px; padding-top: 20px;"
            heigth="auto">
          <tr>
              <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
          </tr>
            <tr>
              <td colspan="2" style="width: 100%">
                  <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                      Subtotal : </p>
              </td>
              <td style="padding-top:0px; text-align: right;">
                  <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">$
                      {{precio_subtotal}}</p>
              </td>
            </tr>
              
              <tr>
                <td colspan="2" style=" width: 100%; padding-bottom:15px;">
                    <p href="#" style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                        <strong>Total : </strong></p>
                </td>
                <td style="padding-top:0px; text-align: right; padding-bottom:15px;">
                    <p style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px"><strong>$
                            {{precio_total}}</strong></p>
                </td>
              </tr>
              <tr>
                <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
              </tr>

              <tr>
                <td colspan="3" style="text-align:center;">
                </td>
            </tr>
        </table>
      </div>
      <div class="d-flex justify-content-end">
        <div class="fixed-bottom" style="left: 75vw!important; bottom: 1vh!important;">
          <button class="btn btn-primary " @click="CreateFactura"> <i class="fas fa-plus"></i> Crear Factura </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import axios from 'axios';
  import requestLaravel from '@/components/request.vue';
  
  document.title = "Movimientos";
  export default {
    mixins:[requestLaravel],
    data: function(){
      return {
      nombre_compania:"TradeMarketSA",
      direccion:"NA",
      Telefono:"",
      fecha_selected:"",
      no_factura:1,
      precio_subtotal:0,
      precio_total:0,
      listado_productos:null,
      accion_cabecera:"Compra",
      nro_comprobante : "",
      productos_selected:new Array(),
      cantidad_selected:"",
      cabecera:"",
      view_cabecera : true,
      view_body : false,
      view_factura : false,
      indice : 0,
      max_element : 19,
      msg_err : {}

    }
    },
    methods:{
      GetArticulos(page){
        let ruta = "products";
        let vue_instance = this;
        let attributes = this.getData(ruta,page).then(function response(response){
          
          console.log(response.data.data);
          vue_instance.listado_productos = response.data.data;
        });
      },
      AddProduct(){
        let result = true;
        document.getElementById("cantidad_seleccionada").classList.remove("is-invalid")
        
        
          if(this.max_element <= this.productos_selected.length){
            swal({
                title: "Se llego al Máximo de articulos para una factura!",
                text: "",
                icon: "error",
                button: "Ok",
            });
          }
          let product = {}, productos_all = document.getElementById("productos"), nombre_prod_actual = "" , precio_prod_actual = 0, p_total = 0, max_permitido = 0, min_permitido = 0
          
          max_permitido = parseInt(productos_all.options[productos_all.selectedIndex].getAttribute("data-max_stock")); 
          min_permitido = parseInt(productos_all.options[productos_all.selectedIndex].getAttribute("data-min_stock"));
          precio_prod_actual = productos_all.options[productos_all.selectedIndex].getAttribute("data-set");
          if(this.cantidad_selected < min_permitido){
            document.getElementById("cantidad_seleccionada").classList.add("is-invalid");
            this.msg_err.cantidad = " La cantidad seleccionada es menor a la minima ";
            result = false;
          }

          if(this.cantidad_selected > max_permitido){
            document.getElementById("cantidad_seleccionada").classList.add("is-invalid");
            this.msg_err.cantidad = " La cantidad seleccionada es mayor al Máximo permitido ";
            result = false;
          }
          if(result){
            nombre_prod_actual = productos_all.options[productos_all.selectedIndex].text;
            p_total = parseFloat(precio_prod_actual) * this.cantidad_selected;
            product = {product_id:productos_all.options[productos_all.selectedIndex].value,nombre:nombre_prod_actual,p_unitario:precio_prod_actual,cantidad:this.cantidad_selected,p_total : p_total , indice:this.indice}; 
            this.indice++;
            this.precio_subtotal = parseFloat(this.precio_subtotal) + parseFloat(p_total);
            this.precio_total = parseFloat(this.precio_total) + parseFloat(p_total);
            this.productos_selected.push(product);
            this.cantidad_selected = null;
            this.msg_err.cantidad = '';
            if(!this.view_factura){
              this.view_factura = true;
            }
          }
        },
      CreateCabecera(){
        let result = true;
        if(!this.accion_cabecera){
          document.getElementById("accion_cabecera").classList.add("is-invalid");
          this.msg_err.accion_cabecera = " Debe elegir una accion ";
          result = false;
        }else{
          document.getElementById("accion_cabecera").classList.add("is-valid");
        }

        if(!this.fecha_selected){
          document.getElementById("fecha_cabecera").classList.add("is-invalid");
          this.msg_err.fecha_cabecera = " Debe elegir una Fecha ";           
          result = false;

        }else{
          document.getElementById("fecha_cabecera").classList.add("is-valid");
        }
        if(result){
          this.cabecera = {accion : this.accion_cabecera, fecha : this.fecha_selected,nro_comprobante : this.nro_comprobante}; 
          this.view_cabecera= false;
          this.view_body= true;
        }
      },
      CreateFactura(){
        let objectSend = {}
        objectSend.cabecera = this.cabecera;
        objectSend.cuerpo = this.productos_selected;
        console.log(objectSend);
        axios.post('http://127.0.0.1:8000/api/inventory/', objectSend)
          .then((res) => {
            swal({
              title: "Se creo el comprobante correctamente!",
              text: "",
              icon: "success",
              button: "Ok",
            }).then((value) => {
              window.location.reload();
            });
          })
          .catch((error) => {
            swal({
              title: "Hubo problemas para crear su comprobante, reintente luego!",
              text: error.response.data.message.error,
              icon: "error",
              button: "Ok",
            })
          }).finally(() => {
            
        });
      },
      EliminarArticulo(ident){
        this.productos_selected.splice(ident,1);
      }
    },
    mounted:function(){
      this.GetArticulos("all");
      document.getElementsByClassName("main-sidebar sidebar-dark-primary")[0].setAttribute("style","height:38.3cm!important;");
    },
    created:function(){
      let f = new Date();
      let mes = f.getMonth() +1;
      if(mes < 10){
        mes = "0"+mes;
      }
      this.fecha_selected = f.getFullYear() + "-" + (mes) + "-" + f.getDate();
    }
  }
</script> 