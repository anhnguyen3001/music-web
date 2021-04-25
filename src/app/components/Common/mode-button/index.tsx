import React from 'react';
import RepeatIcon from 'assets/images/repeat-default.svg';
import RepeatActiveIcon from 'assets/images/repeat.svg';
import ShuffleIcon from 'assets/images/shuffle-default.svg';
import ShuffleActiveIcon from 'assets/images/shuffle.svg';

interface Props {
    mode: 'shuffle' | 'repeat',
    onClick: () => void,
    isActive: boolean,
}

const ModeButton: React.FC<Props> = (props: Props) => {
    const { mode, isActive, onClick } = props;

    const renderShuffle = () => {
        return (
            <img className='h-20 w-20' src={isActive ? ShuffleActiveIcon : ShuffleIcon} alt='shuffle'/>
        )
    }

    const renderRepeat = () => {
        return (
            <img className='h-20 w-20' src={isActive ? RepeatActiveIcon : RepeatIcon} alt='repeat'/>
        )
    }

    return (
        <>
            <div
                className='m-12 pointer'
                onClick={onClick}>
                {mode === 'shuffle' ? renderShuffle() : renderRepeat()}
            </div>
        </>
    )
};

export default ModeButton;
