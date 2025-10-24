<template>
  <v-container>
    <v-row>
      <!-- Sidebar Filters -->
      <v-col cols="12" md="3">
        <FilterSidebar
          :filters="filters"
          :categoryOptions="categoryOptions"
          :minPrice="minPrice"
          :maxPrice="maxPrice"
        />
      </v-col>
      <!-- Product Cards/Grid -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in pageProducts"
            :key="product.id"
            cols="12" sm="6" md="4"
          >
            <ProductCard
              :product="product"
              @click="goToDetail"
              @add-to-cart="addToCart"
            />
          </v-col>
        </v-row>
        <!-- Pagination & Page Size Controls -->
        <v-pagination
          v-model="pagination.page"
          :length="totalPages"
          class="mt-4"
        />
        <v-select
          v-model="pagination.pageSize"
          :items="[10, 20, 50]"
          label="Page Size"
          class="mt-4"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import FilterSidebar from '../components/FilterSidebar.vue'
import ProductCard from '../components/ProductCard.vue'


// --- Reactive State ---
const products = ref([])

const filters = ref({
  search: '',
  category: '',
  priceRange: [0, 200]
})
const categoryOptions = ref([])
const minPrice = ref(0)
const maxPrice = ref(200)

const pagination = ref({
  page: 1,
  pageSize: 10
})

// --- Navigation ---
const router = useRouter()
function goToDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } })
}
function addToCart(product) {
  // handle cart logic, alert, etc.
}

// --- Data Fetch ---
const fetchProducts = async () => {
  try {
    const { data } = await axios.get('http://localhost:5154/api/products')
    products.value = data
    if (data.length) {
      minPrice.value = Math.min(...data.map(p => p.price))
      maxPrice.value = Math.max(...data.map(p => p.price))
      filters.value.priceRange = [minPrice.value, maxPrice.value]
      categoryOptions.value = ['All', ...new Set(data.map(p => p.category))]
    }
  } catch (err) {
    console.error('Error fetching products:', err)
  }
}
onMounted(fetchProducts)

// --- Filtering ---
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch =
      !filters.value.search ||
      p.name.toLowerCase().includes(filters.value.search.toLowerCase())
    const matchesCategory =
      !filters.value.category ||
      filters.value.category === 'All' ||
      p.category === filters.value.category
    const matchesPrice =
      p.price >= filters.value.priceRange[0] &&
      p.price <= filters.value.priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })
})

// --- Pagination ---
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / pagination.value.pageSize))
)
const pageProducts = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize
  return filteredProducts.value.slice(start, start + pagination.value.pageSize)
})

// --- Reset page on filter/page size change
watch([
  () => filters.value.search,
  () => filters.value.category,
  () => filters.value.priceRange,
  () => pagination.value.pageSize
], () => pagination.value.page = 1)
</script>
