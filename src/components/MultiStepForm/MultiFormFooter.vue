<script setup lang="ts">
import { computed } from "vue";

const { activeStep, maxSteps } = defineProps<{
  nextButtonText: string;
  previousButtonText: string;
  activeStep: number;
  maxSteps: number;
}>();
defineEmits<{
  previousClick: [];
  nextClick: [];
}>();

const isLast = computed(() => activeStep == maxSteps);
</script>
<template>
  <footer class="w-full flex items-center justify-between p-8">
    <button
      class="rounded-lg py-2 px-4 border-2 border-orange-500 text-orange-500 text-sm cursor-pointer"
      @click="$emit('previousClick')"
      :class="{
        'opacity-0': activeStep === 1,
        'pointer-events-none': activeStep === 1,
      }"
      :tabindex="activeStep === 1 ? -1 : 0"
    >
      {{ previousButtonText }}
    </button>
    <button
      class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm cursor-pointer"
      @click="$emit('nextClick')"
      :class="{ 'opacity-50': isLast }"
      :disabled="activeStep === maxSteps"
    >
      {{ nextButtonText }}
    </button>
  </footer>
</template>
