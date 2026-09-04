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
  fullLengthMinLength: number;
  fullLengthMaxLength: number;
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
  fullLengthMinLength: 0,
  fullLengthMaxLength: 10000,
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
