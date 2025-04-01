<script setup lang="ts">
import MultiFormStepper from "./MultiFormStepper.vue";
import MultiFormPersonalInfo from "./MultiFormPersonalInfo.vue";
import MultiFormSkillLevel from "./MultiFormSkillLevel.vue";
import MultiFormSummary from "./MultiFormSummary.vue";
import { ref, computed } from "vue"; // Ensure computed is imported
import { useForm } from "vee-validate"; // Import useForm
import * as yup from "yup"; // Import yup
import MultiFormTechChoice from "./MultiFormTechChoice.vue";
import { JSFramework, SkillLevel } from "./types"; // Import enums

// Define Yup validation schema
const schema = yup.object({
  fullName: yup.string().required().label("Full Name"),
  email: yup.string().required().email().label("Email Address"),
  phone: yup.string().required().label("Phone Number"), // Consider adding numeric/format validation
  portfolio: yup.string().required().url().label("Portfolio Link"),
  skillLevel: yup
    .mixed<SkillLevel>()
    .oneOf(Object.values(SkillLevel))
    .required()
    .label("Skill Level"),
  frameworks: yup
    .array()
    .of(yup.mixed<JSFramework>().oneOf(Object.values(JSFramework)))
    .min(1, "Choose at least one option") // Use Yup's min for array length
    .required() // Required ensures it's an array, min(1) ensures not empty
    .label("Technology Choice"),
});

const MAX_STEPS: number = 4;
const activeStep = ref(3); // Start at step 1

// Initialize useForm
const { values, handleSubmit, validate, errors } = useForm({
  validationSchema: schema,
  keepValuesOnUnmount: true,
  initialValues: {
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    skillLevel: SkillLevel.Beginner, // Default value
    frameworks: [] as JSFramework[], // Initialize as empty array
  },
});

async function onNextStep() {
  if (activeStep.value === MAX_STEPS) {
    return;
  }

  // Validate all fields up to the current step (or just current if needed)
  // For simplicity, let's validate all. Adjust if step-specific validation is required.
  const { valid } = await validate();

  if (valid) {
    // Check if validation passed
    activeStep.value++;
  }

  // If validation fails, VeeValidate will typically display errors
  // based on how <Field> and <ErrorMessage> are configured in child components.
}

function onPreviousStep() {
  if (activeStep.value === 1) {
    return;
  } else {
    activeStep.value--;
  }
}

async function handleNextOrSubmit(event: MouseEvent) {
  if (activeStep.value !== MAX_STEPS) {
    // It's the "Next Step" button
    event.preventDefault(); // Prevent default browser action (important!)
    await onNextStep(); // Validate and potentially move to the next step
  }
  // If it IS the last step (activeStep === MAX_STEPS), this handler does nothing.
  // The button's type="submit" will trigger the form's @submit event naturally.
}

// Define the function to run on successful submission
const onSubmit = handleSubmit((formValues) => {
  // formValues contains the validated data
  alert("Submit!");
  // fake API request to server with formValues
  console.log("Form Submitted:", formValues);
});

const isFirstStep = computed(() => activeStep.value === 1);

// Expose errors for potential use in template (optional)
// const errorBag = errors;
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white shadow-xl min-w-1/2 max-w-[37rem] h-1/2 max-h-[37rem] rounded-md grid grid-rows-[6rem_1fr_6rem]"
  >
    <MultiFormStepper :max-steps="MAX_STEPS" :active-step="activeStep" />
    <TransitionGroup>
      <KeepAlive :key="activeStep">
        <MultiFormPersonalInfo v-if="activeStep === 1" />
        <MultiFormSkillLevel v-else-if="activeStep === 2" />
        <MultiFormTechChoice v-else-if="activeStep === 3" />
        <MultiFormSummary
          :form-values="values"
          v-else-if="activeStep === MAX_STEPS"
        />
      </KeepAlive>
    </TransitionGroup>
    <footer class="w-full flex items-center justify-between p-8">
      <button
        type="button"
        class="rounded-lg py-2 px-4 border-2 border-orange-500 text-orange-500 text-sm cursor-pointer"
        @click="onPreviousStep"
        :class="{
          'opacity-0': isFirstStep,
          'pointer-events-none': isFirstStep,
        }"
        :tabindex="isFirstStep ? -1 : 0"
      >
        Go Back
      </button>
      <button
        :type="activeStep === MAX_STEPS ? 'submit' : 'button'"
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm cursor-pointer"
        @click="handleNextOrSubmit"
        :class="{ 'opacity-50': false }"
      >
        {{ activeStep === MAX_STEPS ? "Submit" : "Next Step" }}
      </button>
    </footer>
  </form>
  <pre>{{ values }}</pre>
</template>
