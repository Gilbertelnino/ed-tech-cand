import React, { useState } from "react";
interface IAccordionItem {
  id: number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  num?: number;
  showId?: boolean;
}

interface IAccordion {
  data: IAccordionItem[];
  className?: string;
  showId?: boolean;
}

function pad(d: any) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

const AccordionItem = ({ title, content, id, num, showId }: IAccordionItem) => {
  const [isActive, setIsActive] = useState<Boolean>(false);
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setIsActive(!isActive)}>
        <div className={`title ${isActive && "active"}`}>
          {showId && `${pad(id)}.`}{title}
        </div>
        <div className="icon">{isActive ? <div className="triangle-left" /> : <div className="triangle-down" />}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

const Accordion = ({ data, className, showId }: IAccordion) => {
  return (
    <div className={`accordion-wrapper ${className}`}>
      {data.map((item, index) => (
        <AccordionItem showId={showId} key={item.id} num={index + 1} {...item} />
      ))}
    </div>
  );
};

Accordion.defaultProps = {
  showId: true,
};

export default Accordion;
