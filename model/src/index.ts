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
  filtercdr1: boolean;
  filtercdr2: boolean;
  filterfr1: boolean;
  filterfr2: boolean;
  filterfr3: boolean;
  filterfr4: boolean;
  maxHd: number;
  minRatio: number;
  lowerCutoff: number;
};

const dataModel = new DataModelBuilder().from<BlockData>("v1").init(() => ({
  seqCol: "aaSeqCDR3",
  countCol: "readCount",
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
    fullLengthMinLength: data.fullLengthMinLength,
    fullLengthMaxLength: data.fullLengthMaxLength,
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
