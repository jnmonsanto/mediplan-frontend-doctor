<template>
  <MainLayout>
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <router-link
          to="/"
          class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 mb-4"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">
          {{ isEditing ? 'Edit Plan' : 'Create New Plan' }}
        </h1>
      </div>

      <!-- Form -->
      <form
        @submit.prevent="handleSubmit"
        class="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <!-- Patient Selection -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Patient *</label>
          <select
            v-model="formData.patientId"
            required
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          >
            <option value="">Select a patient...</option>
            <option v-for="patient in patients" :key="patient.id" :value="patient.id">
              {{ patient.name }}
            </option>
          </select>
        </div>

        <!-- Exercises Section -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-4">Exercises</label>

          <div
            v-if="formData.exercises.length === 0"
            class="mb-4 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center"
          >
            <p class="text-neutral-600 text-sm">No exercises added yet. Add exercises below.</p>
          </div>

          <div v-else class="mb-4 space-y-3">
            <div
              v-for="(exercise, idx) in formData.exercises"
              :key="idx"
              class="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              <div class="flex-1">
                <p class="font-medium text-neutral-900">
                  {{ exercise.exercise?.name || 'Unknown' }}
                </p>
                <p class="text-sm text-neutral-600">
                  {{ exercise.sets }} sets × {{ exercise.repetitions }} reps
                </p>
              </div>
              <button
                type="button"
                @click="removeExercise(idx)"
                class="rounded-lg p-2 text-neutral-500 hover:bg-white hover:text-red-600 transition-colors"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Add Exercise -->
          <div class="rounded-lg border border-neutral-300 p-4">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <select
                v-model="newExercise.exerciseId"
                class="rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              >
                <option value="">Select exercise...</option>
                <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
                  {{ exercise.name }}
                </option>
              </select>

              <input
                v-model.number="newExercise.sets"
                type="number"
                placeholder="Sets"
                min="1"
                class="rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              />

              <div class="flex gap-2">
                <input
                  v-model.number="newExercise.repetitions"
                  type="number"
                  placeholder="Reps"
                  min="1"
                  class="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                />
                <button
                  type="button"
                  @click="addExercise"
                  class="rounded-lg bg-secondary-600 px-4 py-2 text-white transition-colors hover:bg-secondary-700 font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 pt-4 border-t border-neutral-200">
          <button
            type="button"
            @click="$router.push('/')"
            class="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-center text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            {{ isEditing ? 'Update Plan' : 'Create Plan' }}
          </button>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppData } from '../composables/useAppData'
import MainLayout from '../layouts/MainLayout.vue'
import type { Plan, PlanExercise } from '../types'

const router = useRouter()
const route = useRoute()
const { getPatients, getExercises, getPlan, addPlan, updatePlan } = useAppData()

const isEditing = computed(() => !!route.params.id)
const patients = computed(() => getPatients())
const exercises = computed(() => getExercises())

const formData = ref<Omit<Plan, 'id' | 'createdAt' | 'updatedAt' | 'score' | 'rating'>>({
  patientId: '',
  patient: undefined,
  title: '',
  description: '',
  duration: 30,
  difficulty: 'beginner',
  exercises: [],
  videoUrl: '',
  imageUrl: '',
})

const newExercise = ref<PlanExercise>({
  exerciseId: '',
  sets: 1,
  repetitions: 1,
  exercise: undefined,
})

onMounted(() => {
  if (isEditing.value && route.params.id) {
    const plan = getPlan(route.params.id as string)
    if (plan) {
      formData.value = {
        patientId: plan.patientId,
        patient: plan.patient,
        exercises: [...plan.exercises],
      }
    }
  }
})

const addExercise = () => {
  if (!newExercise.value.exerciseId) return

  const exercise = exercises.value.find((e) => e.id === newExercise.value.exerciseId)
  if (exercise) {
    formData.value.exercises.push({
      exerciseId: newExercise.value.exerciseId,
      sets: newExercise.value.sets,
      repetitions: newExercise.value.repetitions,
      exercise,
    })
    newExercise.value = {
      exerciseId: '',
      sets: 1,
      repetitions: 1,
      exercise: undefined,
    }
  }
}

const removeExercise = (index: number) => {
  formData.value.exercises.splice(index, 1)
}

const handleSubmit = async () => {
  if (!formData.value.patientId) {
    alert('Please select a patient')
    return
  }

  const patientData = patients.value.find((p) => p.id === formData.value.patientId)

  if (isEditing.value && route.params.id) {
    updatePlan(route.params.id as string, {
      ...formData.value,
      patient: patientData,
    })
  } else {
    addPlan({
      ...formData.value,
      patient: patientData,
      score: 0,
      rating: 0,
    })
  }

  router.push('/')
}
</script>
