import React, { ChangeEvent } from 'react';
import Select from "../../../components/common/Select";

interface DropdownProps {
  handleChange: (event: ChangeEvent<{}>, value: string) => any;
  data: Array<Object>;
}
const getFilters = (data) => {
  const selectTags = data.map((s) => {
    const active = s.name === "Profiles" ? "active" : ""; //need to update active variable value when admin layout will integrate.
    return (<Select name={s.name} className={active} variant="outlined" options={s.options} value={s.name} />)
  });
  return selectTags;
}
const Dropdown = (props: DropdownProps) => {
  const { handleChange, data } = props; //need to bind select change event with this prop.
  return (
    <div className="admin-dropdowns">
      {getFilters(data)}
    </div>
  );
}
export default Dropdown;