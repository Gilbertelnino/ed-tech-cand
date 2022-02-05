import React, { useEffect, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import ChipInput from "material-ui-chip-input";

const CareerDifferentiatorsSkills = (props) => {
  const control: Control<Record<string, any>> = props.control;
  const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({ control, name: "skills" });

  const [skills, setSubmitChip] = useState([]);

  // set candidate skills hook
  useEffect(() => {
    if (props.skills) {
      const skillsArray = skillFields.map((item) => item.title);
      setSubmitChip(skillsArray);
      props.handleSkills(skillsArray);
    }
  }, [props.skills]);

  const _handleAddChip = (chip) => {
    const skillsArray = [...skills];
    skillsArray.push(chip);
    skillAppend({ title: chip });
    setSubmitChip(skillsArray);
    props.handleSkills(skillsArray);
  };

  const _handleDeleteChip = (chip, index) => {
    const skillsArray = [...skills];
    if (index > -1) {
      skillsArray.splice(index, 1);
      setSubmitChip(skillsArray);
      skillRemove(index);
      props.handleSkills(skillsArray);
    }
  };
  return (
    <div className="add-skill-wrapper"> 
      <div className="career-title">
        <h5>Skills</h5>
      </div>
      <label>Add Skills</label>
      <div>
        <ChipInput
          variant="outlined"
          placeholder="Add skills"
          value={skills}
          onAdd={(chip) => _handleAddChip(chip)}
          onDelete={(chip, index) => _handleDeleteChip(chip, index)}
          inputRef={props.register}
          className="w-100"
        />
      </div>
    </div>
  );
};

export default CareerDifferentiatorsSkills;
