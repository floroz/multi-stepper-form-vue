<script setup lang="ts">
import { computed } from "vue";

const { activeStep } = defineProps<{
  nextButtonText: string;
  previousButtonText: string;
  activeStep: number;
  disabled: boolean;
}>();

defineEmits<{
  onPrevious: [];
  onNext: [];
}>();

const isFirstStep = computed(() => activeStep === 1);
</script>
<template>
  <footer class="w-full flex items-center justify-between p-8">
    <button
      class="rounded-lg py-2 px-4 border-2 border-orange-500 text-orange-500 text-sm cursor-pointer"
      @click="$emit('onPrevious')"
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
      @click="$emit('onNext')"
      :class="{ 'opacity-50': disabled }"
      :disabled="disabled"
    >
      {{ nextButtonText }}
    </button>
  </footer>
</template>
