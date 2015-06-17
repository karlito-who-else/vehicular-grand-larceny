TITLE
Not working with Polymer 1.0

BODY
Tested by adding `<link rel="import" href="bower_components/three-viewport/three-viewport.html">` into the head section and adding the `<three-viewport fit></three-viewport>` tag into the body section of an otherwise unmodified index.html page from the Polymer Starter Kit.

On loading the page, I see the following errors in the console:

```javascript
polymer-micro.html:58
Uncaught SyntaxError: Failed to execute 'registerElement' on 'Document': Registration failed for type 'undefined'. The type name is invalid.

polymer-micro.html:63
Uncaught TypeError: prototype.registerCallback is not a function
````

I realise that Polymer 1.0 has only recently been released, but I think that you are on to something brilliant with these Polymer elements for Three and I am keen to begin working with them.
