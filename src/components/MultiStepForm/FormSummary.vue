<script setup lang="ts">
import { mapFormKeyToTitle } from "./helpers";
import type { SignupFormData } from "./types";

defineProps<{
  formValues: SignupFormData;
}>();
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Review and Confirm</h3>
    <p class="mb-4 text-sm">
      Please review your information to make sure everything is accurate
    </p>

    <div class="grid grid-cols-3 gap-4">
      <div
        class="flex flex-col bg-gray-200 rounded-lg p-4 text-sm"
        v-for="(v, k) in formValues"
        :key="k"
      >
        <p>{{ mapFormKeyToTitle(k) }}</p>
        <p class="font-bold text-xs">
          <template v-if="k === 'frameworks' && Array.isArray(v)">
            {{ v.length > 0 ? v.join(", ") : "None selected" }}
          </template>
          <template v-else>
            {{ v ?? "Not provided" }}
          </template>
        </p>
      </div>
    </div>
  </section>
</template>
