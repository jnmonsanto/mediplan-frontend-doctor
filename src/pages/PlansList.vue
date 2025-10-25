<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900">Exercise Plans</h1>
        <p class="mt-2 text-neutral-600">Manage and track patient exercise plans</p>
      </div>

      <!-- Filters and Search -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Search -->
        <div class="lg:col-span-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by patient name..."
            class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Sort Filter -->
        <select
          v-model="sortBy"
          class="rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
        >
          <option value="recent">Most Recent</option>
          <option value="name">Patient Name (A-Z)</option>
          <option value="score">Score (High to Low)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>

        <!-- Add Button -->
        <router-link
          to="/plans/new"
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
          Add Plan
        </router-link>
      </div>

      <!-- Plans List -->
      <div class="space-y-4">
        <div
          v-if="filteredPlans.length === 0"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="mt-4 text-neutral-600">
            No plans found. Create your first plan to get started.
          </p>
        </div>

        <div
          v-for="plan in filteredPlans"
          :key="plan.id"
          class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex gap-6">
            <!-- Patient Photo -->
            <div v-if="plan.patient" class="flex-shrink-0">
              <img
                :src="plan.patient.photo"
                :alt="plan.patient.name"
                class="h-16 w-16 rounded-full object-cover ring-2 ring-primary-100"
              />
            </div>

            <!-- Plan Details -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-neutral-900">
                    {{ plan.patient?.name || 'Unknown Patient' }}
                  </h3>
                  <p class="text-sm text-neutral-500">
                    {{ formatDate(plan.createdAt) }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <router-link
                    :to="`/plans/${plan.id}/edit`"
                    class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    title="Edit plan"
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
                    @click="deletePlanConfirm(plan.id)"
                    class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete plan"
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

              <!-- Exercises -->
              <div class="mt-4">
                <p class="text-sm font-medium text-neutral-700">Exercises:</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <div
                    v-for="(ex, idx) in plan.exercises.slice(0, 5)"
                    :key="idx"
                    class="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700"
                  >
                    {{ ex.exercise?.name || 'Unknown' }} ({{ ex.sets }}x{{ ex.repetitions }})
                  </div>
                  <div
                    v-if="plan.exercises.length > 5"
                    class="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
                  >
                    +{{ plan.exercises.length - 5 }} more
                  </div>
                </div>
              </div>

              <!-- Score and Rating -->
              <div class="mt-4 flex gap-8">
                <div>
                  <p class="text-sm text-neutral-600">Score</p>
                  <p class="text-2xl font-bold text-primary-600">{{ plan.score }}</p>
                </div>
                <div>
                  <p class="text-sm text-neutral-600">Rating</p>
                  <div class="flex gap-1 mt-1">
                    <span v-for="i in 5" :key="i" class="text-xl">
                      {{ i <= plan.rating ? '⭐' : '☆' }}
                    </span>
                  </div>
                </div>
              </div>
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

const { getPlans, deletePlan } = useAppData()
const searchQuery = ref('')
const sortBy = ref('recent')

const plans = computed(() => getPlans())

const filteredPlans = computed(() => {
  let filtered = plans.value.filter((plan) => {
    const patientName = plan.patient?.name.toLowerCase() || ''
    return patientName.includes(searchQuery.value.toLowerCase())
  })

  switch (sortBy.value) {
    case 'name':
      filtered.sort((a, b) => (a.patient?.name || '').localeCompare(b.patient?.name || ''))
      break
    case 'score':
      filtered.sort((a, b) => b.score - a.score)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'recent':
    default:
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return filtered
})

const deletePlanConfirm = (id: string) => {
  if (confirm('Are you sure you want to delete this plan?')) {
    deletePlan(id)
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
