<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="emit('close')">
    <div class="w-full max-w-md rounded-xl bg-white shadow-xl" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h2 class="text-xl font-bold text-neutral-900">Doctor Profile</h2>
        <button
          @click="emit('close')"
          class="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-4 px-6 py-6">
        <!-- Photo -->
        <div class="flex justify-center">
          <img
            :src="formData.photo"
            alt="Profile"
            class="h-24 w-24 rounded-full object-cover ring-4 ring-primary-100"
          />
        </div>

        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Name</label>
          <input
            v-model="formData.name"
            type="text"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Phone</label>
          <input
            v-model="formData.phone"
            type="tel"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Address</label>
          <textarea
            v-model="formData.address"
            rows="3"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Specialization -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Specialization</label>
          <input
            v-model="formData.specialization"
            type="text"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Age -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Age</label>
          <input
            v-model.number="formData.age"
            type="number"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>

        <!-- Photo URL -->
        <div>
          <label class="block text-sm font-medium text-neutral-700">Photo URL</label>
          <input
            v-model="formData.photo"
            type="text"
            class="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="space-y-3 border-t border-neutral-200 px-6 py-4">
        <div class="flex gap-3">
          <button
            @click="emit('close')"
            class="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            @click="handleSave"
            class="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            <svg
              class="mb-1 inline h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save
          </button>
        </div>
        <button
          @click="handleLogout"
          class="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <svg
            class="mb-1 inline h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppData } from '../composables/useAppData'
import { useAuth } from '../composables/useAuth'
import type { Doctor } from '../types'

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const { getDoctor, updateDoctor } = useAppData()
const { logout } = useAuth()
const currentDoctor = getDoctor()

const formData = ref<Doctor>(
  currentDoctor || {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    specialization: '',
    age: 0,
  },
)

const handleSave = async () => {
  await updateDoctor(formData.value)
  emit('close')
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout()
    router.push('/login')
  }
}
</script>
