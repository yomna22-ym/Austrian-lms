import { create } from "zustand";
import { siteClient } from "@/lib/api/site-client";
import {
  hasStudentProfile as checkHasStudentProfile,
  isStudent as checkIsStudent,
  studentProfile as getStudentProfile,
} from "@/lib/auth/profile";
import type { StudentProfile, WebhookUser } from "@/types/api";

export interface AuthState {
  user: WebhookUser | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setUser: (user: WebhookUser | null) => void;
  bootstrap: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<WebhookUser | null>;
  isStudent: () => boolean;
  hasStudentProfile: () => boolean;
  studentProfile: () => StudentProfile | undefined;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  hydrated: false,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: user !== null,
      hydrated: true,
    });
  },

  bootstrap: async () => {
    try {
      const user = await siteClient.get<WebhookUser>("/auth/me");
      set({ user, isAuthenticated: true, hydrated: true });
    } catch {
      set({ user: null, isAuthenticated: false, hydrated: true });
    }
  },

  logout: async () => {
    try {
      await siteClient.post<{ ok: boolean }>("/auth/logout");
    } finally {
      set({ user: null, isAuthenticated: false, hydrated: true });
    }
  },

  refreshUser: async () => {
    try {
      const user = await siteClient.get<WebhookUser>("/auth/me");
      set({ user, isAuthenticated: true, hydrated: true });
      return user;
    } catch {
      set({ user: null, isAuthenticated: false, hydrated: true });
      return null;
    }
  },

  isStudent: (): boolean => checkIsStudent(get().user),

  hasStudentProfile: (): boolean => checkHasStudentProfile(get().user),

  studentProfile: (): StudentProfile | undefined => getStudentProfile(get().user),
}));
