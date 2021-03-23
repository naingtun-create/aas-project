import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'
import SignUpPage from './components/SignUpPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PhysicalStore from './components/PhysicalStore.vue'
import OnlineMarketplace from './components/OnlineMarketplace.vue'
import Incubator from './components/Incubator.vue'
import ProductPage from './components/ProductPage.vue'

export default [
    { path: '/', component: HomePage},
    { path: '/login', component: LoginPage},
    { path: '/signup', component: SignUpPage},
    { path: '/profile', component: ProfilePage},
    { path: '/physicalstore', component: PhysicalStore},
    { path: '/onlinemarketplace', component: OnlineMarketplace},
    { path: '/incubator', component: Incubator},
    { path: '/product', name: 'product', component: ProductPage, props: true },
]