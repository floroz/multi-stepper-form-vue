<script setup lang="ts">
import { useField } from "vee-validate";
import { JSFramework } from "./types";
import { ref, onBeforeUpdate } from "vue";
import { useArrowNavigation } from "../../composables/useArrowNavigation";
import { getFrameworkDisplayName } from "./helpers.ts";

const { value: frameworks, errorMessage: frameworksError } =
  useField<JSFramework[]>("frameworks");

const frameworkOptions = Object.values(JSFramework);

const containerRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);

const setItemRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    itemRefs.value[index] = el;
  }
};

onBeforeUpdate(() => {
  itemRefs.value = [];
});

const { handleKeydown } = useArrowNavigation(containerRef, itemRefs, {
  columns: 2,
  loop: true,
});

// Helper to toggle checkbox state
const toggleFramework = (framework: JSFramework) => {
  const currentFrameworks = frameworks.value ? [...frameworks.value] : [];
  const index = currentFrameworks.indexOf(framework);
  if (index > -1) {
    currentFrameworks.splice(index, 1); // Remove if exists
  } else {
    currentFrameworks.push(framework); // Add if not exists
  }
  frameworks.value = currentFrameworks;
};
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Technology Choice</h3>
    <p class="mb-4 text-sm">
      Select the technologies you'd like to work with (select at least one).
    </p>

    <div
      ref="containerRef"
      aria-labelledby="tech-choice-heading"
      class="grid grid-cols-2 grid-rows-2 gap-8"
      @keydown="handleKeydown"
    >
      <h4 id="tech-choice-heading" class="sr-only">Technology Choices</h4>
      <div
        v-for="(framework, index) in frameworkOptions"
        :key="framework"
        :ref="(el) => setItemRef(el as HTMLElement | null, index)"
        role="checkbox"
        :aria-checked="frameworks?.includes(framework)"
        :tabindex="index === 0 ? 0 : -1"
        class="border-2 border-gray-200 py-4 px-8 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 cursor-pointer flex items-center"
        :class="{
          'border-orange-500 bg-orange-50': frameworks?.includes(framework),
        }"
        @click="toggleFramework(framework)"
        @keydown.space.prevent="toggleFramework(framework)"
        @keydown.enter.prevent="toggleFramework(framework)"
      >
        <!-- Hidden actual checkbox for form submission -->
        <input
          type="checkbox"
          :id="'field-frameworks-' + framework"
          :value="framework"
          :checked="frameworks?.includes(framework)"
          class="absolute opacity-0 h-0 w-0 pointer-events-none"
          tabindex="-1"
          aria-hidden="true"
        />
        <!-- Custom Checkbox Visual -->
        <span
          aria-hidden="true"
          class="relative flex items-center h-5 w-5 shrink-0 border border-gray-300 rounded mr-3"
          :class="{
            'bg-orange-500 border-orange-500': frameworks?.includes(framework),
            'border-red-500':
              !!frameworksError && !frameworks?.includes(framework),
          }"
        >
          <!-- Checkmark -->
          <span
            v-if="frameworks?.includes(framework)"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.35rem] h-[0.65rem] border-solid border-white border-r-[2px] border-b-[2px] rotate-45"
          ></span>
        </span>
        <!-- Label Text -->
        <span class="font-bold text-sm select-none">
          {{ getFrameworkDisplayName(framework) }}
        </span>
      </div>
    </div>
    <span v-if="frameworksError" class="text-red-500 text-xs mt-2 block">{{
      frameworksError
    }}</span>
  </section>
</template>
