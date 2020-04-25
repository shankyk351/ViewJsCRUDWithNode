<template>
<div>
  <div id="app" class="container">
    <img alt="Vue logo" height="60" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router'
  import UniqueId from 'vue-unique-id'
  Vue.use(UniqueId)
  import EmployeeListing from './components/employeeListing.vue'
  import EmployeeForm from './components/employeeForm.vue'
  const routes = [
    {path: '/createEmployee', component: EmployeeForm},
    {path: '/updateEmployee/:id', component: EmployeeForm},
    {path: '/', component: EmployeeListing},
  ];

  Vue.use(VueRouter);

  const router = new VueRouter({
    routes
  })

  export default {
    name: 'App',
    components: {
      
    }, 
    router
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
