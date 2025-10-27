import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './composables/useAuth'
import { initializeData } from './composables/useAppData'
import Dashboard from './pages/Dashboard.vue'
import LoginPage from './pages/LoginPage.vue'
import PlansList from './pages/PlansList.vue'
import PatientsList from './pages/PatientsList.vue'
import ExercisesList from './pages/ExercisesList.vue'
import PlanForm from './pages/PlanForm.vue'
import PatientForm from './pages/PatientForm.vue'
import ExerciseForm from './pages/ExerciseForm.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/plans',
    name: 'PlansPage',
    component: PlansList,
    meta: { requiresAuth: true },
  },
  {
    path: '/plans/new',
    name: 'NewPlan',
    component: PlanForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/plans/:id/edit',
    name: 'EditPlan',
    component: PlanForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
    meta: { requiresAuth: true },
  },
  {
    path: '/patients/new',
    name: 'NewPatient',
    component: PatientForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/patients/:id/edit',
    name: 'EditPatient',
    component: PatientForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesList,
    meta: { requiresAuth: true },
  },
  {
    path: '/exercises/new',
    name: 'NewExercise',
    component: ExerciseForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/exercises/:id/edit',
    name: 'EditExercise',
    component: ExerciseForm,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const { isAuthenticated, initializeAuth } = useAuth()

  // Initialize auth on first load
  initializeAuth()

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
})

export default router
