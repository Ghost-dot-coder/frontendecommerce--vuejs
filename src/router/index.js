import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../pages/ProductList.vue'
import ProductDetailPage from '../pages/ProductDetailPage.vue'

const routes = [
  { path: '/', component: ProductList },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetailPage }

]
const router = createRouter({ history: createWebHistory(), routes })
export default router
