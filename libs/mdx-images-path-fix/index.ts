import { visit } from "unist-util-visit";
import { Node } from "unist";

export const convertPathToAbsolute = () => (tree: Node) => {
  visit(tree, "image", (node: { url: string }) => {
    const relativeUrl = node.url.replace(/^\//, "");
    node.url = "/" + relativeUrl;
  });
};
