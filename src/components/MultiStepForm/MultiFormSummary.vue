<script setup lang="ts">
// Removed SignupFormData import as we now receive values directly from vee-validate
import { JSFramework, SkillLevel } from "./types"; // Keep these if needed for display logic

defineProps<{
  // Accept the form values object from vee-validate
  formValues: Record<string, any>; // Use Record<string, any> or Object
}>();

// Adjust mapKeyToTitle to accept string and handle potential keys
const mapKeyToTitle = (k: string): string => {
  // Define the mapping based on field names used in vee-validate Fields
  const dict: Record<string, string> = {
    email: "Email Address",
    fullName: "Full Name",
    phone: "Phone Number",
    portfolio: "Portfolio/GitHub Link",
    skillLevel: "Skill Level",
    framework: "Challenge Preference", // Assuming 'framework' is the name used in MultiFormTechChoice
  };

  return dict[k] || k; // Return the mapped title or the key itself if not found
};
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Review and Confirm</h3>
    <p class="mb-4 text-sm">
      Please review your information to make sure everything is accurate
    </p>

    <div class="grid grid-cols-3 gap-8">
      <!-- Iterate over the formValues prop -->
      <div
        class="flex flex-col bg-gray-200 rounded-lg p-4 text-sm"
        v-for="(v, k) in formValues"
        :key="k"
      >
        <p>{{ mapKeyToTitle(k) }}</p>
        <p class="font-bold">{{ v ?? "Not provided" }}</p>
      </div>
    </div>
  </section>
</template>
