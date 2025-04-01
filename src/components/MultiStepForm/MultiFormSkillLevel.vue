<script setup lang="ts">
import { SkillLevel } from "./types";

const skillLevel = defineModel({
  required: true,
  default: "",
  type: String,
});
</script>

<template>
  <section class="border-y-1 border-gray-200 p-8">
    <h3 class="text-lg font-bold">Skill Level</h3>
    <p class="mb-4 text-sm">Review and Confirm</p>

    <div class="grid grid-cols-2 grid-rows-1 gap-8">
      <div class="flex flex-col">
        <button
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Beginner,
          }"
          @click="skillLevel = SkillLevel.Beginner"
        >
          Beginner
        </button>
      </div>
      <div class="flex flex-col">
        <button
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Intermediate,
          }"
          @click="skillLevel = SkillLevel.Intermediate"
        >
          Intermediate
        </button>
      </div>
      <div class="flex flex-col">
        <button
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Advanced,
          }"
          @click="skillLevel = SkillLevel.Advanced"
        >
          Advanced
        </button>
      </div>
      <div class="flex flex-col">
        <button
          class="border-2 border-gray-200 py-4 px-8 rounded-lg font-bold text-sm"
          :class="{
            'border-orange-500': skillLevel === SkillLevel.Expert,
          }"
          @click="skillLevel = SkillLevel.Expert"
        >
          Expert
        </button>
      </div>
    </div>
  </section>
</template>
