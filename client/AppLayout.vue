<template>
  <div >
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @click="handleSelect"
            background-color="black"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="home" @click="handleHome">Home</el-menu-item>
            <el-menu-item index="Students" @click="handleFrom">Student</el-menu-item>
            <el-menu-item index="Products" @click="handleProduct">Product</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data(){
      return {
          activeIndex: "home"
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
      }
  }
}
</script>
