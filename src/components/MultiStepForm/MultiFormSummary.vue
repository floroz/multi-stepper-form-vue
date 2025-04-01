<script setup lang="ts">
defineProps<{
  formValues: Record<string, any>;
}>();

const mapKeyToTitle = (k: string): string => {
  // Define the mapping based on field names used in vee-validate Fields
  const dict: Record<string, string> = {
    email: "Email Address",
    fullName: "Full Name",
    phone: "Phone Number",
    portfolio: "Portfolio/GitHub Link",
    skillLevel: "Skill Level",
    frameworks: "Technology Choices",
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

    <div class="grid grid-cols-3 gap-4">
      <!-- Iterate over the formValues prop -->
      <div
        class="flex flex-col bg-gray-200 rounded-lg p-4 text-sm"
        v-for="(v, k) in formValues"
        :key="k"
      >
        <p>{{ mapKeyToTitle(k) }}</p>
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
