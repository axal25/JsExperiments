// "use strict";

createCodeOutput(
  "codeOutput2",
  "Anonymous function / lambda",
  `
    const functionObject = () => "anonymous function";
    return functionObject;
    `,
  (() => {
    const functionObject = () => "anonymous function";
    return functionObject;
  }).call(null)
);

createCodeOutput(
  "codeOutput3",
  "self-invoking function #1",
  `
    // additional "()", calling the function object
    const selfInvokingFunction = (() => "self-invoking function")();
    return selfInvokingFunction;
    `,
  (() => {
    // additional "()", calling the function object
    const selfInvokingFunction = (() => "self-invoking function")();
    return selfInvokingFunction;
  }).call(null)
);

createCodeOutput(
  "codeOutput4",
  "self-invoking function #2",
  `
      // additional ".call(null)", calling the function object
      const selfReference = null;
      const selfInvokingFunction = (() => "self-invoking function").call(selfReference);
      return selfInvokingFunction;
    `,
  (() => {
    // additional ".call(null)", calling the function object
    const selfReference = null;
    const selfInvokingFunction = (() => "self-invoking function").call(
      selfReference
    );
    return selfInvokingFunction;
  })()
);

createCodeOutput(
  "codeOutput5",
  "closure",
  `
    var counter = -100; // if "use strict" is used
    // function that will be self-invoked, only once
    const count = (function () { /* bla */
      // local variable, initialized only once
      let counter = 0; // bla
      // returns another function that "replaces" self-invoking function
      // self-invoking function is never actually assined to "count" variable
      // self-invoking function only initilizes "counter" variable and returns actual function to be used when calling "count()"
      return function () {
        // has reference to variable from scope of self-invoking function, from parent scope
        // this is closure - private function variable - variable access protected by anonymous (self-invoking) function scope
        counter += 1;
        return counter;
      };
      // function self-invocation
    })();
    // cannot access counter from self-invoking function scope
    // initilizes another instance of count (if "use strict" is not used)
    counter = -10;
    count();
    counter--;
    count();
    counter--;
    return "count output: " + count() + "\n" + "counter value: " + counter;
  `,
  (() => {
    var counter = -100; // if "use strict" is used
    // function that will be self-invoked, only once
    const count = (function () {
      // local variable, initialized only once
      let counter = 0;
      // returns another function that "replaces" self-invoking function
      // self-invoking function is never actually assined to "count" variable
      // self-invoking function only initilizes "counter" variable and returns actual function to be used when calling "count()"
      return function () {
        // has reference to variable from scope of self-invoking function, from parent scope
        // this is closure - private function variable - variable access protected by anonymous (self-invoking) function scope
        counter += 1;
        return counter;
      };
      // function self-invocation
    })();
    // cannot access counter from self-invoking function scope
    // initilizes another instance of count (if "use strict" is not used)
    counter = -10;
    count();
    counter--;
    count();
    counter--;
    return "count output: " + count() + "\n" + "counter value: " + counter;
  })()
);
