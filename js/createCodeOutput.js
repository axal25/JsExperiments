// "use strict";

function createCodeOutput(
  divId,
  headerContentText,
  codeContentText,
  outputContentText
) {
  const codeOutputHeader = document.createElement("h4");
  codeOutputHeader.id = `${divId}_codeOutputHeader`;
  codeOutputHeader.innerText = headerContentText;

  const codeHeader = document.createElement("h5");
  codeHeader.id = `${divId}_codeHeader`;
  codeHeader.innerText = "Code";

  const codeContent = document.createElement("p");
  codeContent.id = `${divId}_codeContent`;
  codeContent.innerHTML = parseCodeContent(codeContentText);

  const outputHeader = document.createElement("h5");
  outputHeader.id = `${divId}_outputHeader`;
  outputHeader.innerText = "Output";

  const outputContent = document.createElement("p");
  outputContent.id = `${divId}_outputContent`;
  outputContent.innerText = outputContentText;

  const codeOutputDiv = document.createElement("div");
  codeOutputDiv.id = divId;
  codeOutputDiv.className = "code-output";
  codeOutputDiv.appendChild(codeOutputHeader);
  codeOutputDiv.appendChild(codeHeader);
  codeOutputDiv.appendChild(codeContent);
  codeOutputDiv.appendChild(outputHeader);
  codeOutputDiv.appendChild(outputContent);

  const contentItems = document.getElementById("content-items");
  contentItems.appendChild(codeOutputDiv);
}

function parseCodeContent(codeContentText) {
  let trimmedCodeContentText = codeContentText
    .replace("\n", "")
    .substring(0, codeContentText.lastIndexOf("\n"));
  let html = codeContentTextToHtml(trimmedCodeContentText);
  return html;
}

function codeContentTextToHtml(codeContentText) {
  let fragments = [
    {
      name: "comment",
      beginString: "//",
      endString: "\n",
      beginHtml: "<i class='code-comment'>",
      endHtml: "</i><br/>",
    },
    {
      name: "comment",
      beginString: "/*",
      endString: "*/",
      beginHtml: "<i class='code-comment'>",
      endHtml: "</i>",
    },
    {
      name: "string",
      beginString: '"',
      endString: '"',
      beginHtml: "<span class='code-string'>",
      endHtml: "</span>",
      replacements: [{ from: "\n", to: "\\n" }],
    },
    {
      name: "string",
      beginString: "'",
      endString: "'",
      beginHtml: "<span class='code-string'>",
      endHtml: "</span>",
      replacements: [{ from: "\n", to: "\\n" }],
    },
    {
      name: "string",
      beginString: "`",
      endString: "`",
      beginHtml: "<span class='code-string'>",
      endHtml: "</span>",
      replacements: [{ from: "\n", to: "\\n" }],
    },
    {
      name: "new-line",
      beginString: "\n",
      endString: "",
      beginHtml: "<br/>",
      endHtml: "",
    },
    {
      name: "non-breaking-space",
      beginString: "  ",
      endString: "",
      beginHtml: "&nbsp; ",
      endHtml: "",
    },
    {
      name: "function",
      beginString: "function ",
      endString: "",
      beginHtml: "<span class='code-function-var-let-const'>",
      endHtml: "</span> ",
    },
    {
      name: "const",
      beginString: "const",
      endString: "",
      beginHtml: "<span class='code-function-var-let-const'>",
      endHtml: "</span>",
    },
    {
      name: "let",
      beginString: "let",
      endString: "",
      beginHtml: "<span class='code-function-var-let-const'>",
      endHtml: "</span>",
    },
    {
      name: "var",
      beginString: "var",
      endString: "",
      beginHtml: "<span class='code-function-var-let-const'>",
      endHtml: "</span>",
    },
    {
      name: "return",
      beginString: "return",
      endString: "",
      beginHtml: "<span class='code-return'>",
      endHtml: "</span>",
    },
    {
      name: "bracket-open",
      beginString: "(",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
    {
      name: "bracket-close",
      beginString: ")",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
    {
      name: "curly-bracket-open",
      beginString: "{",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
    {
      name: "curly-bracket-close",
      beginString: "}",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
    {
      name: "square-bracket-open",
      beginString: "[",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
    {
      name: "square-bracket-close",
      beginString: "]",
      endString: "",
      beginHtml: "<span class='code-bracket'>",
      endHtml: "</span>",
    },
  ];

  fragments.forEach(
    (fragment) =>
      (fragment.beginIndex = codeContentText.indexOf(fragment.beginString))
  );

  let fragment = fragments.reduce(
    (acc, cur) => {
      if (acc.beginIndex == -1) {
        return cur;
      }
      if (cur.beginIndex === -1) {
        return acc;
      }
      return cur.beginIndex < acc.beginIndex ? cur : acc;
    },
    { name: "initialValue", beginIndex: -1 }
  );

  if (fragment.beginIndex === -1) {
    return codeContentText;
  }

  fragment.currentCodeContentText = codeContentText;
  fragment.beginOffset = fragment.beginIndex + fragment.beginString.length;
  fragment.endSubstring = codeContentText.substring(fragment.beginOffset);
  fragment.endSubstringIndex = fragment.endSubstring.indexOf(
    fragment.endString
  );

  if (fragment.endSubstringIndex === -1) {
    fragment.endIndex = codeContentText.length;
  } else {
    fragment.endOffset = fragment.endString ? fragment.endString.length : 0;
    fragment.endIndex =
      fragment.endSubstringIndex + fragment.beginOffset + fragment.endOffset;
  }

  fragment.skipped = codeContentText.substring(0, fragment.beginIndex);
  fragment.processed = codeContentText.substring(
    fragment.beginIndex,
    fragment.endIndex
  );
  fragment.toBeProcessed = codeContentText.substring(fragment.endIndex);

  if (!fragment.replacements || fragment.replacements === []) {
    fragment.replaced = fragment.processed;
  } else {
    fragment.replacements.forEach(
      (replacement) =>
        (fragment.replaced = fragment.processed.replaceAll(
          replacement.from,
          replacement.to
        ))
    );
  }

  fragment.html = fragment.beginHtml + fragment.replaced + fragment.endHtml;

  return (
    fragment.skipped +
    fragment.html +
    codeContentTextToHtml(fragment.toBeProcessed)
  );
}
