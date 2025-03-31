<script setup lang="ts"></script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Personal Information</h3>
    <p class="mb-4 text-sm">
      Please provide your personal details so we can get to know you better
    </p>

    <div class="grid grid-cols-2 grid-rows-1 gap-8">
      <div class="flex flex-col">
        <label for="" class="text-xs font-bold">Full Name</label>
        <input
          placeholder="Rishi Purwar"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
        />
      </div>
      <div class="flex flex-col">
        <label for="" class="text-xs font-bold">Email</label>
        <input
          placeholder="name@email.com"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
        />
      </div>
      <div class="flex flex-col">
        <label for="" class="text-xs font-bold">Phone</label>
        <input
          placeholder="+91 1234567890"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
        />
      </div>
      <div class="flex flex-col">
        <label for="" class="text-xs font-bold">Portfolio</label>
        <input
          placeholder="github.com/rishipurwal"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
        />
      </div>
    </div>
  </section>
</template>
