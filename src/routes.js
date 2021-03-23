import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'
import SignUpPage from './components/SignUpPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import PhysicalStore from './components/PhysicalStore.vue'
import OnlineMarketplace from './components/OnlineMarketplace.vue'
import Incubator from './components/Incubator.vue'
import SignUpSuccessful from './components/SignUpSuccessful.vue'
import ResetPassword from './components/ResetPassword.vue'
import ResetSuccessful from './components/ResetSuccessful.vue'
import CompanyPage from './components/CompanyPage.vue'

export default [
    { path: '/', component: HomePage},
    { path: '/login', component: LoginPage},
    { path: '/signup', component: SignUpPage},
    { path: '/profile', component: ProfilePage},
    { path: '/physicalstore', component: PhysicalStore},
    { path: '/onlinemarketplace', component: OnlineMarketplace},
    { path: '/incubator', component: Incubator},
    { path: '/signUpSuccessful', component: SignUpSuccessful},
    { path: '/resetpassword', component: ResetPassword},
    { path: '/resetsuccess', component: ResetSuccessful},
    { path: '/companypage', component: CompanyPage}
]