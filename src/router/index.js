import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import swal from 'sweetalert';
import axios from 'axios';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/listadosprod',
    name: 'Listado de productos',
    component: () => import(/* webpackChunkName: "listadosprod" */ '../views/listado_producto.vue')
  },
  {
    path: '/listadorubros',
    name: 'Listado de rubros',
    component: () => import(/* webpackChunkName: "listado_rubros" */ '../views/listado_rubros.vue'),
  },
  {
    path: '/productos/new',
    name: 'Nuevo Producto',
    component: () => import(/* webpackChunkName: "creacion_producto" */ '../views/creacion_producto.vue')
  },
  {
    path: '/productos/edit/:id',
    name: 'Editar Producto',
    component: () => import(/* webpackChunkName: "creacion_producto" */ '../views/edicion_producto.vue')
  },
  {
    path: '/rubros/new',
    name: 'Nuevo Producto',
    component: () => import(/* webpackChunkName: "creacion_producto" */ '../views/creacion_rubro.vue')
  },
  
  {
    path: '/movimientos',
    name: '',
    component: () => import(/* webpackChunkName: "creacion_producto" */ '../views/movimientos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
