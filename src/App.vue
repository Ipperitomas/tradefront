<template>
  
  <div id="app">
    <section class="">
      <div id="nav">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <!-- Left navbar links -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
            </li>
          </ul>
      
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <!-- <a class="nav-link btn btn-dark text-light" data-toggle="dropdown" href="#"> <i class="fas fa-door-open"></i> Salir</a> -->
            </li>
          </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary ">
          <a  class="brand-link">
            <img src="assets/logo.png" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-dark" style="color:white; font-weight:800;">Trade Market</span>
          </a>
      
      
          <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex justify-content-center">
              <div class="image">
                <img src="../src/assets/logo.png" class="img-circle elevation-2" alt="User Image">
              </div>
              <div class="info text-center">
                <a></a>
              </div>
            </div>
      
            <!-- Sidebar Menu -->
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" id="nav" data-widget="treeview" role="menu" data-accordion="false">
                <router-link to="/">
                  <li class="nav-item has-treeview">
                    <a href="#" class="nav-link text-left">
                      <i class="nav-icon mr-3 fas fa-tachometer-alt"></i>
                      <span>Inicio</span>
                    </a>
                  </li>
              </router-link>
              <router-link to="/listadosprod">
                <li class="nav-item">
                  <a  class="nav-link text-left">
                    <i class="fas fa-box mr-3"></i>
                    <span>Articulos</span>
                  </a>
                </li>
              </router-link>
              <router-link to="/listadorubros">
                <li class="nav-item">
                  <a href="" class="nav-link text-left">
                    <i class="fas fa-sitemap mr-3"></i> <span>Rubros</span>
                  </a>
                </li>
              </router-link>
              <router-link to="/listadomovimientos">
                <li class="nav-item">
                  <a href="" class="nav-link text-left">
                    <i class="fas fa-cash-register mr-3"></i>
                    <span>Movimientos</span>
                  </a>
                </li>
              </router-link>
              <router-link to="/listadoinventario">
                <li class="nav-item">
                  <a href="" class="nav-link text-left">
                    <i class="fas fa-boxes mr-3"></i>
                    <span>Inventario</span>
                  </a>
                </li>
              </router-link>
              </ul>
            </nav>
          </div>
        </aside>


        <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>  -->
      </div>
    </section>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import inicioaap from '@/components/inicioaap.vue'

export default {
  name: 'inicioaap',
  components: {
    inicioaap
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
