<script setup lang="ts">
import { useField } from "vee-validate";
import { SkillLevel } from "./types";
import { ref, onBeforeUpdate, computed } from "vue";
import { useArrowNavigation } from "../../composables/useArrowNavigation";
import { capitalize } from "./helpers";

const {
  value: skillLevel,
  errorMessage: skillLevelError,
  setValue: setSkillLevel,
} = useField<SkillLevel | undefined>("skillLevel");

const containerRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const skillLevelOptions = computed(() => Object.values(SkillLevel)); // Array to loop over

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
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Skill Level</h3>
    <p class="mb-4 text-sm">Please select your skill level</p>

    <div
      ref="containerRef"
      role="radiogroup"
      aria-labelledby="skill-level-heading"
      class="grid grid-cols-2 grid-rows-2 gap-8"
      @keydown="handleKeydown"
    >
      <h4 id="skill-level-heading" class="sr-only">Skill Level Options</h4>
      <div
        v-for="(level, index) in skillLevelOptions"
        :key="level"
        class="flex flex-col"
      >
        <button
          :id="index === 0 ? 'field-skillLevel' : undefined"
          type="button"
          role="radio"
          :aria-checked="skillLevel === level"
          :ref="(el) => setItemRef(el as HTMLElement | null, index)"
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          :class="{
            'border-orange-500 bg-orange-50 text-orange-700':
              skillLevel === level,
          }"
          @click="setSkillLevel(level)"
          @keydown.space.prevent="setSkillLevel(level)"
          @keydown.enter.prevent="setSkillLevel(level)"
        >
          {{ capitalize(level) }}
        </button>
      </div>
    </div>
    <span
      v-if="skillLevelError"
      class="text-red-500 text-xs mt-1 col-span-2 block"
      >{{ skillLevelError }}</span
    >
  </section>
</template>
