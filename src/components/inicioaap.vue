<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a  class="brand-link">
      <img src="../assets/logo.png" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-dark" style="color:white; font-weight:800;">{{project_name}}</span>
    </a>


    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../assets/logo.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info text-center">
          <a>{{name_user}}</a>
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
              <span>Listado Productos</span>
            </a>
          </li>
        </router-link>
        <router-link to="/listadorubros">
          <li class="nav-item">
            <a href="listados" class="nav-link text-left">
              <i class="fas fa-sitemap mr-3"></i> <span>Listado Rubros</span>
            </a>
          </li>
        </router-link>
        <router-link>
          <li class="nav-item">
            <a href="listados" class="nav-link text-left">
              <i class="fas fa-boxes mr-3"></i>
              <span>Inventario</span>
            </a>
          </li>
        </router-link>
        </ul>
      </nav>
    </div>
  </aside>
  
</template>

<script>
export default {
  name: 'inicioaap',
  props: {
    name_user: String,project_name:String,img_logo:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
