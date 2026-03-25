import virtEquals from "./Helpers/virtEquals.js";
import virtHashCode from "./Helpers/virtHashCode.js";
import ObjectIterator from "./Helpers/ObjectIterator.js";
import PConstants from "./Helpers/PConstants.js";
import ArrayListFactory from "./Objects/ArrayList.js";
import HashMapFactory from "./Objects/HashMap.js";
import PVectorFactory from "./Objects/PVector.js";
import PFontFactory from "./Objects/PFont.js";
import Char from "./Objects/Char.js";
import XMLAttributeFactory from "./Objects/XMLAttribute.js";
import XMLElementFactory from "./Objects/XMLElement.js";
import PMatrix2DFactory from "./Objects/PMatrix2D.js";
import PMatrix3DFactory from "./Objects/PMatrix3D.js";
import PShapeFactory from "./Objects/PShape.js";
import colors from "./Objects/webcolors.js";
import PShapeSVGFactory from "./Objects/PShapeSVG.js";
import CommonFunctions from "./P5Functions/commonFunctions.js";
import defaultScopeFactory from "./Helpers/defaultScope.js";
import ProcessingFactory from "./Processing.js";
import setupParser from "./Parser/Parser.js";
import finalizeProcessing from "./Helpers/finalizeProcessing.js";
import withMath from "./P5Functions/Math.js";
import JavaProxyFunctions from "./P5Functions/JavaProxyFunctions.js";
import withTouch from "./P5Functions/touchmouse.js";

// Base source files
const source = {
  virtEquals,
  virtHashCode,
  ObjectIterator,
  PConstants,
  ArrayList: ArrayListFactory,
  HashMap: HashMapFactory,
  PVector: PVectorFactory,
  PFont: PFontFactory,
  Char,
  XMLAttribute: XMLAttributeFactory,
  XMLElement: XMLElementFactory,
  PMatrix2D: PMatrix2DFactory,
  PMatrix3D: PMatrix3DFactory,
  PShape: PShapeFactory,
  colors,
  PShapeSVG: PShapeSVGFactory,
  CommonFunctions,
  defaultScope: defaultScopeFactory,
  Processing: ProcessingFactory,
  setupParser,
  finalize: finalizeProcessing,
};

// Additional code that gets tacked onto "p" during
// instantiation of a Processing sketch.
source.extend = {
  withMath,
  withProxyFunctions: JavaProxyFunctions(source.virtHashCode, source.virtEquals, source.Char),
  withTouch,
  withCommonFunctions: source.CommonFunctions.withCommonFunctions,
};

/**
 * Processing.js building function
 */
export default function buildProcessingJS(Browser, testHarness, buildOptions) {
  buildOptions = buildOptions || {};

  var noop = function () {},
    virtEquals = source.virtEquals,
    virtHashCode = source.virtHashCode,
    PConstants = source.PConstants,
    CommonFunctions = source.CommonFunctions,
    ObjectIterator = source.ObjectIterator,
    Char = source.Char,
    XMLAttribute = source.XMLAttribute(),
    ArrayList = source.ArrayList({
      virtHashCode: virtHashCode,
      virtEquals: virtEquals,
      ObjectIterator: ObjectIterator,
    }),
    HashMap = source.HashMap({
      virtHashCode: virtHashCode,
      virtEquals: virtEquals,
    }),
    PVector = source.PVector({
      PConstants: PConstants,
    }),
    PFont = source.PFont({
      Browser: Browser,
      noop: noop,
    }),
    XMLElement = source.XMLElement({
      Browser: Browser,
      XMLAttribute: XMLAttribute,
    }),
    PMatrix2D = source.PMatrix2D({
      p: CommonFunctions,
    }),
    PMatrix3D = source.PMatrix3D({
      p: CommonFunctions,
    }),
    PShape = source.PShape({
      PConstants: PConstants,
      PMatrix2D: PMatrix2D,
      PMatrix3D: PMatrix3D,
    }),
    PShapeSVG = source.PShapeSVG({
      CommonFunctions: CommonFunctions,
      PConstants: PConstants,
      PShape: PShape,
      XMLElement: XMLElement,
      colors: source.colors,
    }),
    defaultScope = source.defaultScope({
      ArrayList: ArrayList,
      HashMap: HashMap,
      PVector: PVector,
      PFont: PFont,
      PShapeSVG: PShapeSVG,
      ObjectIterator: ObjectIterator,
      PConstants: PConstants,
      Char: Char,
      XMLElement: XMLElement,
      XML: XMLElement,
    }),
    Processing = source.Processing({
      defaultScope: defaultScope,
      Browser: Browser,
      extend: source.extend,
      noop: noop,
    });

  // set up the Processing syntax parser
  Processing = source.setupParser(Processing, {
    Browser: Browser,
    aFunctions: testHarness,
    defaultScope: defaultScope,
  });

  // finalise the Processing object
  Processing = source.finalize(Processing, {
    version: buildOptions.version,
    isDomPresent: false || Browser.isDomPresent,
    window: Browser.window,
    document: Browser.document,
    noop: noop,
  });

  // done.
  return Processing;
}
