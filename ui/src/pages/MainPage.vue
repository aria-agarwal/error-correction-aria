<script setup lang="ts">
import { ref } from "vue";
import {
  PlAccordion,
  PlAccordionSection,
  PlBlockPage,
  PlBtnGhost,
  PlDropdownRef,
  PlNumberField,
  PlSectionSeparator,
  PlSlideModal,
  PlTextField,
} from "@platforma-sdk/ui-vue";
import { PlToggleSwitch } from "@milaboratories/uikit";
import { useApp } from "../app";

const app = useApp();
const filtersOpen = ref(false);
</script>

<template>
  <PlBlockPage title="Custom Error Correction">
    <template #append>
      <PlBtnGhost @click.stop="() => (filtersOpen = true)">Length filters</PlBtnGhost>
    </template>
    <PlDropdownRef
      v-model="app.model.data.inputRef"
      label="VDJ dataset"
      :options="app.model.outputs.inputOptions"
    />
    <PlTextField v-model="app.model.data.seqCol" label="CDR3 column" />
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

    <PlSlideModal v-model="filtersOpen" title="Length filters" :close-on-outside-click="true">
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
      <PlToggleSwitch v-model="app.model.data.filterCdr1Length" label="Filter by CDR1 length" />
      <template v-if="app.model.data.filterCdr1Length">
        <PlNumberField
          v-model="app.model.data.cdr1MinLength"
          label="CDR1 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.cdr1MaxLength"
          label="CDR1 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
      <PlToggleSwitch v-model="app.model.data.filterCdr2Length" label="Filter by CDR2 length" />
      <template v-if="app.model.data.filterCdr2Length">
        <PlNumberField
          v-model="app.model.data.cdr2MinLength"
          label="CDR2 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.cdr2MaxLength"
          label="CDR2 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
      <PlToggleSwitch
        v-model="app.model.data.filterFr1Length"
        label="Filter by Framework 1 length"
      />
      <template v-if="app.model.data.filterFr1Length">
        <PlNumberField
          v-model="app.model.data.fr1MinLength"
          label="FR1 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.fr1MaxLength"
          label="FR1 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
      <PlToggleSwitch
        v-model="app.model.data.filterFr2Length"
        label="Filter by Framework 2 length"
      />
      <template v-if="app.model.data.filterFr2Length">
        <PlNumberField
          v-model="app.model.data.fr2MinLength"
          label="FR2 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.fr2MaxLength"
          label="FR2 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
      <PlToggleSwitch
        v-model="app.model.data.filterFr3Length"
        label="Filter by Framework 3 length"
      />
      <template v-if="app.model.data.filterFr3Length">
        <PlNumberField
          v-model="app.model.data.fr3MinLength"
          label="FR3 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.fr3MaxLength"
          label="FR3 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
      <PlToggleSwitch
        v-model="app.model.data.filterFr4Length"
        label="Filter by Framework 4 length"
      />
      <template v-if="app.model.data.filterFr4Length">
        <PlNumberField
          v-model="app.model.data.fr4MinLength"
          label="FR4 length greater than or equal to"
          :min-value="0"
          :step="1"
        />
        <PlNumberField
          v-model="app.model.data.fr4MaxLength"
          label="FR4 length less than or equal to"
          :min-value="0"
          :step="1"
        />
      </template>
    </PlSlideModal>

    <pre v-if="app.model.outputs.pythonMessage">{{ app.model.outputs.pythonMessage }}</pre>
  </PlBlockPage>
</template>
