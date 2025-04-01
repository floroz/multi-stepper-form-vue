<script setup lang="ts">
import MultiFormStepper from "./MultiFormStepper.vue";
import MultiFormFooter from "./MultiFormFooter.vue";
import MultiFormPersonalInfo from "./MultiFormPersonalInfo.vue";
import { reactive } from "vue";
import { JSFramework, SkillLevel, type SignupFormData } from "./types";
import MultiFormSkillLevel from "./MultiFormSkillLevel.vue";
import MultiFormSummary from "./MultiFormSummary.vue";
import { ref } from "vue";

const maxSteps: number = 4;
const activeStep = ref(1);
const errors = ref([]);

function onNextStep() {
  if (activeStep.value === maxSteps) {
    onSubmit();
    return;
  } else {
    //TODO: validate step
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

function onSubmit() {
  // fake API request to server with formData
}

const formData = reactive<SignupFormData>({
  fullName: "",
  email: "",
  phone: "",
  portfolio: "",
  skillLevel: SkillLevel.Beginner,
  framework: JSFramework.React,
});
</script>

<template>
  <form
    novalidate
    class="bg-white shadow-xl min-w-1/2 max-w-[37rem] h-1/2 max-h-[37rem] rounded-md grid grid-rows-[6rem_1fr_6rem]"
  >
    <MultiFormStepper :max-steps="maxSteps" :active-step="activeStep" />
    <TransitionGroup>
      <KeepAlive>
        <MultiFormPersonalInfo
          v-model:full-name="formData.fullName"
          v-model:email="formData.email"
          v-model:phone="formData.phone"
          v-model:portfolio="formData.portfolio"
          v-if="activeStep === 1"
        />
        <MultiFormSkillLevel
          v-model="formData.skillLevel"
          v-else-if="activeStep === 2"
        />
        <MultiFormSummary
          :form-data="formData"
          v-else-if="activeStep === maxSteps"
        />
      </KeepAlive>
    </TransitionGroup>
    <MultiFormFooter
      @on-next="onNextStep"
      @on-previous="onPreviousStep"
      :max-steps="maxSteps"
      :active-step="activeStep"
      previous-button-text="Go Back"
      :next-button-text="activeStep === maxSteps ? 'Submit' : 'Next Step'"
      :disabled="activeStep === maxSteps || errors.length > 0"
    />
  </form>
</template>
