import React from 'react';
import Pagination from "@material-ui/lab/Pagination";

// We will explicity destruct props which are not Mui props or want to manipulates. e.g. children etc...
// "...props" will have all the props which is accepted by Mui component, e.g. variant, onChange etc...
interface PaginationProps {
  // Primary props
  count: number;
  page: number;
  className?: string;
  size?: "small" | "medium" | "large";
  color?: 'primary' | 'secondary' | 'standard';
  variant?: 'outlined' | 'text';
  onChange: (value:number) => void;
  // other props of the component which directly used in component
  [key: string]: any;
}

const PaginationComponent = ({ count, page, onChange, className, size, variant, color, ...props }: PaginationProps) => {

  const handlePaginationChange = (value: number) => {
    onChange(value);
  };

  return (
    <Pagination
      count={count}
      defaultPage={page}
      variant={variant}
      className={`pagination ${className}`}
      color={color}
      size={size}
      onChange={(e, value) => handlePaginationChange(value)}
    />
  );
}

// Default props of the component
PaginationComponent.defaultProps = {
  disabled: false,
  shape: 'rounded',
  color: 'secondary',
  size: 'medium',
  variant: 'outlined'
}

export default PaginationComponent;
