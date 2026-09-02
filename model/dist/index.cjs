Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let _platforma_sdk_model = require("@platforma-sdk/model");
//#region src/index.ts
const dataModel = new _platforma_sdk_model.DataModelBuilder().from("v1").init(() => ({ name: "" }));
const platforma = _platforma_sdk_model.BlockModelV3.create(dataModel).args((data) => ({ name: data.name })).output("tengoMessage", (ctx) => ctx.outputs?.resolve("tengoMessage")?.getDataAsJson()).output("pythonMessage", (ctx) => ctx.outputs?.resolve("pythonMessage")?.getDataAsString()).sections((_ctx) => [{
	type: "link",
	href: "/",
	label: "Main"
}]).done();
//#endregion
exports.platforma = platforma;

//# sourceMappingURL=index.cjs.map