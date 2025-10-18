import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  addContact,
  updateContact,
  type Contact,
} from "../store/contactsSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { BiX } from "react-icons/bi";
import Input from "./Input";

interface FormProps {
  existingContact?: Contact | null;
  onClose?: () => void;
  setToggleForm?: Dispatch<SetStateAction<boolean>>;
}

/**
 * Form Component
 *
 * Handles both adding new contacts and editing existing contacts.
 * - Uses local state to manage form data.
 * - Dispatches Redux actions to add or update contacts.
 */

function Form({ existingContact, onClose, setToggleForm }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Local state for form fields
  const [formData, setFormData] = useState<Contact>({
    id: 0,
    firstname: "",
    lastname: "",
    status: true,
    email: "",
    phone: null,
  });

  /**
   * Populate form if editing an existing contact
   */
  useEffect(() => {
    if (existingContact) {
      setFormData(existingContact);
    }
  }, [existingContact]);

  /**
   * Handle form submission
   * - Updates existing contact if editing
   * - Adds new contact if creating
   * - Resets the form afterward
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existingContact) {
      // Editing existing contact
      dispatch(updateContact(formData));
    } else {
      // Adding new contact
      const contactWithId = { ...formData, id: Date.now() };
      dispatch(addContact(contactWithId));
    }

    // Reset form
    setFormData({
      id: 0,
      firstname: "",
      lastname: "",
      status: true,
      email: "",
      phone: null,
    });

    // Close form when contact saved
    if (setToggleForm) setToggleForm(false);

    // Close form if onClose callback is provided
    if (onClose) onClose();
  };

  /**
   * Handle input changes for all fields
   * - Special handling for phone (digits only, max 10)
   * - Handles radio buttons for status
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === "phone") {
      // Allow digits only and max 10 digits
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 10) {
        setFormData((f) => ({ ...f, phone: +cleaned }));
      }
      return;
    }

    // Handle radio buttons (status) and regular inputs
    setFormData((f) => ({
      ...f,
      [name]: type === "radio" ? value === "active" : value,
    }));
  };

  return (
    <form
      className="bg-gray-900 text-gray-100 p-4 rounded-md space-y-4 border border-gray-700 relative"
      onSubmit={handleSubmit}
    >
      {/* Close button for modal forms */}
      {onClose && (
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <BiX size={26} />
        </button>
      )}

      {/* Form title */}
      <h2 className="text-lg font-semibold text-indigo-400 mb-2">
        {existingContact ? "Edit Contact" : "Add New Contact"}
      </h2>

      {/* Firstname input */}
      <Input
        label="Firstname"
        value={formData.firstname}
        onChange={handleChange}
        type="text"
        name="firstname"
      />

      {/* Lastname input */}
      <Input
        label="Lastname"
        value={formData.lastname}
        onChange={handleChange}
        required={false}
        type="text"
        name="lastname"
      />

      {/* Status radio buttons */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Status</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === true}
              onChange={handleChange}
              className="form-radio text-indigo-500"
            />
            <span className="text-gray-100">Active</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === false}
              onChange={handleChange}
              className="form-radio text-indigo-500"
            />
            <span className="text-gray-100">Inactive</span>
          </label>
        </div>
      </div>

      {/* Email input */}
      <Input
        label="Email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        name="email"
      />

      {/* Phone input */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          required
          pattern="\d{10}"
          maxLength={10}
          minLength={10}
          title="Phone number must be exactly 10 digits"
          className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-md transition hover:cursor-pointer"
      >
        {existingContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}

export default Form;
