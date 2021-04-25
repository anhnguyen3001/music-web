import React from 'react';
import './style.scss';
import { Button } from 'react-bootstrap';
 
interface Props {
    text?: string,
    iconLeft?: SVGAElement,
    name?: string,
    children?: any,
    color: string,
    classNames?: Array<string>,
    icon?: any,
    shape?: string,
    size?: string,
    target?: string,
    onClick: () => void
}

const CustomButtonField: React.FC<Props> = (props: Props) => {

    const { 
        text,
        classNames, 
        icon,
        shape, 
        size, 
        onClick, 
        children,
        color = 'pink',
    } = props;

    let overrideClassNames:any = ['custom-btn'];

    const renderContent = () => {
        return (
            <>
                {icon && icon}
                {children
                    // <span>
                    //     {text}
                    // </span>
                }
            </>
        )
    }

    const initArgs = () => {
        if (size === 'large') {
            overrideClassNames.push('custom-btn--large')
        } else {
            overrideClassNames.push('custom-btn--small')
        }
    
        if (color === 'red') {
            overrideClassNames.push('custom-btn--color-red')
        }

        if (color === 'black') {
            overrideClassNames.push('custom-btn--color-black')
        }
    
        if (shape === 'circle') {
            overrideClassNames.push('custom-btn--shape-circle')
        }
    
        if (shape === 'round') {
            overrideClassNames.push('custom-btn--shape-round')
        }

        if (classNames && classNames.length) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Button 
            className={ overrideClassNames.join(' ') }
            onClick={ onClick }>
            { renderContent() }
        </Button>
    )
}

export default CustomButtonField;
