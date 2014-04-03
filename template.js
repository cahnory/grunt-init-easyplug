/*
 * grunt-init-easyplug
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 "Cahnory" François Germain
 * Licensed under the MIT license.
 */

'use strict';

// provide quick template description
exports.description = 'Create a jQuery plugin using easyPlug';

// prevent from potential file override
exports.warnOn  = '*';

// template initer
exports.template = function (grunt, init, done) {

  init.process({}, [
    init.prompt('name', function (value, date, done) {
      //remove jquery from name
      value = value.replace(/^jquery[._-\s]*/i, '');
      done(null, value);
    }),
    init.prompt('title', function(value, data, done) {
      // fix jQuery capitalization.
      value = value.replace(/jquery/gi, 'jQuery');
      done(null, value);
    }),
    init.prompt('description', ''),
    init.prompt('version', '0.1.0'),
    init.prompt('licenses', 'MIT'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('jquery_version',   '^1'),
    init.prompt('easyplug_version', '^0.2')
  ], function(err, props) {
    // a few additional properties.
    props.jquery_json   = props.name + '.jquery.json';
    props.dependencies  = {
      jquery:   props.jquery_version,
      easyPlug: props.easyplug_version
    };
    props.devDependencies = {
      qunit: '*'
    };
    props.keywords = [];

    // files to copy (and process).
    var files = init.filesToCopy(props);
    // add license files
    init.addLicenseFiles(files, props.licenses);
    // copy files
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});


    // package.json (used by npm and grunt)
    init.writePackageJSON('package.json', {
      name:     props.name,
      version:  props.version,
      devDependencies: {
        'grunt': "~0.4.2",
        'grunt-contrib-uglify': '~0.2.0',
        'grunt-contrib-concat': '~0.3.0',
        'grunt-jslint': '*'
      },
    });

    // bower.json (used by bower)
    init.writePackageJSON('bower.json', props);

    // jquery.json (used by jquery plugin registry)
    init.writePackageJSON(props.jquery_json, props, function(pkg, props) {
      // The jQuery site needs the "bugs" value as a string.
      if (props.hasOwnProperty('bugs')) {
        pkg.bugs = props.bugs;
      }
      return pkg;
    });


    done();

  });

};