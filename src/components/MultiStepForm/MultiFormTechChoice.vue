<script setup lang="ts">
import { useField } from "vee-validate";
import { JSFramework } from "./types";

const { value: frameworks, errorMessage: frameworksError } =
  useField<JSFramework[]>("frameworks");

// Helper to get framework display names
const getFrameworkDisplayName = (framework: JSFramework): string => {
  const names: Record<JSFramework, string> = {
    [JSFramework.React]: "React",
    [JSFramework.Vue]: "Vue",
    [JSFramework.Angular]: "Angular",
    [JSFramework.HTMLCSS]: "HTML/CSS",
  };
  return names[framework] || framework;
};

const frameworkOptions = Object.values(JSFramework);
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Technology Choice</h3>
    <p class="mb-4 text-sm">
      Select the technologies you'd like to work with (select at least one).
    </p>

    <div class="grid grid-cols-2 grid-rows-2 gap-8">
      <div
        v-for="framework in frameworkOptions"
        :key="framework"
        class="border-2 border-gray-200 py-4 px-8 rounded-lg"
      >
        <label
          :for="'field-frameworks-' + framework"
          class="flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            :id="'field-frameworks-' + framework"
            :value="framework"
            v-model="frameworks"
            class="peer absolute opacity-0 h-0 w-0"
          />
          <!-- Custom Checkbox -->
          <span
            aria-hidden="true"
            class="relative flex items-center h-5 w-5 shrink-0 border border-gray-300 rounded mr-3 peer-checked:bg-orange-500 peer-checked:border-orange-500 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2 peer-checked:[&_span]:block"
            :class="{ 'border-red-500': !!frameworksError }"
          >
            <!-- Checkmark (initially hidden) -->
            <span
              class="absolute hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.35rem] h-[0.65rem] border-solid border-white border-r-[2px] border-b-[2px] rotate-45"
            ></span>
          </span>
          <!-- Label Text -->
          <span class="font-bold text-sm select-none">
            {{ getFrameworkDisplayName(framework) }}
          </span>
        </label>
      </div>
    </div>
    <span v-if="frameworksError" class="text-red-500 text-xs mt-2 block">{{
      frameworksError
    }}</span>
  </section>
</template>
