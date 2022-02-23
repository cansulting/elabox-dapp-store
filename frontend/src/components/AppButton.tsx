import React from 'react';
import './appbutton.css';
import { Badge, Image, Button }  from 'antd-mobile';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  children?:any;
}

/**
 * Primary UI component for user interaction
 */
export const AppButton = ({
  ...props
}: ButtonProps) => {
  
  return (
    <Badge content="sd">
      <button className='box-g' onClick={_ => {}}>
        <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqHlvqVHOU13mP3tHH94KoX4cXTKbos0M8g&usqp=CAU' />
      </button>
    </Badge>  
  );
};
