import { HiOutlineMoon } from "react-icons/hi";
import ButtonIcon from './ButtonIcon'
import { useDarkMode } from "../context/DarkModeContextProvider";
import { HiOutlineSun } from "react-icons/hi2";

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}
