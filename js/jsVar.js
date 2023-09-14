// "use strict";

var globalScopeVar = "global_scope_value";
createCodeOutput(
  "codeOutput1",
  "VAR - scope: function vs. global scope",
  `
var globalScopeVar = "global_scope_value";

  const functionScope = () => {
    var functionScopeVar = "function_scope_value";

    return (
      "globalScopeVar - from function scope: " +
      globalScopeVar +
      ", \n" +
      "functionScopeVar - from function scope: " +
      functionScopeVar
    );
  };

  var functionScopeVarReference;
  try {
    functionScopeVarReference = functionScopeVar;  // functionScopeVar is not declared in global scope
  } catch (e) {
    functionScopeVarReference = e.toString();
  }

  return (
    functionScope() +
    ", \n" +
    "globalScopeVar - from global scope: " +
    globalScopeVar +
    ", \n" +
    "functionScopeVar (Reference) - from global scope: " +
    functionScopeVarReference
  );
  `,
  (() => {
    const functionScope = () => {
      var functionScopeVar = "function_scope_value";

      return (
        "globalScopeVar - from function scope: " +
        globalScopeVar +
        ", \n" +
        "functionScopeVar - from function scope: " +
        functionScopeVar
      );
    };

    var functionScopeVarReference;
    try {
      functionScopeVarReference = functionScopeVar; // functionScopeVar is not declared in global scope
    } catch (e) {
      functionScopeVarReference = e.toString();
    }

    return (
      functionScope() +
      ", \n" +
      "globalScopeVar - from global scope: " +
      globalScopeVar +
      ", \n" +
      "functionScopeVar (Reference) - from global scope: " +
      functionScopeVarReference
    );
  })()
);

var aVarSeparatePerScope = "global_scope_value"; // var with separate instance for global and function
createCodeOutput(
  "codeOutput2",
  "VAR - re-declaration",
  `
var aVarSeparatePerScope = "global_scope_value"; // var with separate instance for global and function

  const functionScope = () => {
    // re-declaration (separate instance)
    var aVarSeparatePerScope = "function_scope_value"; // var with separate instance for global and function

    return (
      "aVarSeparatePerScope - from function scope: " + aVarSeparatePerScope
    );
  };

  return (
    functionScope() +
    ", \n" +
    "aVarSeparatePerScope - from global scope: " +
    aVarSeparatePerScope
  );
  `,
  (() => {
    const functionScope = () => {
      // re-declaration (separate instance)
      var aVarSeparatePerScope = "function_scope_value"; // var with separate instance for global and function

      return (
        "aVarSeparatePerScope - from function scope: " + aVarSeparatePerScope
      );
    };

    return (
      functionScope() +
      ", \n" +
      "aVarSeparatePerScope - from global scope: " +
      aVarSeparatePerScope
    );
  })()
);

var aVarOverwritten = "global_scope_value"; // var which value will be overwritten in function scope
createCodeOutput(
  "codeOutput3",
  "VAR - update/overwriting",
  `
var aVarOverwritten = "global_scope_value"; // var which value will be overwritten in function scope

  const functionScope = () => {
    // update/overwriting (value update, same (global) instance)
    aVarOverwritten = "function_scope_value"; // overwriting var which initial value was set in global scope, also replaces global scope value

    return "aVarOverwritten - from function scope: " + aVarOverwritten;
  };

  return (
    functionScope() +
    ", \n" +
    "aVarOverwritten - from global scope: " +
    aVarOverwritten // also here aVarOverwritten has value overwritten in lower scope
  );
  `,
  (() => {
    const functionScope = () => {
      // update/overwriting (value update, same (global) instance)
      aVarOverwritten = "function_scope_value"; // overwriting var which initial value was set in global scope, also replaces global scope value

      return "aVarOverwritten - from function scope: " + aVarOverwritten;
    };

    return (
      functionScope() +
      ", \n" +
      "aVarOverwritten - from global scope: " +
      aVarOverwritten // also here aVarOverwritten has value overwritten in lower scope
    );
  })()
);

createCodeOutput(
  "codeOutput4",
  "VAR - hoisting",
  `
  // hoisting
  // aVarHoisted variable is not even declared yet
  // declaration of var variable is moved to top of the scope
  // initialization (to expected value) stays at same spot
  var aVarHoistedReference = aVarHoisted; // aVarHoisted is not initialized to correct value yet, it's initialized to undefined
  var aVarHoisted = "value";

  return (
    "aVarHoistedReference: " +
    aVarHoistedReference +
    ", \n" +
    "aVarHoisted: " +
    aVarHoisted
  );
  `,
  (() => {
    // hoisting
    // aVarHoisted variable is not even declared yet
    // declaration of var variable is moved to top of the scope
    // initialization (to expected value) stays at same spot
    var aVarHoistedReference = aVarHoisted; // aVarHoisted is not initialized to correct value yet, it's initialized to undefined
    var aVarHoisted = "value";

    return (
      "aVarHoistedReference: " +
      aVarHoistedReference +
      ", \n" +
      "aVarHoisted: " +
      aVarHoisted
    );
  })()
);

createCodeOutput(
  "codeOutput5",
  "VAR - scope (without hoisting)",
  `
  // higher scope
  var aVar = "higher_scope_value"; // higher scope variable
  const lowerScopeFunction = () => {
    // lower scope
    var aVarReference = aVar; // aVar from higher scope is already declared and initiated, no hoisting involved
    return (
      "aVarReference from lower scope: " +
      aVarReference +
      ", \n" +
      "aVar from lower scope: " +
      aVar
    );
  };

  return "aVar from higher scope: " + aVar + ", \n" + lowerScopeFunction();
  `,
  (() => {
    // higher scope
    var aVar = "higher_scope_value"; // higher scope variable
    const lowerScopeFunction = () => {
      // lower scope
      var aVarReference = aVar; // aVar from higher scope is already declared and initiated, no hoisting involved
      return (
        "aVarReference from lower scope: " +
        aVarReference +
        ", \n" +
        "aVar from lower scope: " +
        aVar
      );
    };

    return "aVar from higher scope: " + aVar + ", \n" + lowerScopeFunction();
  })()
);

createCodeOutput(
  "codeOutput6",
  "VAR - hoisting + scope",
  `
  (() => {
    // higher scope
    var aVar = "higher_scope_value"; // higher scope variable
    const lowerScopeFunction = () => {
      // lower scope
      // hoisting - aVar is declared before being used, hides aVar from higher scope
      var aVarReference = aVar; // aVar is not initiated yet
      var aVar = "lower_scope_value"; // lower scope variable
      return (
        "aVarReference from lower scope: " +
        aVarReference +
        ", \n" +
        "aVar from lower scope: " +
        aVar
      );
    };

    return "aVar from higher scope: " + aVar + ", \n" + lowerScopeFunction();
  `,
  (() => {
    // higher scope
    var aVar = "higher_scope_value"; // higher scope variable
    const lowerScopeFunction = () => {
      // lower scope
      // hoisting - aVar is declared before being used, hides aVar from higher scope
      var aVarReference = aVar; // aVar is not initiated yet
      var aVar = "lower_scope_value"; // lower scope variable
      return (
        "aVarReference from lower scope: " +
        aVarReference +
        ", \n" +
        "aVar from lower scope: " +
        aVar
      );
    };

    return "aVar from higher scope: " + aVar + ", \n" + lowerScopeFunction();
  })()
);
