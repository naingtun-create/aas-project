import LoginPage from './components/LoginPage.vue'
//import HomePage from './components/HomePage.vue'
import SignUpPage from './components/SignUpPage.vue'
import SignUpSuccessful from './components/SignUpSuccessful.vue'
import ResetPassword from './components/ResetPassword.vue'
import ResetSuccessful from './components/ResetSuccessful.vue'
import Register from './components/Register.vue'
import LoginDir from './components/LoginDirectory.vue'

import CompanyPage from './components/company/CompanyPage.vue'
import CompanySignUpPage from './components/company/CompanySignUpPage.vue'
import CompanyLoginPage from './components/company/CompanyLoginPage.vue'
import cIncubator from './components/company/companyIncubator.vue'
import cProductPage from './components/company/companyProductPage.vue'
import cPhysicalStore from './components/company/companyPhysicalStore.vue'
import cOnlineMarketplace from './components/company/companyOnlineMarketplace.vue'

import ShopperLoginPage from './components/shopper/ShopperLoginPage.vue'
import ShopperSignUpPage from './components/shopper/ShopperSignUpPage.vue'
import ProfilePage from './components/shopper/ProfilePage.vue'
import Incubator from './components/shopper/Incubator.vue'
import ProductPage from './components/shopper/ProductPage.vue'
import PhysicalStore from './components/shopper/PhysicalStore.vue'
import OnlineMarketplace from './components/shopper/OnlineMarketplace.vue'
import Payment from './components/shopper/Payment.vue'

export default [
    //{ path: '/', component: HomePage},
    { path: '/', component: LoginDir},
    { path: '/login', component: LoginPage},
    { path: '/companylogin', component: CompanyLoginPage},
    { path: '/shopperlogin', component: ShopperLoginPage},
    { path: '/signup', component: SignUpPage},
    { path: '/companysignup', component: CompanySignUpPage},
    { path: '/shoppersignup', component: ShopperSignUpPage},
    { path: '/profile', component: ProfilePage, meta: {requiresAuth: true}},
    { path: '/signUpSuccessful', component: SignUpSuccessful},
    { path: '/resetpassword', component: ResetPassword},
    { path: '/resetsuccess', component: ResetSuccessful},
    { path: '/register', component: Register},
    { path: '/payment', component: Payment},

    { path: '/shopper/payment', component: Payment},
    { path: '/shopper/physicalstore', component: PhysicalStore},
    { path: '/shopper/onlinemarketplace', component: OnlineMarketplace},
    { path: '/shopper/incubator', component: Incubator},
    { path: '/shopper/product', name: 'product', component: ProductPage, props: true },

    { path: '/companypage', component: CompanyPage},
    { path: '/company/physicalstore', component: cPhysicalStore},
    { path: '/company/onlinemarketplace', component: cOnlineMarketplace},
    { path: '/company/incubator', component: cIncubator},
    { path: '/company/product', name: 'product', component: cProductPage, props: true },
]