import { Navigate } from "react-router";
import { useAppSelector } from "../store/store";

interface Props {
    children: React.ReactNode;
}

export default function AdminGuard({ children }: Props) {
    const { user } = useAppSelector(state => state.account);
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.roles?.includes("Admin")) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
} 