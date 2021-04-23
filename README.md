# Proof of concept: use Google HTML sanitizer on the backend

The HTML sanitizer from the [Google Closure Library](https://github.com/google/closure-library) depends on DOM being present. That's not the case under Node.js

This proof of concept uses [JSDom](https://github.com/jsdom/jsdom/) to supply the missing bits and lets you use the sanitizer on the backend.

The little code I created to glue these two is experimental and not fit for any purpose other than testing what's possible.

You can test this in the CLI or by running the included Express app and calling the endpoint `/html/clean` with your favorite XSS exploits.
