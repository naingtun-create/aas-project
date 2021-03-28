import LoginPage from './components/LoginPage.vue'
import CompanyLoginPage from './components/CompanyLoginPage.vue'
import ShopperLoginPage from './components/ShopperLoginPage.vue'
import CompanySignUpPage from './components/CompanySignUpPage.vue'
import ShopperSignUpPage from './components/ShopperSignUpPage.vue'
//import HomePage from './components/HomePage.vue'
import SignUpPage from './components/SignUpPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PhysicalStore from './components/PhysicalStore.vue'
import OnlineMarketplace from './components/OnlineMarketplace.vue'
import Incubator from './components/Incubator.vue'
import ProductPage from './components/ProductPage.vue'
import SignUpSuccessful from './components/SignUpSuccessful.vue'
import ResetPassword from './components/ResetPassword.vue'
import ResetSuccessful from './components/ResetSuccessful.vue'
import CompanyPage from './components/CompanyPage.vue'
import Register from './components/Register.vue'
import LoginDir from './components/LoginDirectory.vue'
import Payment from './components/Payment.vue'


export default [
    //{ path: '/', component: HomePage},
    { path: '/', component: LoginDir},
    { path: '/login', component: LoginPage},
    { path: '/companylogin', component: CompanyLoginPage},
    { path: '/shopperlogin', component: ShopperLoginPage},
    { path: '/signup', component: SignUpPage},
    { path: '/companysignup', component: CompanySignUpPage},
    { path: '/shoppersignup', component: ShopperSignUpPage},
    { path: '/profile', component: ProfilePage, meta: { requiresAuth: true}},
    { path: '/physicalstore', component: PhysicalStore},
    { path: '/onlinemarketplace', component: OnlineMarketplace},
    { path: '/incubator', component: Incubator},
    { path: '/product', name: 'product', component: ProductPage, props: true },
    { path: '/signUpSuccessful', component: SignUpSuccessful},
    { path: '/resetpassword', component: ResetPassword},
    { path: '/resetsuccess', component: ResetSuccessful},
    { path: '/companypage', component: CompanyPage},
    { path: '/register', component: Register},
    { path: '/payment', component: Payment},
]