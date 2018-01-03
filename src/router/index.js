import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditLink from '@/components/EditLink'
import AddLink from '@/components/AddLink'
import Login from '@/components/Login'
import EmailLogin from '@/components/EmailLogin'
import EmailCreate from '@/components/EmailCreate'
import EmailForgot from '@/components/EmailForgot'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      refirect: '/'
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/email',
      name: 'email',
      component: EmailLogin
    },
    {
      path: '/create',
      name: 'emailcreate',
      component: EmailCreate
    },
    {
      path: '/reset',
      name: 'emailforgot',
      component: EmailForgot
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add',
      name: 'add-new-link',
      component: AddLink,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:id',
      name: 'edit-link',
      component: EditLink,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requires = to.matched.some(record => record.meta.requiresAuth)
  if(requires && !currentUser) next('/')
  else next()
})

export default router
