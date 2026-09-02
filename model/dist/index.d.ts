import * as _$_platforma_sdk_model0 from "@platforma-sdk/model";
import { InferOutputsType } from "@platforma-sdk/model";

//#region src/index.d.ts
type BlockData = {
  name: string;
};
declare const platforma: _$_platforma_sdk_model0.PlatformaExtended<_$_platforma_sdk_model0.PlatformaV3<BlockData, {
  name: string;
}, _$_platforma_sdk_model0.InferOutputsFromLambdas<{
  tengoMessage: _$_platforma_sdk_model0.ConfigRenderLambda<{}>;
} & {
  pythonMessage: _$_platforma_sdk_model0.ConfigRenderLambda<string | undefined>;
}>, "/", {}, _$_platforma_sdk_model0.BlockDefaultUiServices>>;
type BlockOutputs = InferOutputsType<typeof platforma>;
//#endregion
export { BlockData, BlockOutputs, platforma };
//# sourceMappingURL=index.d.ts.map