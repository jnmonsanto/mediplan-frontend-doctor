<template>
  <MainLayout>
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <router-link to="/" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 mb-4">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">{{ isEditing ? 'Edit Exercise' : 'Add New Exercise' }}</h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Exercise Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder="Enter exercise name (e.g., Push-ups)"
          />
        </div>

        <!-- JSON Data -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">JSON Data</label>
          <textarea
            v-model="jsonDataString"
            rows="10"
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 font-mono text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder='{"difficulty": "medium", "duration": 5}'
          />
          <p class="mt-2 text-xs text-neutral-600">Enter valid JSON format for exercise configuration.</p>
          <div v-if="jsonError" class="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {{ jsonError }}
          </div>
        </div>

        <!-- Preview -->
        <div v-if="formData.jsonData" class="rounded-lg bg-neutral-50 p-4 border border-neutral-200">
          <p class="text-sm font-medium text-neutral-700 mb-3">JSON Preview:</p>
          <pre class="text-xs text-neutral-600 overflow-auto">{{ JSON.stringify(formData.jsonData, null, 2) }}</pre>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 pt-4 border-t border-neutral-200">
          <router-link
            to="/exercises"
            class="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-center text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="flex-1 rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            {{ isEditing ? 'Update Exercise' : 'Add Exercise' }}
          </button>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppData } from '../composables/useAppData'
import MainLayout from '../layouts/MainLayout.vue'
import type { Exercise } from '../types'

const router = useRouter()
const route = useRoute()
const { getExercise, addExercise, updateExercise } = useAppData()

const isEditing = computed(() => !!route.params.id)
const jsonError = ref('')

const formData = ref<Exercise>({
  id: '',
  name: '',
  jsonData: {},
})

const jsonDataString = ref('')

watch(
  () => jsonDataString.value,
  (newVal) => {
    jsonError.value = ''
    if (newVal.trim()) {
      try {
        formData.value.jsonData = JSON.parse(newVal)
      } catch (e) {
        jsonError.value = 'Invalid JSON format'
        formData.value.jsonData = undefined
      }
    } else {
      formData.value.jsonData = {}
    }
  }
)

onMounted(() => {
  if (isEditing.value && route.params.id) {
    const exercise = getExercise(route.params.id as string)
    if (exercise) {
      formData.value = { ...exercise }
      jsonDataString.value = JSON.stringify(exercise.jsonData || {}, null, 2)
    }
  } else {
    jsonDataString.value = '{}'
  }
})

const handleSubmit = async () => {
  if (jsonError.value) {
    alert('Please fix JSON errors before submitting')
    return
  }

  if (isEditing.value && route.params.id) {
    updateExercise(route.params.id as string, formData.value)
  } else {
    const { id, ...exerciseData } = formData.value
    addExercise(exerciseData)
  }

  router.push('/')
}
</script>
