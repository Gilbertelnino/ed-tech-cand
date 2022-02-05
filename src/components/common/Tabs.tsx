import React from "react";
import Button from "./Button";

interface Tab {
  id: number;
  label: string;
  component?: any;
}
interface ButtonTabGroupProps {
  active: Tab;
  setActive: (tab: Tab) => void;
  tabs: Tab[];
}

const Tabs = ({ active, setActive, tabs }: ButtonTabGroupProps) => {
  return (
    <>
      <div className="tab-group">
        {tabs.map((tab) =>
          active.id === tab.id ? (
            <Button key={tab.id} color={"primary"}>
              {tab.label}
            </Button>
          ) : (
            <label onClick={() => setActive(tabs.find((_tab) => _tab.id === tab.id)!)}>{tab.label}</label>
          )
        )}
      </div>
    </>
  );
};
export default Tabs;
