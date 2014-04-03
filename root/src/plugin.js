(function ($) {
  'use strict';

  var Plugin;

  Plugin = $.easyPlug({
    // plugin name, $.{%= name %} and $().{%= name %}()
    name:       '{%= name %}',

    // list of custom events
    events:     ['enabled', 'disabled'],

    // default settings
    presets:    {},

    // instantation for a single element (this.element)
    construct:  function () {
      this.enable();
    },

    // public methods
    prototype:  {
      enable: function () {
        this.element.trigger(Plugin.events.enabled);
      },
      disable: function () {
        this.element.trigger(Plugin.events.disabled);
      }
    }
  });

}(jQuery));