import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Bs from "react-icons/bs";
import * as Cg from "react-icons/cg";
import * as Fa from "react-icons/fa";
import * as Fi from "react-icons/fi";
import * as Gi from "react-icons/gi";
import * as Go from "react-icons/go";
import * as Gr from "react-icons/gr";
import * as Hi from "react-icons/hi";
import * as Im from "react-icons/im";
import * as Io from "react-icons/io";
import * as Lia from "react-icons/lia";
import * as Lu from "react-icons/lu";
import * as Md from "react-icons/md";
import * as Pi from "react-icons/pi";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import * as Sl from "react-icons/sl";
import * as Tb from "react-icons/tb";
import * as Tfi from "react-icons/tfi";
import * as Vsc from "react-icons/vsc";

export const iconRegistry = {
  ...Ai, ...Bi, ...Bs, ...Cg, ...Fa, ...Fi, ...Gi, ...Go,
  ...Gr, ...Hi, ...Im, ...Io, ...Lia, ...Lu, ...Md, ...Pi,
  ...Ri, ...Si, ...Sl, ...Tb, ...Tfi, ...Vsc,
};

// Single icon
export const getIcon = (iconName) => {
  if (!iconName || typeof iconName !== "string") return null;
  return iconRegistry[iconName] || null;
};

// Array of icons (components, not JSX!)
export const getStackIcons = (stackArray) => {
  if (!Array.isArray(stackArray)) return [];
  return stackArray
    .map((iconName) => getIcon(iconName))
    .filter(Boolean);
};