"use strict";

const jsdom = require("jsdom");
require("google-closure-library");

goog.provide('cleanedUpHtml');
goog.require('goog.html.sanitizer.HtmlSanitizer');

/**
 * Pretend we are in a browser
 */
const dom = new jsdom.JSDOM(``, {
  url: "http://localhost"
});

/**
 * Pollute the global namespace with the fake DOM objects
 */
for (const property of Object.getOwnPropertyNames(dom.window)) {
  const descriptor = Object.getOwnPropertyDescriptor(global, property);
  if (descriptor && !descriptor.writable) continue;
  global[property] = dom.window[property];
}

const sanitizer = new goog.html.sanitizer.HtmlSanitizer.Builder().build();

/**
 * Makes dangerous HTML safe
 * 
 * @param {string} dirtyHtml 
 * @returns {string}
 */
function cleanedUpHtml(dirtyHtml) {
  const safeHtml = sanitizer.sanitize(dirtyHtml);
  return goog.html.SafeHtml.unwrap(safeHtml);
}

// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('cleanedUpHtml', cleanedUpHtml);

module.exports.cleanedUpHtml = cleanedUpHtml;