<script setup lang="ts"></script>

<template>
  <KeepAlive>
    <section class="my-8 border-y-1 border-gray-200 mx-6 py-8">
      <h3>Personal Information</h3>
      <p>
        Please provide your personal details so we can get to know you better
      </p>

      <div class="grid grid-col-2">
        <div class="flex flex-col">
          <label for="" class="text-xs font-bold">Full Name</label>
          <input
            type="text"
            class="rounded-md border-1 border-gray-200 p-2 text-black"
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="text-xs font-bold">Email</label>
          <input
            type="text"
            class="rounded-md border-1 border-gray-200 p-2 text-black"
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="text-xs font-bold">Phone</label>
          <input
            type="text"
            class="rounded-md border-1 border-gray-200 p-2 text-black"
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="text-xs font-bold">Portfolio</label>
          <input
            type="text"
            class="rounded-md border-1 border-gray-200 p-2 text-black"
          />
        </div>
      </div>
    </section>
  </KeepAlive>
</template>
