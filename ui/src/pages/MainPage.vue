<script setup lang="ts">
import { PlBlockPage, PlDropdownRef, PlNumberField, PlTextField } from "@platforma-sdk/ui-vue";
import { useApp } from "../app";

const app = useApp();
</script>

<template>
  <PlBlockPage title="Custom Error Correction">
    <PlDropdownRef
      v-model="app.model.data.inputRef"
      label="VDJ dataset"
      :options="app.model.outputs.inputOptions"
    />
    <PlTextField v-model="app.model.data.seqCol" label="Sequence column" />
    <PlTextField v-model="app.model.data.countCol" label="Count column" />
    <PlNumberField
      v-model="app.model.data.maxHd"
      label="Max Hamming distance"
      :min-value="1"
      :step="1"
    />
    <PlNumberField
      v-model="app.model.data.minRatio"
      label="Min abundance ratio"
      :min-value="1"
      :step="1"
    />
    <PlNumberField
      v-model="app.model.data.lowerCutoff"
      label="Lower count cutoff"
      :min-value="0"
      :step="1"
    />
  </PlBlockPage>
</template>
