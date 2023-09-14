// "use strict";

createCodeOutput(
  "codeOutput1",
  "CONST - mandatory initiation",
  `
  // const aVar; // must be initiate with a value - SyntaxError: Missing initializer in const declaration
  const aVar = "  ";
  return aVar;
  `,
  (() => {
    // const aVar; // must be initiate with a value - SyntaxError: Missing initializer in const declaration
    const aVar = "value";
    return aVar;
  })()
);

createCodeOutput(
  "codeOutput2",
  "CONST - block scope - for scope",
  `
  // higher scope
  const higherScopeVar = "higher_scope_value";
  
  let lowerScopeForOutput;
  for (let i = 0; i < 1; i++) {
    // lower scope - for block
    const lowerScopeVar = "lower_scope_value_" + i; // lower scope variable
    lowerScopeForOutput =
      "lowerScopeVar - from for(...): " +
      lowerScopeVar +
      ", \n" +
      "higherScopeVar - from for(...): " +
      higherScopeVar; // higher / wider scope variable will be visible in lower / narrower scope
  }

  let lowerScopeVarReference;
  try {
    lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
  } catch (e) {
    lowerScopeVarReference = e; // will cause error
  }

  return (
    lowerScopeForOutput +
    ", \n\n" +
    "higherScopeVar - from higher scope: " +
    higherScopeVar +
    ", \n" +
    "lowerScopeVar (Reference) - from higher scope: " +
    lowerScopeVarReference
  );
  `,
  (() => {
    // higher scope
    const higherScopeVar = "higher_scope_value";

    let lowerScopeForOutput;
    for (let i = 0; i < 1; i++) {
      // lower scope - for block
      const lowerScopeVar = "lower_scope_value_" + i; // lower scope variable
      lowerScopeForOutput =
        "lowerScopeVar - from for(...): " +
        lowerScopeVar +
        ", \n" +
        "higherScopeVar - from for(...): " +
        higherScopeVar; // higher / wider scope variable will be visible in lower / narrower scope
    }

    let lowerScopeVarReference;
    try {
      lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
    } catch (e) {
      lowerScopeVarReference = e; // will cause error
    }

    return (
      lowerScopeForOutput +
      ", \n\n" +
      "higherScopeVar - from higher scope: " +
      higherScopeVar +
      ", \n" +
      "lowerScopeVar (Reference) - from higher scope: " +
      lowerScopeVarReference
    );
  })()
);

createCodeOutput(
  "codeOutput3",
  "CONST - redeclaration (same scope) not allowed vs. value update",
  `
  // higher scope
  const aVar = "original_value";

  let aVarValueUpdateReference;
  try {
    // lower scope
    aVar = "updated_value"; // const variable value update is not allowed
    aVarValueUpdateReference = aVar;
  } catch (e) {
    aVarValueUpdateReference = e.toString(); // will throw error
  }

  // const aVar = "same_scope_redeclared_value"; // same scope redeclaration NOT allowed - SyntaxError: Identifier 'aVar' has already been declared

  let aVarTryBlockRedeclarationReference;
  try {
    const aVar = "try-catch-block_scope_value"; // different scope redeclaration allowed - different scope: try-block, value will be lost ouside of try-block
    aVarTryBlockRedeclarationReference = aVar;
  } catch (e) {
    aVarTryBlockRedeclarationReference = e.toString();
  }

  return (
    "aVar: " +
    aVar + // aVar original value
    ", \n" +
    "aVar update value result: " +
    aVarValueUpdateReference + // aVar value update attempt error
    ", \n" +
    "aVar try-block redeclaration (Reference): " +
    aVarTryBlockRedeclarationReference // aVar value from try-block scope
  );
  `,
  (() => {
    // higher scope
    const aVar = "original_value";

    let aVarValueUpdateReference;
    try {
      // lower scope
      aVar = "updated_value"; // const variable value update is not allowed
      aVarValueUpdateReference = aVar;
    } catch (e) {
      aVarValueUpdateReference = e.toString(); // will throw error
    }

    // const aVar = "same_scope_redeclared_value"; // same scope redeclaration NOT allowed - SyntaxError: Identifier 'aVar' has already been declared

    let aVarTryBlockRedeclarationReference;
    try {
      const aVar = "try-catch-block_scope_value"; // different scope redeclaration allowed - different scope: try-block, value will be lost ouside of try-block
      aVarTryBlockRedeclarationReference = aVar;
    } catch (e) {
      aVarTryBlockRedeclarationReference = e.toString();
    }

    return (
      "aVar: " +
      aVar + // aVar original value
      ", \n" +
      "aVar update value result: " +
      aVarValueUpdateReference + // aVar value update attempt error
      ", \n" +
      "aVar try-block redeclaration (Reference): " +
      aVarTryBlockRedeclarationReference // aVar value from try-block scope
    );
  })()
);

createCodeOutput(
  "codeOutput4",
  "CONST - hoisting",
  `
  let aVarHoistedReference;
  try {
    // hoisting
    // aVarHosited variable is not even declared yet
    // declaration of const variable is moved to top of the scope
    // initialization (to expected value) stays at same spot
    aVarHoistedReference = aVarHoisted;
  } catch (e) {
    aVarHoistedReference = e.toString();
  }

  const aVarHoisted = "value";

  return (
    "aVarHoistedReference: " +
    aVarHoistedReference +
    ", \n" +
    "aVarHoisted: " +
    aVarHoisted
  );
  `,
  (() => {
    let aVarHoistedReference;
    try {
      // hoisting
      // aVarHosited variable is not even declared yet
      // declaration of const variable is moved to top of the scope
      // initialization (to expected value) stays at same spot
      aVarHoistedReference = aVarHoisted;
    } catch (e) {
      aVarHoistedReference = e.toString();
    }

    const aVarHoisted = "value";

    return (
      "aVarHoistedReference: " +
      aVarHoistedReference +
      ", \n" +
      "aVarHoisted: " +
      aVarHoisted
    );
  })()
);
