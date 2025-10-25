<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900">Exercises</h1>
        <p class="mt-2 text-neutral-600">Manage your exercise library</p>
      </div>

      <!-- Filters and Search -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Search -->
        <div class="lg:col-span-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by exercise name..."
            class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Sort Filter -->
        <select
          v-model="sortBy"
          class="rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
        >
          <option value="name">Name (A-Z)</option>
          <option value="id">ID</option>
        </select>

        <!-- Add Button -->
        <router-link
          to="/exercises/new"
          class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 flex items-center justify-center gap-2"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Exercise
        </router-link>
      </div>

      <!-- Exercises List -->
      <div class="space-y-4">
        <div
          v-if="filteredExercises.length === 0"
          class="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p class="mt-4 text-neutral-600">
            No exercises found. Add your first exercise to get started.
          </p>
        </div>

        <div
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-neutral-900">{{ exercise.name }}</h3>
              <p class="text-sm text-neutral-600 mt-1">ID: {{ exercise.id }}</p>
              <div v-if="exercise.jsonData" class="mt-4 rounded-lg bg-neutral-50 p-3">
                <p class="text-xs font-medium text-neutral-700 mb-2">JSON Data:</p>
                <pre class="text-xs text-neutral-600 overflow-auto max-h-40">{{
                  JSON.stringify(exercise.jsonData, null, 2)
                }}</pre>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 ml-4">
              <router-link
                :to="`/exercises/${exercise.id}/edit`"
                class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                title="Edit exercise"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </router-link>
              <button
                @click="deleteExerciseConfirm(exercise.id)"
                class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete exercise"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppData } from '../composables/useAppData'
import MainLayout from '../layouts/MainLayout.vue'

const { getExercises, deleteExercise } = useAppData()
const searchQuery = ref('')
const sortBy = ref('name')

const exercises = computed(() => getExercises())

const filteredExercises = computed(() => {
  let filtered = exercises.value.filter((exercise) => {
    return exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })

  switch (sortBy.value) {
    case 'id':
      filtered.sort((a, b) => a.id.localeCompare(b.id))
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  return filtered
})

const deleteExerciseConfirm = (id: string) => {
  if (confirm('Are you sure you want to delete this exercise?')) {
    deleteExercise(id)
  }
}
</script>
