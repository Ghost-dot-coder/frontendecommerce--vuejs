<template>
  <v-card @click="onClick" class="cursor-pointer">
    <v-img :src="product.imageUrl" height="180px"/>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>₹{{ product.price }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click.stop="addToCart">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  product: Object
})
const emit = defineEmits(['click', 'add-to-cart'])
function onClick() { emit('click', props.product.id) }
function addToCart() { emit('add-to-cart', props.product) }
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
</style>
