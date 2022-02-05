import _ from "lodash";
import React from "react";

import { ContextMenu } from "react-contextmenu";

interface Iitem {
  id: number;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface IMenu {
  items: Iitem[];
  id: string;
}

function Menu({ items, id }: IMenu) {
  return (
    <ContextMenu id={id}>
      <ul className="thumbnail-menu-wrapper">
        {items.map((item) => (
          <li onClick={item.onClick} key={_.get(item, "id", 1)}>
            {item.icon}
            {_.get(item, "title", "")}
          </li>
        ))}
      </ul>
    </ContextMenu>
  );
}

export default Menu;
