<script setup lang="ts">
import { useMultiStep } from "./useMultiStep";

defineProps<{
  nextButtonText: string;
  previousButtonText: string;
}>();

const {
  activeStep,
  maxSteps,
  onNextStep,
  onPreviousStep,
  isLastStep,
  isFirstStep,
} = useMultiStep();
</script>
<template>
  <footer class="w-full flex items-center justify-between p-8">
    <button
      class="rounded-lg py-2 px-4 border-2 border-orange-500 text-orange-500 text-sm cursor-pointer"
      @click="onPreviousStep"
      :class="{
        'opacity-0': isFirstStep,
        'pointer-events-none': isFirstStep,
      }"
      :tabindex="isFirstStep ? -1 : 0"
    >
      {{ previousButtonText }}
    </button>
    <button
      class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm cursor-pointer"
      @click="onNextStep"
      :class="{ 'opacity-50': isLastStep }"
      :disabled="activeStep === maxSteps"
    >
      {{ nextButtonText }}
    </button>
  </footer>
</template>
