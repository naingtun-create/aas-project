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
<<<<<<< HEAD
import CompanyPage from './components/CompanyPage.vue'
=======
import Register from './components/Register.vue'

>>>>>>> 599618cf2b5f82460fe6a2a2e565fb48449516d1

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
<<<<<<< HEAD
    { path: '/companypage', component: CompanyPage}
=======
    { path: '/register', component: Register},
>>>>>>> 599618cf2b5f82460fe6a2a2e565fb48449516d1
]