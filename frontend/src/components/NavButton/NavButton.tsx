import './NavButton.css';

interface Props {
    selected: boolean;
    text: string;
    handleNavChange: (button: any) => void;
}

const NavButton = ({ selected, text, handleNavChange }: Props) => {
    const buttonState = selected ? 'active' : 'inactive';

    return (
        <h5 onClick={handleNavChange} className={'button ' + buttonState}>
            {text}
        </h5>
    );
};

export default NavButton;
