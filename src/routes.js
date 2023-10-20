
import VueRouter from "vue-router";

import HomeComponent from './components/HomeComponent.vue';

import RegistrationComponent from './components/RegistrationComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import AboutComponent from './components/AboutComponent.vue';
import UserViewComponent from './components/UserViewComponent.vue';
import ViewDataComponent from './components/ViewDataComponent.vue'
//import auth from "./middleware/auth.js";
//import guest from "./middleware/guest.js"


const routes = [
    {
        name: "home",
        path: '/',
        component: HomeComponent,
       
    },
    
    {
        name: "register",
        path: '/register',
        component: RegistrationComponent,
        meta:{
            
            requiresGet: true,
        } 
    },
    {
        name: "login",
        path: '/login',
        component: LoginComponent,
        meta:{
            
            requiresGet: true,
        }
    },
    {
        name: "about",
        path: '/about',
        component: AboutComponent,
        meta:{
            
            requiresAuth: true,
        }
    },
    {
        name: "userview",
        path: '/userview',
        component: UserViewComponent,
        meta:{
        
            requiresAuth: true,
        }
    },
    {
        name:"viewdata",
        path:'/user/:id',
        component: ViewDataComponent,
        meta:{
            requiresAuth:true,
        }
    }

];

const router = new VueRouter({
    routes
});
router.beforeEach((to,from,next) =>{
    const isloggedIn =parseInt(localStorage.getItem('isLogin')?? "0");
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!isloggedIn){
            next ({
                path: '/login',
                query:{ redirect: to.fullPath }
            })
        }
        else{
            next()
        }
    }
    else if(to.matched.some(record => record.meta.requiresGet)){
        if(isloggedIn){
            next ({
                path:'/',
            })
        }
        else{
            next()
        }
    }
    else{
        next()
    }
})
export default router;