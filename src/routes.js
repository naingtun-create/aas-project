import ResetPassword from './components/ResetPassword.vue'
import LoginDir from './components/LoginDirectory.vue'

import CompanyPage from './components/company/CompanyPage.vue'
import CompanyProducts from './components/company/CompanyProducts.vue'
import CompanyActivities from './components/company/CompanyActivities.vue'
import CompanyOrders from './components/company/CompanyOrders.vue'
import CompanySignUpPage from './components/company/CompanySignUpPage.vue'
import CompanyLoginPage from './components/company/CompanyLoginPage.vue'
import cForum from './components/company/CompanyForum.vue'
import cProductPage from './components/company/CompanyProductPage.vue'
import cPhysicalStore from './components/company/CompanyPhysicalStore.vue'
import cOnlineMarketplace from './components/company/CompanyOnlineMarketplace.vue'

import ShopperLoginPage from './components/shopper/ShopperLoginPage.vue'
import ShopperSignUpPage from './components/shopper/ShopperSignUpPage.vue'
import ShopperPurchaseHistory from './components/shopper/ShopperPurchaseHistory.vue'
import ProfilePage from './components/shopper/ProfilePage.vue'
import Forum from './components/shopper/Forum.vue'
import ProductPage from './components/shopper/ProductPage.vue'
import PhysicalStore from './components/shopper/PhysicalStore.vue'
import OnlineMarketplace from './components/shopper/OnlineMarketplace.vue'
import Payment from './components/shopper/Payment.vue'
import ViewCompanyPage from './components/shopper/CompanyPageView.vue'


export default [
    { path: '/login', component: LoginDir},
    { path: '/', component: LoginDir},
    { path: '/companylogin', component: CompanyLoginPage},
    { path: '/shopperlogin', component: ShopperLoginPage},
    { path: '/companysignup', component: CompanySignUpPage},
    { path: '/shoppersignup', component: ShopperSignUpPage},
    { path: '/resetpassword', component: ResetPassword},
    { path: '/payment', component: Payment},

    { path: '/shopper/profile', component: ProfilePage, meta: {requiresAuth: true}},
    { path: '/shopper/payment', component: Payment},
    { path: '/shopper/physicalstore', component: PhysicalStore},
    { path: '/shopper/onlinemarketplace', component: OnlineMarketplace},
    { path: '/shopper/forum', component: Forum},
    { path: '/shopper/product/:id', name: 'product', component: ProductPage, props: true },
    { path: '/shopper/purchasehistory', component: ShopperPurchaseHistory},
    { path: '/shopper/viewcompany/:id', name: 'viewCompanyPage', component: ViewCompanyPage, props: true },

    { path: '/company/companypage', component: CompanyPage},
    { path: '/company/companyproducts', component: CompanyProducts},
    { path: '/company/companyactivities', component: CompanyActivities},
    { path: '/company/companyactivities', component: CompanyActivities},
    { path: '/company/companyorders', component: CompanyOrders},
    { path: '/company/physicalstore', component: cPhysicalStore},
    { path: '/company/onlinemarketplace', component: cOnlineMarketplace},
    { path: '/company/forum', component: cForum},
    { path: '/company/product/:id', name: 'companyProduct', component: cProductPage, props: true },
    
]