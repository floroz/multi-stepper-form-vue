<script setup lang="ts">
import { useField } from "vee-validate";
import { SkillLevel } from "./types";

// Use useField for skillLevel
const {
  value: skillLevel,
  errorMessage: skillLevelError,
  setValue: setSkillLevel,
} = useField<SkillLevel | undefined>("skillLevel");
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Skill Level</h3>
    <p class="mb-4 text-sm">Please select your skill level</p>

    <div class="grid grid-cols-2 grid-rows-1 gap-8">
      <div class="flex flex-col">
        <button
          id="field-skillLevel"
          type="button"
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Beginner,
          }"
          @click="setSkillLevel(SkillLevel.Beginner)"
        >
          Beginner
        </button>
      </div>
      <div class="flex flex-col">
        <button
          type="button"
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Intermediate,
          }"
          @click="setSkillLevel(SkillLevel.Intermediate)"
        >
          Intermediate
        </button>
      </div>
      <div class="flex flex-col">
        <button
          type="button"
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Advanced,
          }"
          @click="setSkillLevel(SkillLevel.Advanced)"
        >
          Advanced
        </button>
      </div>
      <div class="flex flex-col">
        <button
          type="button"
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Expert,
          }"
          @click="setSkillLevel(SkillLevel.Expert)"
        >
          Expert
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
