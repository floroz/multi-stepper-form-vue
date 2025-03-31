<script setup lang="ts">
import MultiFormFooter from "./MultiFormFooter.vue";
import MultiFormStepper from "./MultiFormStepper.vue";
import MultiFormPersonalInfo from "./MultiFormPersonalInfo.vue";
import { ref } from "vue";

const maxSteps: number = 4;
const activeStep = ref(1);

const fullName = defineModel("full-name", {
  default: "",
  required: true,
  type: String,
});
const email = defineModel("email", {
  default: "",
  required: true,
  type: String,
});
const phone = defineModel("phone", {
  default: "",
  required: true,
  type: String,
});
const portfolio = defineModel("portfolio", {
  default: "",
  required: true,
  type: String,
});

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
  <div class="bg-white min-w-1/2 max-w-44 h-1/2 shadow-xl rounded-md">
    <MultiFormStepper :max-steps="maxSteps" :active-step="activeStep" />
    <Transition>
      <KeepAlive>
        <MultiFormPersonalInfo
          v-model:full-name="fullName"
          v-model:email="email"
          v-model:phone="phone"
          v-model:portfolio="portfolio"
          v-if="activeStep === 1"
        />
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
