<template>
  <MainLayout>
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <router-link to="/patients" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 mb-4">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Patients
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">{{ isEditing ? 'Edit Patient' : 'Add New Patient' }}</h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder="Enter patient name"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Email *</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder="Enter patient email"
          />
        </div>

        <!-- SNS ID -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">SNS ID *</label>
          <input
            v-model="formData.snsId"
            type="text"
            required
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder="Enter SNS ID"
          />
        </div>

        <!-- Photo URL -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Photo URL</label>
          <input
            v-model="formData.photo"
            type="text"
            class="mt-2 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
            placeholder="Enter photo URL"
          />
          <div v-if="formData.photo" class="mt-4 flex justify-center">
            <img :src="formData.photo" :alt="formData.name" class="h-24 w-24 rounded-full object-cover ring-2 ring-primary-100" />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-3 pt-4 border-t border-neutral-200">
          <router-link
            to="/patients"
            class="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-center text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="flex-1 rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            {{ isEditing ? 'Update Patient' : 'Add Patient' }}
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
import type { Patient } from '../types'

const router = useRouter()
const route = useRoute()
const { getPatient, addPatient, updatePatient } = useAppData()

const isEditing = computed(() => !!route.params.id)

const formData = ref<Patient>({
  id: '',
  name: '',
  email: '',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  snsId: '',
})

onMounted(() => {
  if (isEditing.value && route.params.id) {
    const patient = getPatient(route.params.id as string)
    if (patient) {
      formData.value = { ...patient }
    }
  }
})

const handleSubmit = async () => {
  if (isEditing.value && route.params.id) {
    updatePatient(route.params.id as string, formData.value)
  } else {
    const { id, ...patientData } = formData.value
    addPatient(patientData)
  }

  router.push('/patients')
}
</script>
