<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  maxSteps: number;
  activeStep: number;
}>();

const steps = computed<number[]>(() =>
  Array.from({ length: props.maxSteps })
    .fill(0)
    .map((_, idx) => idx + 1)
);
</script>

<template>
  <div class="w-full flex p-6 gap-x-4 items-center justify-center">
    <template v-for="step in steps">
      <div
        class="rounded-full min-w-8 min-h-8 bg-gray-200 flex justify-center items-center"
        :class="{
          'bg-orange-500': activeStep >= step,
          'text-white': activeStep >= step,
        }"
      >
        {{ step }}
      </div>
      <div
        v-if="step !== maxSteps"
        class="bg-gray-200 h-2 w-full rounded-lg"
        :class="{
          'bg-orange-500': activeStep > step,
        }"
      ></div>
    </template>
  </div>
</template>
