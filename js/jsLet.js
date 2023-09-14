// "use strict";

createCodeOutput(
  "codeOutput1",
  "LET - block scope - function block",
  `
    // higher scope
    let highterScopeVar = "higher_scope_value"; // higher scope variable
  
    const lowerScopeFunction = () => {
      // lower scope - function block
      let lowerScopeVar = "lower_scope_value"; // lower scope variable
      return (
        "lowerScopeVar - from lowerScopeFunction(): " +
        lowerScopeVar +
        ", \n" +
        "higherScopeVar - from lowerScopeFunction(): " +
        highterScopeVar // higher / wider scope variable will be visible in lower / narrower scope
      );
    };
  
    let lowerScopeVarReference;
    try {
      lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
    } catch (e) {
      lowerScopeVarReference = e; // will cause an error
    }
  
    return (
      lowerScopeFunction() +
      ", \n\n" +
      "highterScopeVar - from higherScope: " +
      highterScopeVar +
      ", \n" +
      "lowerScopeVar1 (Reference) - from higherScope: " +
      lowerScopeVarReference
    );
    `,
  (() => {
    // higher scope
    let highterScopeVar = "higher_scope_value"; // higher scope variable

    const lowerScopeFunction = () => {
      // lower scope - function block
      let lowerScopeVar = "lower_scope_value"; // lower scope variable
      return (
        "lowerScopeVar - from lowerScopeFunction(): " +
        lowerScopeVar +
        ", \n" +
        "higherScopeVar - from lowerScopeFunction(): " +
        highterScopeVar // higher / wider scope variable will be visible in lower / narrower scope
      );
    };

    let lowerScopeVarReference;
    try {
      lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
    } catch (e) {
      lowerScopeVarReference = e; // will cause an error
    }

    return (
      lowerScopeFunction() +
      ", \n\n" +
      "highterScopeVar - from higherScope: " +
      highterScopeVar +
      ", \n" +
      "lowerScopeVar1 (Reference) - from higherScope: " +
      lowerScopeVarReference
    );
  })()
);

createCodeOutput(
  "codeOutput2",
  "LET - block scope - if block",
  `
    // higher scope
    let highterScopeVar = "higher_scope_value"; // higher scope variable
  
    let lowerScopeIfOutput;
    if (true) {
      // lower scope - if block
      let lowerScopeVar = "lower_scope_value"; // lower scope variable
      lowerScopeIfOutput =
        "lowerScopeVar - from lowerScope if(true): " +
        lowerScopeVar +
        ", \n" +
        "higherScopeVar - from lowerScope if(true): " +
        highterScopeVar; // higher / wider scope variable will be visible in lower / narrower scope
    }
  
    let lowerScopeVarReference;
    try {
      lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
    } catch (e) {
      lowerScopeVarReference = e; // will cause an error
    }
  
    return (
      lowerScopeIfOutput +
      ", \n\n" +
      "highterScopeVar - from higherScope: " +
      highterScopeVar +
      ", \n" +
      "lowerScopeVar (Reference) - from higherScope: " +
      lowerScopeVarReference
    );
    `,
  (() => {
    // higher scope
    let highterScopeVar = "higher_scope_value"; // higher scope variable

    let lowerScopeIfOutput;
    if (true) {
      // lower scope - if block
      let lowerScopeVar = "lower_scope_value"; // lower scope variable
      lowerScopeIfOutput =
        "lowerScopeVar - from lowerScope if(true): " +
        lowerScopeVar +
        ", \n" +
        "higherScopeVar - from lowerScope if(true): " +
        highterScopeVar; // higher / wider scope variable will be visible in lower / narrower scope
    }

    let lowerScopeVarReference;
    try {
      lowerScopeVarReference = lowerScopeVar; // lower / narrower scope variable will NOT be visible in higher / wider scope
    } catch (e) {
      lowerScopeVarReference = e; // will cause an error
    }

    return (
      lowerScopeIfOutput +
      ", \n\n" +
      "highterScopeVar - from higherScope: " +
      highterScopeVar +
      ", \n" +
      "lowerScopeVar (Reference) - from higherScope: " +
      lowerScopeVarReference
    );
  })()
);

createCodeOutput(
  "codeOutput3",
  "LET - redeclaration (same scope) not allowed vs. value update",
  `
  // higher scope
  let aVar = "first_value";

  aVar = "second_value"; // value update

  // let aVar = "third_value"; // same scope redeclaration NOT allowed - SyntaxError: Identifier 'aVar' has already been declared

  let aVarTryBlockRedeclarationReference;
  try {
    // lower scope
    let aVar = "third_value"; // different scope redeclaration allowed - different scope: try-block, value will be lost outside of try-block
    aVarTryBlockRedeclarationReference = aVar;
  } catch (e) {
    aVarTryBlockRedeclarationReference = e.toString();
  }

  return (
    "aVar: " +
    aVar + // aVar value from higher scope - aVar value from inside try-block is lost
    ", \n" +
    "aVar try-block redeclaration (Reference): " +
    aVarTryBlockRedeclarationReference
  );
  `,
  (() => {
    // higher scope
    let aVar = "first_value";

    aVar = "second_value"; // value update

    // let aVar = "third_value"; // same scope redeclaration NOT allowed - SyntaxError: Identifier 'aVar' has already been declared

    let aVarTryBlockRedeclarationReference;
    try {
      // lower scope
      let aVar = "third_value"; // different scope redeclaration allowed - different scope: try-block, value will be lost outside of try-block
      aVarTryBlockRedeclarationReference = aVar;
    } catch (e) {
      aVarTryBlockRedeclarationReference = e.toString();
    }

    return (
      "aVar: " +
      aVar + // aVar value from higher scope - aVar value from inside try-block is lost
      ", \n" +
      "aVar try-block redeclaration (Reference): " +
      aVarTryBlockRedeclarationReference
    );
  })()
);

createCodeOutput(
  "codeOutput4",
  "LET - hoisting",
  `
  let aVarHoistedReference;
  try {
    // hoisting
    // aVarHoisted variable is not even declared yet
    // declaration of var variable is moved to top of the scope
    // initialization (to expected value) stays at same spot
    aVarHoistedReference = aVarHoisted; // aVarHoisted is not initilized yet, it will throw error if used
  } catch (e) {
    aVarHoistedReference = e.toString();
  }

  let aVarHoisted = "value";

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
      // aVarHoisted variable is not even declared yet
      // declaration of let variable is moved to top of the scope
      // initialization (to expected value) stays at same spot
      aVarHoistedReference = aVarHoisted; // aVarHoisted is not initilized yet, it will throw error if used
    } catch (e) {
      aVarHoistedReference = e.toString();
    }

    let aVarHoisted = "value";

    return (
      "aVarHoistedReference: " +
      aVarHoistedReference +
      ", \n" +
      "aVarHoisted: " +
      aVarHoisted
    );
  })()
);
