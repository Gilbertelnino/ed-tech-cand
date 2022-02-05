import _ from "lodash";
import React, { FC, useState } from "react";

interface IListItem {
  id: number;
  title: string | React.ReactNode;
  subItems?: IListItem[];
  onClick?: () => void;
}

interface IListItems {
  items: IListItem[];
}

const Item = ({ title, subItems, onClick }: IListItem) => {
  const [active, setActive] = useState(false);
  return (
    <li onClick={() => (_.isUndefined(subItems) && onClick ? onClick() : setActive(!active))}>
      <div className="header">
        {title}
        {!_.isUndefined(subItems) && <div className="icon">{active ? <div className="triangle-down" /> : <div className="triangle-left" />}</div>}
      </div>
      {!_.isUndefined(subItems) && active && (
        <ul>
          {subItems.map((subItem) => (
            <li onClick={subItem.onClick} key={subItem.id}>
              {subItem.title}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const ListItem: FC<IListItems> = ({ items }) => {
  return (
    <ul className="list_item_wrapper">
      {items.map(({ title, id, subItems, onClick }) => (
        <Item title={title} key={id} id={id} subItems={subItems} onClick={onClick} />
      ))}
    </ul>
  );
};

export default ListItem;
