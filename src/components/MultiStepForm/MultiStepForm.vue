<script setup lang="ts">
import Stepper from "./Stepper.vue";
import PersonalInfo from "./PersonalInfo.vue";
import SelectSkillLevel from "./SelectSkillLevel.vue";
import FormSummary from "./FormSummary.vue";
import { ref, computed } from "vue";
import { useForm } from "vee-validate";
import TechChoice from "./TechChoice.vue";
import { JSFramework, SkillLevel, type SignupFormData } from "./types";
import * as yup from "yup";
import { nextTick } from "vue";

const MAX_STEPS: number = 4;

const schema = yup.object({
  fullName: yup.string().required().label("Full Name"),
  email: yup.string().required().email().label("Email Address"),
  phone: yup
    .string()
    .required()
    .matches(
      /^[0-9+()\-\s]+$/,
      "Phone number must contain only digits and allowed characters (+, -, (, ), space)"
    )
    .label("Phone Number"),
  portfolio: yup.string().required().url().label("Portfolio Link"),
  skillLevel: yup
    .mixed<SkillLevel>()
    .oneOf(Object.values(SkillLevel))
    .required()
    .label("Skill Level"),
  frameworks: yup
    .array()
    .of(yup.mixed<JSFramework>().oneOf(Object.values(JSFramework)))
    .min(1, "Choose at least one option")
    .required() // Required ensures it's an array, min(1) ensures not empty
    .label("Technology Choice"),
});

const fieldsByStep: Record<number, Partial<keyof SignupFormData>[]> = {
  1: ["fullName", "email", "phone", "portfolio"],
  2: ["skillLevel"],
  3: ["frameworks"],
};

const activeStep = ref(1);
const isFirstStep = computed(() => activeStep.value === 1);
const isLastStep = computed(() => activeStep.value === MAX_STEPS);

const { values, handleSubmit, validateField, errors } = useForm({
  validationSchema: schema,
  keepValuesOnUnmount: true, // Add this option to preserve state across steps
  initialValues: {
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    skillLevel: SkillLevel.Beginner,
    frameworks: [] as JSFramework[],
  },
});

async function onNextStep(event: MouseEvent) {
  if (activeStep.value === MAX_STEPS) {
    // if we are at the last step, we let the `type="submit"` to trigger the form.
    return;
  }
  // The button is "Next"  - prevent submit behaviour.
  event.preventDefault();

  // For each step of the form, we want to only validate
  // the fields that are displayed in the current step.
  const currentFields = fieldsByStep[activeStep.value];
  if (!currentFields) {
    // Should not happen, but good practice
    activeStep.value++;
    return;
  }

  // Validate all fields for the current step
  const validationPromises = currentFields.map((field) => validateField(field));
  const results = await Promise.all(validationPromises);

  // Check if any validation failed
  const isValid = results.every((result) => result.valid);

  if (isValid) {
    activeStep.value++;
  } else {
    await focusFirstErroredField(currentFields);
  }
}

async function focusFirstErroredField(
  currentFields: Partial<keyof SignupFormData>[]
) {
  console.log(`Validation failed for step ${activeStep.value}`);
  // Find the first field in the current step that has an error
  const firstInvalidField = currentFields.find((field) => errors.value[field]);

  if (firstInvalidField) {
    // Construct the selector. Use the field name directly for step 1,
    // and the specific IDs we added for steps 2 and 3.
    let selector = `#${firstInvalidField}`; // Default for step 1 inputs
    if (activeStep.value === 2) {
      selector = `#field-skillLevel`; // ID added to the first button
    } else if (activeStep.value === 3) {
      // TODO: this currently doesn't work because we are targeting the native HTML input checkbox - we need to create the proxy element and style it.
      selector = `#field-frameworks-react`; // ID added to the checkbox container
    }

    // Use nextTick to ensure the DOM is updated before trying to focus
    await nextTick();
    const elementToFocus = document.querySelector<HTMLElement>(selector);
    elementToFocus?.focus();
  }
}

function onPreviousStep() {
  if (activeStep.value === 1) {
    return;
  } else {
    activeStep.value--;
  }
}

const onSubmit = handleSubmit((formValues) => {
  console.log("Form Submitted:", formValues);
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white shadow-xl min-w-1/2 max-w-[37rem] h-1/2 max-h-[37rem] rounded-md grid grid-rows-[6rem_1fr_6rem]"
  >
    <Stepper :max-steps="MAX_STEPS" :active-step="activeStep" />
    <TransitionGroup>
      <KeepAlive :key="activeStep">
        <PersonalInfo v-if="activeStep === 1" />
        <SelectSkillLevel v-else-if="activeStep === 2" />
        <TechChoice v-else-if="activeStep === 3" />
        <FormSummary :form-values="values" v-else-if="isLastStep" />
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
        :type="isLastStep ? 'submit' : 'button'"
        class="rounded-lg py-2 px-4 bg-orange-500 text-white text-sm cursor-pointer"
        @click="onNextStep"
        :class="{ 'opacity-50': false }"
      >
        {{ isLastStep ? "Submit" : "Next Step" }}
      </button>
    </footer>
  </form>
</template>
