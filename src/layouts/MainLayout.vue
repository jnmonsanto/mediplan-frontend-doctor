<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white shadow-sm">
      <div class="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Logo/Title -->
        <h1 class="text-xl text-primary-600" style="font-weight: 700">MediPlan</h1>

        <!-- Profile Button -->
        <button
          @click="showProfileModal = true"
          class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Open profile"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Profile Modal -->
    <ProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileModal from '../components/ProfileModal.vue'

const isMenuOpen = ref(false)
const showProfileModal = ref(false)
</script>
