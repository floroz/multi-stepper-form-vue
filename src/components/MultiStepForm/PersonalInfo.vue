<script setup lang="ts">
import { useField } from "vee-validate";

const { value: fullName, errorMessage: fullNameError } =
  useField<string>("fullName");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: portfolio, errorMessage: portfolioError } =
  useField<string>("portfolio");
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Personal Information</h3>
    <p class="mb-4 text-sm">
      Please provide your personal details so we can get to know you better
    </p>

    <div class="grid grid-cols-2 grid-rows-1 gap-8">
      <div class="flex flex-col">
        <label for="fullName" class="text-xs font-bold">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          v-model="fullName"
          placeholder="Rishi Purwar"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
          :class="{ 'border-red-500': !!fullNameError }"
        />
        <span v-if="fullNameError" class="text-red-500 text-xs mt-1">{{
          fullNameError
        }}</span>
      </div>
      <div class="flex flex-col">
        <label for="email" class="text-xs font-bold">Email</label>
        <input
          id="email"
          name="email"
          v-model="email"
          placeholder="name@email.com"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
          :class="{ 'border-red-500': !!emailError }"
        />
        <span v-if="emailError" class="text-red-500 text-xs mt-1">{{
          emailError
        }}</span>
      </div>
      <div class="flex flex-col">
        <label for="phone" class="text-xs font-bold">Phone</label>
        <input
          id="phone"
          name="phone"
          v-model="phone"
          placeholder="+91 1234567890"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
          :class="{ 'border-red-500': !!phoneError }"
        />
        <span v-if="phoneError" class="text-red-500 text-xs mt-1">{{
          phoneError
        }}</span>
      </div>
      <div class="flex flex-col">
        <label for="portfolio" class="text-xs font-bold">Portfolio</label>
        <input
          id="portfolio"
          name="portfolio"
          v-model="portfolio"
          placeholder="github.com/rishipurwal"
          type="text"
          class="rounded-md border-1 border-gray-200 p-2 text-black"
          :class="{ 'border-red-500': !!portfolioError }"
        />
        <span v-if="portfolioError" class="text-red-500 text-xs mt-1">{{
          portfolioError
        }}</span>
      </div>
    </div>
  </section>
</template>
