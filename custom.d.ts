declare module "*.svg?inline" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default content;
}
declare module '*.png';
