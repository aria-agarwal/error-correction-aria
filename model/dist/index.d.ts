import * as _$_platforma_sdk_model0 from "@platforma-sdk/model";
import { InferOutputsType, PlRef } from "@platforma-sdk/model";

//#region src/index.d.ts
type BlockData = {
  inputRef?: PlRef;
  seqCol: string;
  countCol: string;
  maxHd: number;
  minRatio: number;
  lowerCutoff: number;
};
declare const platforma: _$_platforma_sdk_model0.PlatformaExtended<_$_platforma_sdk_model0.PlatformaV3<BlockData, {
  inputRef: Readonly<{
    __isRef: true;
    blockId: string;
    name: string;
    requireEnrichments?: true | undefined;
  }> | undefined;
  seqCol: string;
  countCol: string;
  maxHd: number;
  minRatio: number;
  lowerCutoff: number;
}, _$_platforma_sdk_model0.InferOutputsFromLambdas<{
  inputOptions: _$_platforma_sdk_model0.ConfigRenderLambda<{
    readonly ref: {
      readonly __isRef: true;
      readonly blockId: string;
      readonly name: string;
      readonly requireEnrichments?: true | undefined | undefined;
    };
    readonly label: string;
  }[]>;
} & {
  isRunning: _$_platforma_sdk_model0.ConfigRenderLambda<boolean>;
} & {
  pythonMessage: _$_platforma_sdk_model0.ConfigRenderLambda<string | undefined>;
} & {
  hasResult: _$_platforma_sdk_model0.ConfigRenderLambda<boolean>;
}>, "/", {}, _$_platforma_sdk_model0.BlockDefaultUiServices>>;
type BlockOutputs = InferOutputsType<typeof platforma>;
//#endregion
export { BlockData, BlockOutputs, platforma };
//# sourceMappingURL=index.d.ts.map