import { TabMenu } from "primereact/tabmenu";
import type { MenuItem } from "primereact/menuitem";

const items: MenuItem[] = [{ label: "Home", icon: "pi pi-home", url: "/" }];

export default function MenuBar() {
  return <TabMenu model={items} />;
}