import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { GiveConsent } from "../GiveConsent";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("button is disabled when data is invalid or not complete", () => {
  act(() => {
    render(<GiveConsent />, container);
  });
  const button = document.querySelector("[type=submit]");
  expect(button.disabled).toEqual(true);
});
