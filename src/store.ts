import { defineStore } from "pinia";


export interface Student {
    name: string;
    id: string;
    section: string;
}

interface State {
    students: Student[];
    selectedStudent: Student | null;
}

export const useMainStore = defineStore("mainStore", {
    
})