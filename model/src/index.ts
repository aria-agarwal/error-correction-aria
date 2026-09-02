import type { InferOutputsType, PlRef } from "@platforma-sdk/model";
import { BlockModelV3, DataModelBuilder } from "@platforma-sdk/model";

export type BlockData = {
  inputRef?: PlRef;
  seqCol: string;
  countCol: string;
  maxHd: number;
  minRatio: number;
  lowerCutoff: number;
};

const dataModel = new DataModelBuilder().from<BlockData>("v1").init(() => ({
  seqCol: "aaSeqCDR3",
  countCol: "readCount",
  maxHd: 2,
  minRatio: 100,
  lowerCutoff: 5,
}));

export const platforma = BlockModelV3.create(dataModel)

  .args((data) => ({
    inputRef: data.inputRef,
    seqCol: data.seqCol,
    countCol: data.countCol,
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
