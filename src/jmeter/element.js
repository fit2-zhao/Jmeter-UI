import {uuid} from "@/commons/utils";

/**
 * options: JXM转换的JSON对象(xml2json)
 */
export default class Element {
  constructor(options = {}) {
    this.id = options.id || uuid();
    if (options.type) {
      this.type = options.type;
    }
    if (options.name) {
      this.name = options.name;
    }
    if (options.attributes) {
      this.attributes = options.attributes;
      if (options.attributes.testname) {
        this.label = options.attributes.testname;
      }
    }
  }

  toJson() {
    let json = {};
    if (this.type) {
      json.type = this.type;
    }
    if (this.name) {
      json.name = this.name;
    }
    if (this.attributes) {
      json.attributes = this.attributes;
      json.attributes.testname = this.label;
    }
    return json;
  }
}





