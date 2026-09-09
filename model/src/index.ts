import type { InferOutputsType, PlRef } from "@platforma-sdk/model";
import { BlockModelV3, DataModelBuilder } from "@platforma-sdk/model";

export type BlockData = {
  inputRef?: PlRef;
  seqCol: string;
  countCol: string;
  fullLengthCol: string;
  cdr1Col: string;
  cdr2Col: string;
  fr1Col: string;
  fr2Col: string;
  fr3Col: string;
  fr4Col: string;
  cdr3MinLength: number;
  cdr3MaxLength: number;
  filterCdr3Length: boolean;
  fullLengthMinLength: number;
  fullLengthMaxLength: number;
  cdr1MinLength: number;
  cdr1MaxLength: number;
  cdr2MinLength: number;
  cdr2MaxLength: number;
  fr1MinLength: number;
  fr1MaxLength: number;
  fr2MinLength: number;
  fr2MaxLength: number;
  fr3MinLength: number;
  fr3MaxLength: number;
  fr4MinLength: number;
  fr4MaxLength: number;
  filterFullLength: boolean;
  filterCdr1Length: boolean;
  filterCdr2Length: boolean;
  filterFr1Length: boolean;
  filterFr2Length: boolean;
  filterFr3Length: boolean;
  filterFr4Length: boolean;
  maxHd: number;
  minRatio: number;
  lowerCutoff: number;
};

const dataModel = new DataModelBuilder().from<BlockData>("v1").init(() => ({
  seqCol: "",
  countCol: "",
  fullLengthCol: "",
  cdr1Col: "",
  cdr2Col: "",
  fr1Col: "",
  fr2Col: "",
  fr3Col: "",
  fr4Col: "",
  cdr3MinLength: 0,
  cdr3MaxLength: 10000,
  filterCdr3Length: false,
  fullLengthMinLength: 0,
  fullLengthMaxLength: 10000,
  cdr1MinLength: 0,
  cdr1MaxLength: 10000,
  cdr2MinLength: 0,
  cdr2MaxLength: 10000,
  fr1MinLength: 0,
  fr1MaxLength: 10000,
  fr2MinLength: 0,
  fr2MaxLength: 10000,
  fr3MinLength: 0,
  fr3MaxLength: 10000,
  fr4MinLength: 0,
  fr4MaxLength: 10000,
  filterFullLength: false,
  filterCdr1Length: false,
  filterCdr2Length: false,
  filterFr1Length: false,
  filterFr2Length: false,
  filterFr3Length: false,
  filterFr4Length: false,
  filtercdr1: false,
  filtercdr2: false,
  filterfr1: false,
  filterfr2: false,
  filterfr3: false,
  filterfr4: false,
  maxHd: 2,
  minRatio: 100,
  lowerCutoff: 5,
}));

export const platforma = BlockModelV3.create(dataModel)

  .args((data) => ({
    inputRef: data.inputRef,
    seqCol: data.seqCol,
    countCol: data.countCol,
    fullLengthCol: data.fullLengthCol,
    cdr1Col: data.cdr1Col,
    cdr2Col: data.cdr2Col,
    fr1Col: data.fr1Col,
    fr2Col: data.fr2Col,
    fr3Col: data.fr3Col,
    fr4Col: data.fr4Col,
    cdr3MinLength: data.cdr3MinLength,
    cdr3MaxLength: data.cdr3MaxLength,
    filterCdr3Length: data.filterCdr3Length,
    fullLengthMinLength: data.fullLengthMinLength,
    fullLengthMaxLength: data.fullLengthMaxLength,
    filterFullLength: data.filterFullLength,
    cdr1MinLength: data.cdr1MinLength,
    cdr1MaxLength: data.cdr1MaxLength,
    cdr2MinLength: data.cdr2MinLength,
    cdr2MaxLength: data.cdr2MaxLength,
    fr1MinLength: data.fr1MinLength,
    fr1MaxLength: data.fr1MaxLength,
    fr2MinLength: data.fr2MinLength,
    fr2MaxLength: data.fr2MaxLength,
    fr3MinLength: data.fr3MinLength,
    fr3MaxLength: data.fr3MaxLength,
    fr4MinLength: data.fr4MinLength,
    fr4MaxLength: data.fr4MaxLength,
    filterCdr1Length: data.filterCdr1Length,
    filterCdr2Length: data.filterCdr2Length,
    filterFr1Length: data.filterFr1Length,
    filterFr2Length: data.filterFr2Length,
    filterFr3Length: data.filterFr3Length,
    filterFr4Length: data.filterFr4Length,
    maxHd: data.maxHd,
    minRatio: data.minRatio,
    lowerCutoff: data.lowerCutoff,
  }))

  .output(
    "inputOptions",
    (ctx) =>
      ctx.resultPool.getOptions(
        [
          {
            axes: [{ name: "pl7.app/sampleId" }, { name: "pl7.app/vdj/clonotypeKey" }],
            annotations: { "pl7.app/isAnchor": "true" },
          },
        ],
        {
          label: {
            includeNativeLabel: false,
            forceTraceElements: ["milaboratories.samples-and-data/dataset"],
          },
        },
      ) ?? [],
  )

  .output("isRunning", (ctx) => ctx.outputs?.getIsReadyOrError() === false)

  // Sequence-type property columns of the selected dataset (CDR3, CDR1/2, FR1-4, full length, etc.).
  .output("sequenceColumnOptions", (ctx) => {
    const inputRef = ctx.args?.inputRef;
    if (inputRef === undefined) return [];
    const columns = ctx.resultPool.getAnchoredPColumns(
      { main: inputRef },
      { axes: [{ anchor: "main", idx: 1 }], name: "pl7.app/vdj/sequence" },
    );
    return (columns ?? []).map((col) => {
      const label = col.spec.annotations?.["pl7.app/label"] ?? col.spec.name;
      return { value: label, label };
    });
  })

  // Non-normalized abundance columns of the selected dataset (e.g. read count, UMI count).
  .output("countColumnOptions", (ctx) => {
    const inputRef = ctx.args?.inputRef;
    if (inputRef === undefined) return [];
    const columns = ctx.resultPool.getAnchoredPColumns(
      { main: inputRef },
      {
        axes: [
          { anchor: "main", idx: 0 },
          { anchor: "main", idx: 1 },
        ],
        annotations: { "pl7.app/isAbundance": "true", "pl7.app/abundance/normalized": "false" },
      },
    );
    return (columns ?? []).map((col) => {
      const label = col.spec.annotations?.["pl7.app/label"] ?? col.spec.name;
      return { value: label, label };
    });
  })

  .output("pythonMessage", (ctx) => ctx.outputs?.resolve("pythonMessage")?.getDataAsString())

  // The workflow exports a pframe as `pf`; use its presence as completion signal.
  .output(
    "hasResult",
    (ctx) =>
      ctx.outputs?.resolve({
        field: "pf",
        assertFieldType: "Input",
        allowPermanentAbsence: true,
      }) !== undefined,
  )

  .sections((_ctx) => [{ type: "link", href: "/", label: "Main" }])

  .title(() => "Custom Error Correction")

  .done();

export type BlockOutputs = InferOutputsType<typeof platforma>;
