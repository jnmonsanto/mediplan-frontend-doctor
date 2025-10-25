<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white shadow-sm">
      <div class="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Hamburger Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Logo/Title -->
        <h1 class="text-xl font-bold text-primary-600">MediPlan</h1>

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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Sidebar Menu -->
    <div
      v-if="isMenuOpen"
      @click="isMenuOpen = false"
      class="fixed inset-0 top-16 z-30 bg-black/50 transition-opacity"
    />
    <aside
      class="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <nav class="space-y-2 bg-white p-4 shadow-lg">
        <router-link
          to="/"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
          active-class="bg-primary-50 text-primary-700 font-semibold"
          @click="isMenuOpen = false"
        >
          <svg class="mb-1 inline h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Plans
        </router-link>

        <router-link
          to="/patients"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
          active-class="bg-primary-50 text-primary-700 font-semibold"
          @click="isMenuOpen = false"
        >
          <svg class="mb-1 inline h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 12H9m4 8H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"
            />
          </svg>
          Patients
        </router-link>

        <router-link
          to="/exercises"
          class="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
          active-class="bg-primary-50 text-primary-700 font-semibold"
          @click="isMenuOpen = false"
        >
          <svg class="mb-1 inline h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Exercises
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="transition-all duration-300" :class="isMenuOpen ? 'ml-64' : ''">
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
