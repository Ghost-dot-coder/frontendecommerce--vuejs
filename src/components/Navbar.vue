<template>
  <v-app-bar app color="white" dark elevation="2" class="mb-5">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title class="font-weight-bold" style="color:black;">
      MyShop
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$router.push('/')">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon @click="$router.push('/orders')">
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn icon @click="$router.push('/cart')">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn icon @click="$router.push('/account')">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
// No additional logic needed here; navigation handled by router push
</script>

<style scoped>
.v-app-bar {
  position: sticky !important;
  top: 0;
  z-index: 11;
}
</style>
