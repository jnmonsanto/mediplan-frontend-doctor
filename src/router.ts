import { createRouter, createWebHistory } from 'vue-router'
import PlansList from './pages/PlansList.vue'
import PatientsList from './pages/PatientsList.vue'
import ExercisesList from './pages/ExercisesList.vue'
import PlanForm from './pages/PlanForm.vue'
import PatientForm from './pages/PatientForm.vue'
import ExerciseForm from './pages/ExerciseForm.vue'

const routes = [
  {
    path: '/',
    name: 'Plans',
    component: PlansList,
  },
  {
    path: '/plans/new',
    name: 'NewPlan',
    component: PlanForm,
  },
  {
    path: '/plans/:id/edit',
    name: 'EditPlan',
    component: PlanForm,
  },
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
  },
  {
    path: '/patients/new',
    name: 'NewPatient',
    component: PatientForm,
  },
  {
    path: '/patients/:id/edit',
    name: 'EditPatient',
    component: PatientForm,
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesList,
  },
  {
    path: '/exercises/new',
    name: 'NewExercise',
    component: ExerciseForm,
  },
  {
    path: '/exercises/:id/edit',
    name: 'EditExercise',
    component: ExerciseForm,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
