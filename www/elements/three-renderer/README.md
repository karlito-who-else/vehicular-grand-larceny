three-renderer
==============

[Polymer](https://www.polymer-project.org/) element wrapper for THREE.WebGLRenderer (http://threejs.org/docs/#Reference/Renderers/WebGLRenderer).

It manages GL rendering context across multiple instances of three-renderer.

All instances of this element will share a single WebGL canvas element. An element instance becomes a host of the canvas any time WebGL API is used through one of its methods. Before this happens, the previous host needs to store the framebuffer data in a 2D canvas before the WebGL canvas can be handed out.

IMPORTANT: Keep in mind that WebGL canvas migration is expensive and should not be performed continuously. In other words, you cannot render with mutliple instances of three-renderer in realtime without severe performance penalties.

*WORK IN PROGRESS:* this repository contains a bundle of custom elements designed for three.js developers.

See documentation and examples below for more information.

[DOCS](http://akirodic.com/components/three-renderer)

[DEMO](http://akirodic.com/components/three-renderer/demo.html)

![three-renderer](http://akirodic.com/components/three-renderer/preview.png "three-renderer")