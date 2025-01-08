import { createStore } from 'zustand/vanilla';  // Asigură-te că importi corect din zustand/vanilla
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface AuthState {
    user: any | null;
    setUser: (user: any | null) => void;
}

export const authStore = createStore<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

// Ascultă modificările stării de autentificare
onAuthStateChanged(auth, (user) => {
    authStore.setState({ user });
});
