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
        class="flex items-center border-2 border-gray-200 py-4 px-8 rounded-lg cursor-pointer"
      >
        <input
          type="checkbox"
          :id="'field-frameworks-' + framework"
          :value="framework"
          v-model="frameworks"
          class="mr-3 h-4 w-4 rounded border-gray-300 text-orange-600 focus-visible:ring-orange-500"
          :class="{ 'border-red-500': !!frameworksError }"
        />
        <label
          :for="'framework-' + framework"
          class="font-bold text-sm select-none"
        >
          {{ getFrameworkDisplayName(framework) }}
        </label>
      </div>
    </div>
    <span v-if="frameworksError" class="text-red-500 text-xs mt-2 block">{{
      frameworksError
    }}</span>
  </section>
</template>
