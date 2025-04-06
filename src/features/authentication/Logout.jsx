import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from '../../ui/SpinnerMini'

export default function Logout() {
    const { logout, logoutLoading } = useLogout()

    return <ButtonIcon disabled={logoutLoading} onClick={logout}>
        {!logoutLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
}
