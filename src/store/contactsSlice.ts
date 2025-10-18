import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: number;
  firstname: string;
  lastname?: string;
  status: boolean;
  email: string;
  phone: number | null;
}
const savedContacts = localStorage.getItem("contacts");
const initialState: Contact[] = savedContacts ? JSON.parse(savedContacts) : [];

export const contactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state));
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.findIndex((c) => c.id === id);
      if (index !== -1) state.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(state));
    },

    updateContact: (state, action: PayloadAction<Contact>) => {
      const updated = action.payload;
      const index = state.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state[index] = updated;
      }

      localStorage.setItem("contacts", JSON.stringify(state));
    },
  },
});

export const { addContact, deleteContact, updateContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
