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
    <PlTextField v-model="app.model.data.seqCol" label="CDR3 column" />
    <PlTextField v-model="app.model.data.countCol" label="Count column" />
    <PlTextField v-model="app.model.data.fullLengthCol" label="Full-length column (optional)" />
    <PlTextField v-model="app.model.data.cdr1Col" label="CDR1 column (optional)" />
    <PlTextField v-model="app.model.data.cdr2Col" label="CDR2 column (optional)" />
    <PlTextField v-model="app.model.data.fr1Col" label="Framework 1 column (optional)" />
    <PlTextField v-model="app.model.data.fr2Col" label="Framework 2 column (optional)" />
    <PlTextField v-model="app.model.data.fr3Col" label="Framework 3 column (optional)" />
    <PlTextField v-model="app.model.data.fr4Col" label="Framework 4 column (optional)" />
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
    <pre v-if="app.model.outputs.pythonMessage">{{ app.model.outputs.pythonMessage }}</pre>
  </PlBlockPage>
</template>
