import { getCurrentUser } from "@/services/firebase";
import { User } from "firebase/auth";


export function assertUserAuthenticated(): User {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    return currentUser;
}