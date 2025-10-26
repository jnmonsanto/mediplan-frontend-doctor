<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900">Patients</h1>
        <p class="mt-2 text-neutral-600">Manage your patient list</p>
      </div>

      <!-- Filters and Search -->
      <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Search -->
        <div class="lg:col-span-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email..."
            class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Sort Filter -->
        <select
          v-model="sortBy"
          class="rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
        >
          <option value="name">Name (A-Z)</option>
          <option value="email">Email (A-Z)</option>
          <option value="snsId">SNS ID</option>
        </select>

        <!-- Add Button -->
        <router-link
          to="/patients/new"
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
          Add Patient
        </router-link>
      </div>

      <!-- Patients List -->
      <div class="space-y-4">
        <div
          v-if="filteredPatients.length === 0"
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
              d="M12 4.354a4 4 0 110 5.292M15 12H9m4 8H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"
            />
          </svg>
          <p class="mt-4 text-neutral-600">
            No patients found. Add your first patient to get started.
          </p>
        </div>

        <div
          v-for="patient in filteredPatients"
          :key="patient.id"
          class="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex gap-6">
            <!-- Patient Photo -->
            <div class="flex-shrink-0">
              <img
                :src="patient.photo"
                :alt="patient.name"
                class="h-16 w-16 rounded-full object-cover ring-2 ring-primary-100"
              />
            </div>

            <!-- Patient Details -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-neutral-900">{{ patient.name }}</h3>
                  <p class="text-sm text-neutral-600">{{ patient.email }}</p>
                  <p v-if="patient.phone" class="text-sm text-neutral-600">{{ patient.phone }}</p>
                  <p v-if="patient.address" class="text-sm text-neutral-600 mt-1">
                    {{ patient.address }}
                  </p>
                  <p class="text-xs text-neutral-500 mt-2">
                    SNS ID: <span class="font-medium text-neutral-700">{{ patient.snsId }}</span>
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <router-link
                    :to="`/patients/${patient.id}/edit`"
                    class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    title="Edit patient"
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
                    @click="deletePatientConfirm(patient.id)"
                    class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete patient"
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
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppData } from '../composables/useAppData'
import MainLayout from '../layouts/MainLayout.vue'

const { getPatients, deletePatient } = useAppData()
const searchQuery = ref('')
const sortBy = ref('name')

const patients = computed(() => getPatients())

const filteredPatients = computed(() => {
  let filtered = patients.value.filter((patient) => {
    const search = searchQuery.value.toLowerCase()
    return (
      patient.name.toLowerCase().includes(search) ||
      patient.email.toLowerCase().includes(search) ||
      patient.snsId.toLowerCase().includes(search)
    )
  })

  switch (sortBy.value) {
    case 'email':
      filtered.sort((a, b) => a.email.localeCompare(b.email))
      break
    case 'snsId':
      filtered.sort((a, b) => a.snsId.localeCompare(b.snsId))
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  return filtered
})

const deletePatientConfirm = (id: string) => {
  if (confirm('Are you sure you want to delete this patient?')) {
    deletePatient(id)
  }
}
</script>
