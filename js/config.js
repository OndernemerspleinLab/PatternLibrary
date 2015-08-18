System.config({
  "baseURL": "/js/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "Modernizr/modernizr-neue": "github:Modernizr/modernizr-neue@master",
    "angular": "npm:angular@1.4.3",
    "angular-animate": "npm:angular-animate@1.4.3",
    "angular-mocks": "npm:angular-mocks@1.4.3",
    "angular-route": "npm:angular-route@1.4.3",
    "babel": "npm:babel-core@5.8.3",
    "babel-runtime": "npm:babel-runtime@5.8.3",
    "core-js": "npm:core-js@0.9.18",
    "modernizr": "github:Modernizr/Modernizr@2.8.3",
    "velocity-animate": "npm:velocity-animate@1.2.2",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular@1.4.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:jquery@3.0.0-alpha1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:velocity-animate@1.2.2": {
      "jquery": "npm:jquery@3.0.0-alpha1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

