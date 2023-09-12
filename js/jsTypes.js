// "use strict";

function form1Output1OnInput() {
  const formIdPrefix = "form1";
  const input1 = document.getElementById(`${formIdPrefix}_input1`);
  const input2 = document.getElementById(`${formIdPrefix}_input2`);
  const output1 = document.getElementById(`${formIdPrefix}_output1`);
  output1.value = input1.value + input2.value;
}

function form2Output1OnInput() {
  const formIdPrefix = "form2";
  const input1 = document.getElementById(`${formIdPrefix}_input1`);
  const input2 = document.getElementById(`${formIdPrefix}_input2`);
  const output1 = document.getElementById(`${formIdPrefix}_output1`);
  output1.value = parseInt(input1.value) + parseInt(input2.value);
}

function form3Output1OnInput() {
  const formIdPrefix = "form3";
  const input1 = document.getElementById(`${formIdPrefix}_input1`);
  const input2 = document.getElementById(`${formIdPrefix}_input2`);
  const output1 = document.getElementById(`${formIdPrefix}_output1`);
  output1.value = parseFloat(input1.value) + parseFloat(input2.value);
}

let tmpMap = new Map();
tmpMap.set("null", () => null);
tmpMap.set("undefined", () => undefined);
tmpMap.set("Boolean", (input) => Boolean(input));
tmpMap.set("NaN", () => NaN);
tmpMap.set("Number", (input) => Number(input));
tmpMap.set("Number.NaN", () => Number.NaN);
tmpMap.set("+Infinity", () => +Infinity);
tmpMap.set("-Infinity", () => -Infinity);
tmpMap.set("Number.POSITIVE_INFINITY", () => Number.POSITIVE_INFINITY);
tmpMap.set("Number.NEGATIVE_INFINITY", () => Number.NEGATIVE_INFINITY);
tmpMap.set("+Number.MAX_VALUE", () => +Number.MAX_VALUE);
tmpMap.set("-Number.MAX_VALUE", () => -Number.MAX_VALUE);
tmpMap.set("Number.MAX_SAFE_INTEGER", () => Number.MAX_SAFE_INTEGER);
tmpMap.set("Number.MIN_SAFE_INTEGER", () => Number.MIN_SAFE_INTEGER);
tmpMap.set("+0", () => -0);
tmpMap.set("-0", () => +0);
tmpMap.set("+Number.MIN_VALUE", () => +Number.MIN_VALUE);
tmpMap.set("-Number.MIN_VALUE", () => -Number.MIN_VALUE);
tmpMap.set("Number.EPSILON", () => Number.EPSILON);
tmpMap.set("Number.prototype", () => Number.prototype);
tmpMap.set("BigInt", (input) => BigInt(input));
tmpMap.set("Integer", (input) => Number.parseInt(input));
tmpMap.set("Float", (input) => Number.parseFloat(input));
tmpMap.set("Symbol", (input) => Symbol(input));
tmpMap.set("String", (input) => String(input));
tmpMap.set("Array", (input) => {
  return [input];
});
tmpMap.set("Object", (input) => {
  return { object_property: "not displayed" };
});
const inputOptions = tmpMap;

function populateSelectOptions(htmlSelect, selectedOptionKey) {
  inputOptions.forEach((value, key, map) => {
    const htmlInputOption = document.createElement("option");
    htmlInputOption.value = key;
    htmlInputOption.text = key;
    if (selectedOptionKey === key) {
      htmlInputOption.selected = "selected";
    }
    htmlSelect.add(htmlInputOption);
  });
}

function populateForm(formIdPrefix, input1TypeKey, input2TypeKey) {
  const input1Type = document.getElementById(`${formIdPrefix}_input1_type`);
  populateSelectOptions(input1Type, input1TypeKey);
  const input2Type = document.getElementById(`${formIdPrefix}_input2_type`);
  populateSelectOptions(input2Type, input2TypeKey);
}

function parseFormInputsAndCompare(formIdPrefix, comparisonFunction) {
  const input1 = document.getElementById(`${formIdPrefix}_input1`);
  const input2 = document.getElementById(`${formIdPrefix}_input2`);
  const input1Type = document.getElementById(`${formIdPrefix}_input1_type`);
  const input2Type = document.getElementById(`${formIdPrefix}_input2_type`);
  const input1Value = inputOptions
    .get(input1Type.value)
    .call(null, input1.value);
  const input2Value = inputOptions
    .get(input2Type.value)
    .call(null, input2.value);
  input1.value = toInputString(input1Value);
  input2.value = toInputString(input2Value);
  const output1 = document.getElementById(`${formIdPrefix}_output1`);
  const output1Value = comparisonFunction.call(null, input1Value, input2Value);
  output1.value = output1Value;
  if (output1Value === true) {
    output1.style.backgroundColor = "green";
  }
  if (output1Value === false) {
    output1.style.backgroundColor = "red";
  }
}

function toInputString(parsedByTypeValue) {
  return parsedByTypeValue === null
    ? "null"
    : parsedByTypeValue === undefined
    ? "undefined"
    : parsedByTypeValue.toString();
}

function form4Output1OnInput() {
  parseFormInputsAndCompare("form4", (input1, input2) => input1 == input2);
}

function form5Output1OnInput() {
  parseFormInputsAndCompare("form5", (input1, input2) => input1 === input2);
}

function form6Output1OnInput() {
  parseFormInputsAndCompare("form6", (input1, input2) => input1 == input2);
}

function form7Output1OnInput() {
  parseFormInputsAndCompare("form7", (input1, input2) => input1 === input2);
}

function form8Output1OnInput() {
  parseFormInputsAndCompare("form8", (input1, input2) => input1 == input2);
}

function form9Output1OnInput() {
  parseFormInputsAndCompare("form9", (input1, input2) => input1 === input2);
}

function form10Output1OnInput() {
  parseFormInputsAndCompare("form10", (input1, input2) => input1 == input2);
}

function form11Output1OnInput() {
  parseFormInputsAndCompare("form11", (input1, input2) => input1 === input2);
}

function form12Output1OnInput() {
  parseFormInputsAndCompare("form12", (input1, input2) => input1 == input2);
}

function form13Output1OnInput() {
  parseFormInputsAndCompare("form13", (input1, input2) => input1 === input2);
}

function form14Output1OnInput() {
  parseFormInputsAndCompare("form14", (input1, input2) => input1 == input2);
}

function form15Output1OnInput() {
  parseFormInputsAndCompare("form15", (input1, input2) => input1 === input2);
}

function form16Output1OnInput() {
  parseFormInputsAndCompare("form16", (input1, input2) => input1 == input2);
}

function form17Output1OnInput() {
  parseFormInputsAndCompare("form17", (input1, input2) => input1 === input2);
}

form1Output1OnInput();
form2Output1OnInput();
form3Output1OnInput();

populateForm("form4", "null", "null");
form4Output1OnInput();

populateForm("form5", "null", "null");
form5Output1OnInput();

populateForm("form6", "null", "String");
form6Output1OnInput();

populateForm("form7", "null", "String");
form7Output1OnInput();

populateForm("form8", "null", "undefined");
form8Output1OnInput();

populateForm("form9", "null", "undefined");
form9Output1OnInput();

populateForm("form10", "undefined", "undefined");
form10Output1OnInput();

populateForm("form11", "undefined", "undefined");
form11Output1OnInput();

populateForm("form12", "NaN", "NaN");
form12Output1OnInput();

populateForm("form13", "NaN", "NaN");
form13Output1OnInput();

populateForm("form14", "Number", "String");
form14Output1OnInput();

populateForm("form15", "Number", "String");
form15Output1OnInput();

populateForm("form16", "Symbol", "Symbol");
form16Output1OnInput();

populateForm("form17", "Symbol", "Symbol");
form17Output1OnInput();
