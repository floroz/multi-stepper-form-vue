<script setup lang="ts">
import MultiStepForm from "./components/MultiStepForm.vue";
</script>

<template>
  <main
    class="bg-orange-100 w-full min-h-screen flex flex-col justify-center items-center"
  >
    <h1 class="text-3xl mb-4">Join Our Community of Developers</h1>
    <h2 class="text-md mb-4">
      To join our community and participate in frontend challenges.<br />
      Please fill out the following form
    </h2>
    <MultiStepForm />
  </main>
</template>

<style scoped></style>
