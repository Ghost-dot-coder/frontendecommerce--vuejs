<template>
  <div>
    <v-text-field
      v-model="filters.search"
      label="Search"
      clearable
    />

    <v-select
      :items="categoryOptions"
      v-model="filters.category"
      label="Category"
      clearable
    />

    <v-range-slider
      v-model="filters.priceRange"
      :min="minPrice"
      :max="maxPrice"
      step="1"
      thumb-label
      class="mt-4"
    >
      <template #append>
        <div class="text-caption">
          ₹{{ filters.priceRange[0] }} - ₹{{ filters.priceRange[1] }}
        </div>
      </template>
    </v-range-slider>
  </div>
</template>

<script setup>
defineProps({
  filters: Object,
  categoryOptions: Array,
  minPrice: Number,
  maxPrice: Number
})
</script>

<style scoped>
.text-caption { font-size: 0.875rem; color: #555; }
</style>
