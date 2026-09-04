<script setup lang="ts">
import {
  PlAccordion,
  PlAccordionSection,
  PlBlockPage,
  PlDropdownRef,
  PlNumberField,
  PlSectionSeparator,
  PlTextField,
} from "@platforma-sdk/ui-vue";
import { PlToggleSwitch } from "@milaboratories/uikit";
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
    <PlSectionSeparator>Optional columns</PlSectionSeparator>
    <PlAccordion>
      <PlAccordionSection label="Sequence segments">
        <PlTextField v-model="app.model.data.fullLengthCol" label="Full-length column" />
        <PlTextField v-model="app.model.data.cdr1Col" label="CDR1 column" />
        <PlTextField v-model="app.model.data.cdr2Col" label="CDR2 column" />
        <PlTextField v-model="app.model.data.fr1Col" label="Framework 1 column" />
        <PlTextField v-model="app.model.data.fr2Col" label="Framework 2 column" />
        <PlTextField v-model="app.model.data.fr3Col" label="Framework 3 column" />
        <PlTextField v-model="app.model.data.fr4Col" label="Framework 4 column" />
      </PlAccordionSection>
    </PlAccordion>
    <PlToggleSwitch v-model="app.model.data.filterCdr3Length" label="Filter by CDR3 length" />
    <template v-if="app.model.data.filterCdr3Length">
      <PlNumberField
        v-model="app.model.data.cdr3MinLength"
        label="CDR3 length greater than or equal to"
        :min-value="0"
        :step="1"
      />
      <PlNumberField
        v-model="app.model.data.cdr3MaxLength"
        label="CDR3 length less than or equal to"
        :min-value="0"
        :step="1"
      />
    </template>
    <PlToggleSwitch v-model="app.model.data.filterFullLength" label="Filter by full length" />
    <template v-if="app.model.data.filterFullLength">
      <PlNumberField
        v-model="app.model.data.fullLengthMinLength"
        label="Full-length greater than or equal to"
        :min-value="0"
        :step="1"
      />
      <PlNumberField
        v-model="app.model.data.fullLengthMaxLength"
        label="Full-length less than or equal to"
        :min-value="0"
        :step="1"
      />
    </template>
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
