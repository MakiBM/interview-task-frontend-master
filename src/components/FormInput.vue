<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  label: string
  modelValue: string | null
  name: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="form-input" :for="name" :title="name">
    <input
      class="form-input__input"
      type="text"
      :placeholder="label"
      :id="name"
      :value="modelValue"
      @input="(event) => $emit('update:modelValue', (event.target as HTMLInputElement).value)"
    />

    <!-- Use for icon -->
    <slot></slot>
  </div>
</template>

<style scoped>
.form-input {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;
  padding: 12px 16px;
}

.form-input:focus-within {
  border-color: #1952E1;
}

.form-input:focus-within::after {
  content: attr(title);
  z-index: 2;
  position: absolute;
  top: -9px;
  left: 8px;
  padding: 0 8px;
  font-size: 10px;
  color: #63666E;
  background: #fff;
  text-transform: capitalize;
}

.form-input__input {
  width: 100%;
  padding: 12px 8px 12px 0;
  font-size: 12px;
  border: 0;
  background-color: transparent;
}

.form-input__input:focus {
  outline: none;
}
</style>
