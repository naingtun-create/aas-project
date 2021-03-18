import LoginPage from './components/LoginPage.vue'
import HomePage from './components/HomePage.vue'
import SignUpPage from './components/SignUpPage.vue'
import ProfilePage from './components/ProfilePage.vue'

export default [
    { path: '/', component: HomePage},
    { path: '/login', component: LoginPage},
    { path: '/signup', component: SignUpPage},
    { path: '/profile', component: ProfilePage},
]