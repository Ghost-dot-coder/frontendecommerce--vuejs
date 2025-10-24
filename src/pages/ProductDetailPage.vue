<template>
  <v-container>
    <!-- Product Main Info Section -->
    <v-row>
      <v-col cols="12" md="5">
        <v-img :src="product.imageUrl" aspect-ratio="1.6" class="mb-2 big-img" />
      </v-col>
      <v-col cols="12" md="7">
        <!-- Product Title, Discount/Glyphs -->
        <div class="d-flex align-center justify-space-between mb-3">
          <h2>{{ product.name }}</h2>
          <v-chip v-if="product.isDiscounted" class="discount-chip" color="info">
            30% OFF
          </v-chip>
          <v-icon v-if="product.isFavorite" color="red" class="ml-2">
            mdi-heart
          </v-icon>
        </div>
        <!-- Buying Controls -->
        <div class="product-details">
          <div class="price-row mb-2">
            <span class="price">AED {{ product.price }}</span>
            <v-text-field v-model.number="quantity" type="number" min="1" hide-details style="max-width:74px"
              class="mx-2" />
            <v-select v-model="unit" :items="unitOptions" hide-details style="max-width:120px" class="mx-2" />
          </div>
          <v-btn color="primary" @click="addToCart" class="mb-2">
            Add to Cart
          </v-btn>
        </div>
        <!-- Info Panels -->
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-2" color="success">mdi-chat</v-icon>
              Chat with us
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-btn color="success" outlined @click="chatWithUs">
                Start Chat
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-2" color="blue">mdi-information</v-icon>
              Product Details
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ product.careInstructions || 'No care instructions available.' }}
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-2" color="grey">mdi-file-document</v-icon>
              Know your Product
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ product.description || 'No description available.' }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Related Products Row -->
    <v-row>
      <v-col cols="12">
        <h3 class="mt-7">Related Products</h3>
        <v-slide-group show-arrows class="py-2">
          <v-slide-group-item v-for="rel in relatedProducts" :key="rel.id">
            <v-card class="mx-3" width="210" @click="goToDetail(rel.id)" outlined style="display:inline-block">
              <v-img :src="rel.imageUrl" height="110px"></v-img>
              <v-card-title>{{ rel.name }}</v-card-title>
              <v-card-subtitle>AED {{ rel.price }}</v-card-subtitle>
              <v-btn color="primary" text @click.stop="goToDetail(rel.id)">
                Select Option
              </v-btn>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <div v-if="relatedProducts.length === 0" class="py-5 text-center text-caption grey--text">
          No related products found.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// --- Imports ---
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

// --- Routing ---
const route = useRoute()
const router = useRouter()

// --- State ---
const product = ref({
  imageUrl: '',
  name: '',
  price: 0,
  careInstructions: '',
  description: '',
  isDiscounted: false,
  isFavorite: false,
})
const relatedProducts = ref([])

const quantity = ref(1)
const unit = ref('Pcs')
const unitOptions = ['Pcs', 'Carton']

// --- Data Fetch ---
const fetchProduct = async () => {
  try {
    // Main product info
    const { data } = await axios.get(`http://localhost:5154/api/products/${route.params.id}`)
    product.value = {
      ...data,
      isDiscounted: data.isDiscounted || false,
      isFavorite: data.isFavorite || false,
    }
    // Related products
    const relatedRes = await axios.get(`http://localhost:5154/api/products/${route.params.id}/related`)
    relatedProducts.value = Array.isArray(relatedRes.data) ? relatedRes.data : []
  } catch (err) {
    console.error('Error fetching product or related:', err)
  }
}
onMounted(fetchProduct)

// --- Methods ---
function goToDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } })
}
function addToCart() {
  alert("item added to cart")
}
function chatWithUs() {
  // Open chat dialog or send message
}
</script>

<style scoped>
.big-img {
  border-radius: 12px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, .07);
}

.discount-chip {
  font-size: 1rem;
  font-weight: 500;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.price {
  font-size: 1.3rem;
  color: #1976D2;
  font-weight: bold;
  margin-right: 10px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
