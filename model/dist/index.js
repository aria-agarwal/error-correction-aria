import { BlockModelV3, DataModelBuilder } from "@platforma-sdk/model";
//#region src/index.ts
const dataModel = new DataModelBuilder().from("v1").init(() => ({ name: "" }));
const platforma = BlockModelV3.create(dataModel).args((data) => ({ name: data.name })).output("tengoMessage", (ctx) => ctx.outputs?.resolve("tengoMessage")?.getDataAsJson()).output("pythonMessage", (ctx) => ctx.outputs?.resolve("pythonMessage")?.getDataAsString()).sections((_ctx) => [{
	type: "link",
	href: "/",
	label: "Main"
}]).done();
//#endregion
export { platforma };

//# sourceMappingURL=index.js.map