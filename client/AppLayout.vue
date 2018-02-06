<template>
  <div >
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @click="handleSelect"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="home" @click="handleHome">Home</el-menu-item>
            <el-menu-item index="Students" @click="handleFrom">Student</el-menu-item>
            <el-menu-item index="Products" @click="handleProduct">Product</el-menu-item>
            <el-menu-item index="Sales" @click="handleSale">Sale</el-menu-item>
            <el-menu-item index="Customers" @click="handleCustomer">Customer</el-menu-item>
        </el-menu>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Students'}">Students</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Products'}">Products</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Sales'}">Sales</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Customers'}">Customers</el-breadcrumb-item>
            <el-breadcrumb-item>Dak Leng</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data(){
      return {
          activeIndex: "home",
      };
  },
  methods:{
      handleSelect(key, keyPath){
          //console.log(key)
          this.$router.push({name:key})
      },
      handleHome(){
          this.$router.push({name: 'home'});
      },
      handleFrom(){
          this.$router.push({name: 'Students'});
      },
      handleProduct(){
          this.$router.push({name: 'Products'});
      },
      handleSale(){
          this.$router.push({name: 'Sales'});
      },
      handleCustomer(){
          this.$router.push({name: 'Customers'});
      }
  }
}
</script>

<style>
.el-menu-demo{
    background-color: rgb(0, 20, 51)
}
</style>
