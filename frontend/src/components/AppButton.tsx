import React from 'react'

import { Button, Spinner } from 'reactstrap'

export interface AppButtonProps {
    children?: string
    color?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
    outline: boolean
    size: 'sm' | 'lg'
    block: boolean
    active: boolean
    close: boolean
    disabled: boolean
    isProcessing: boolean
}
export const AppButton = (props: AppButtonProps): JSX.Element => {
    if (props.isProcessing) {
        return (
            <Button {...props}>
                <Spinner children="" />
            </Button>
        )
    } else {
        return (
            <Button {...props} hi>
                {props.children}
            </Button>
        )
    }
}
// export interface ButtonProps {
//   /**
//    * Is this the principal call to action on the page?
//    */
//   primary?: boolean;
//   /**
//    * What background color to use
//    */
//   backgroundColor?: string;
//   /**
//    * How large should the button be?
//    */
//   size?: 'small' | 'medium' | 'large';
//   /**
//    * Button contents
//    */
//   label?: string;
//   /**
//    * Optional click handler
//    */
//   onClick?: () => void;
//   children?:any;
// }

// /**
//  * Primary UI component for user interaction
//  */
// export const AppButton = ({
//   ...props
// }: ButtonProps) => {

//   return (
//     <Badge content="sd">
//       <button className='box-g' onClick={_ => {}}>
//         <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqHlvqVHOU13mP3tHH94KoX4cXTKbos0M8g&usqp=CAU' />
//       </button>
//     </Badge>
//   );
// };
