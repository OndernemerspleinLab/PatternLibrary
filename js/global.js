System.config({
  "baseURL": typeof location !== "undefined" &&
      location.pathname.split("/")[1] === "PatternLibrary" ?
          "/PatternLibrary/js/" :
          "/js/"
});

System.import('start');