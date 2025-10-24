<template>
  <v-container fluid class="product-layout-bg pa-0">
    <v-row justify="center" class="py-8">
      <v-col cols="12" md="10">
        <v-row class="product-flex-row" no-gutters>
          <!-- Left Side: Product Image -->
          <v-col cols="12" md="5" class="px-8 d-flex align-center justify-center left-img-side">
            <v-img
              :src="product.imageUrl"
              height="320"
              width="100%"
              class="main-img"
              cover
            />
          </v-col>

          <!-- Right Side: Info, Actions, Panels -->
          <v-col cols="12" md="7" class="px-10 py-6 product-info-side">
            <!-- Title and Tags -->
            <div class="d-flex align-center justify-space-between mb-3">
              <h2 class="product-title">{{ product.name }}</h2>
              <div class="d-flex align-center">
                <v-chip v-if="product.isDiscounted" color="info" class="discount-tag mx-2" size="small">
                  30% OFF
                </v-chip>
                <v-icon v-if="product.isFavorite" color="red" size="26">mdi-heart</v-icon>
              </div>
            </div>
            <div class="d-flex align-center mb-5">
              <span class="product-price">AED {{ product.price }}</span>
              <v-text-field
                v-model.number="quantity"
                type="number"
                min="1"
                dense
                hide-details
                style="max-width:64px"
                class="mx-2"
              />
              <v-select
                v-model="unit"
                :items="unitOptions"
                dense
                hide-details
                style="max-width:110px"
                class="mx-2"
              />
              <v-btn color="primary" class="cart-btn ml-5" @click="addToCart" elevation="2">
                Add to Cart
              </v-btn>
            </div>
            <!-- Panels, stacked under details row -->
            <v-expansion-panels multiple class="prod-panels my-3">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon color="success" class="mr-2">mdi-chat</v-icon>
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
                  <v-icon color="blue" class="mr-2">mdi-information</v-icon>
                  Product Details
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ product.careInstructions || 'No care instructions available.' }}
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon color="grey" class="mr-2">mdi-file-document</v-icon>
                  Know your Product
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ product.description || 'No description available.' }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Related Products Section -->
    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="10">
        <h3 class="related-label mb-2">Related Products</h3>
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="rel in relatedProducts" :key="rel.id">
            <v-card class="related-card mx-2 mb-2" width="180" @click="goToDetail(rel.id)" outlined>
              <v-img :src="rel.imageUrl" height="110" width="100%" class="related-img" cover />
              <div class="text-center">
                <div class="font-weight-bold text-body-2 mt-2">{{ rel.name }}</div>
                <div class="font-weight-semibold mb-1" style="color:#0c56a4;">
                  AED {{ rel.price }}
                </div>
                <v-btn color="primary" text small @click.stop="goToDetail(rel.id)">
                  Select Option
                </v-btn>
              </div>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref({
  imageUrl: '', name: '', price: 0, careInstructions: '', description: '', isDiscounted: false, isFavorite: false,
})
const relatedProducts = ref([])
const quantity = ref(1)
const unit = ref('Pcs')
const unitOptions = ['Pcs', 'Carton']

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5154/api/products/${route.params.id}`)
    product.value = { ...data, isDiscounted: data.isDiscounted || false, isFavorite: data.isFavorite || false }
    const relatedRes = await axios.get(`http://localhost:5154/api/products/${route.params.id}/related`)
    relatedProducts.value = Array.isArray(relatedRes.data) ? relatedRes.data : []
  } catch (err) { console.error('Error fetching product or related:', err) }
}
onMounted(fetchProduct)

function goToDetail(id) { router.push({ name: 'ProductDetail', params: { id } }) }
function addToCart() { alert("Item added to cart") }
function chatWithUs() {}
</script>

<style scoped>
.product-layout-bg {
  background: #f1f2f6;
  min-height: 100vh;
}
.product-flex-row {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(50,90,180,0.09);
  border: 1.5px solid #eef1f4;
  overflow: hidden;
}
.left-img-side {
  background: #fff;
  border-right: 2px solid #f0f0f0;
  min-height: 350px;
}
.main-img {
  border-radius: 10px;
  background: #fff;
  border: 1.2px solid #f0f0f4;
  object-fit: contain !important;
}
.product-info-side {
  background: #fff;
}
.product-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #25292f;
}
.discount-tag {
  font-size: 1rem;
  font-weight: 600;
}
.product-price {
  font-size: 1.22rem;
  color: #e35c13;
  font-weight: 700;
  margin-right: 16px;
}
.cart-btn {
  font-weight: bold;
  letter-spacing:0.01em;
  border-radius: 8px;
  min-width: 115px;
}
.prod-panels {
  border-radius: 8px;
  background: #f8fafd;
  border: 1.2px solid #e0e1f4;
}
.related-label {
  font-size: 1.12rem;
  color: #184574;
  font-weight: 600;
}
.related-card {
  border-radius: 12px;
  min-height: 210px;
  box-shadow: 0 2px 13px rgba(120,148,220,.08);
  border: 1.2px solid #e3e4e5;
  background: #fff;
  cursor: pointer;
  transition: box-shadow .18s;
}
.related-card:hover {
  box-shadow: 0 8px 34px rgba(60,120,220,0.09);
}
.related-img {
  border-radius: 8px 8px 0 0;
  background: #fff;
  object-fit: contain !important;
}
@media (max-width: 900px) {
  .product-flex-row { flex-direction: column; }
  .left-img-side { border-right:none; border-bottom:2px solid #f0f0f0; }
  .product-info-side { padding: 20px !important; }
}
</style>
