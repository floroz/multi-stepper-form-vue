import { computed, ref } from "vue";

const maxSteps: number = 4;
const activeStep = ref(1);

const isLastStep = computed(() => activeStep.value === maxSteps);
const isFirstStep = computed(() => activeStep.value === 1);

function onNextStep() {
  if (activeStep.value === maxSteps) {
    return;
  } else {
    activeStep.value++;
  }
}
function onPreviousStep() {
  if (activeStep.value === 1) {
    return;
  } else {
    activeStep.value--;
  }
}

export function useMultiStep() {
  return {
    maxSteps,
    activeStep,
    onNextStep,
    onPreviousStep,
    isFirstStep,
    isLastStep,
  };
}
