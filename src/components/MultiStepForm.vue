<script setup lang="ts">
import MultiFormFooter from "./MultiFormFooter.vue";
import MultiFormStepper from "./MultiFormStepper.vue";
import MultiFormPersonalInfo from "./MultiFormPersonalInfo.vue";
import { ref } from "vue";

const maxSteps: number = 4;
const activeStep = ref(1);

function onNextStep() {
  if (activeStep.value === maxSteps) {
    return;
  } else {
    activeStep.value++;
  }
}
function onPreviousClick() {
  if (activeStep.value === 1) {
    return;
  } else {
    activeStep.value--;
  }
}
</script>

<template>
  <div class="bg-white min-h-1/2 min-w-1/2 shadow-xl rounded-md">
    <MultiFormStepper :max-steps="maxSteps" :active-step="activeStep" />
    <Transition>
      <KeepAlive>
        <MultiFormPersonalInfo v-if="activeStep === 1" />
      </KeepAlive>
    </Transition>
    <MultiFormFooter
      :max-steps="maxSteps"
      :active-step="activeStep"
      previous-button-text="Go Back"
      next-button-text="Next Step"
      @next-click="onNextStep"
      @previous-click="onPreviousClick"
    />
  </div>
</template>
