import { useState } from "react";

import Form from "../components/Form";
import AddContactSection from "../components/AddContactSection";
import ContactListSection from "../components/ContactListSection";
import ContactDetailsSection from "../components/ContactDetailsSection";
import { useSelector } from "react-redux";
import type { Contact } from "../store/contactsSlice";
import type { RootState } from "../store";

/**
 * ContactsPage Component
 *
 * This component renders the main contacts page, which includes:
 * - Adding a new contact
 * - Viewing a list of contacts
 * - Viewing contact details
 * - Editing an existing contact
 */

function ContactsPage() {
  // State to track whether the edit form is open
  const [isEditingContact, setisEditingContact] = useState<boolean>(false);

  // State to hold the data of the contact currently being edited
  const [editContactData, setEditContactData] = useState<Contact | null>(null);

  // Redux selector to get all contacts from the store
  const data = useSelector((s: RootState) => s.contacts);

  // State to track the currently selected contact for viewing details
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  /**
   * Handles selecting a contact to view its details.
   * @param id - The ID of the contact to view
   */
  const handleViewContact = (id: number) => {
    const contact = data.find((c) => c.id === id) || null;
    setSelectedContact(contact);
  };

  /**
   * Handles closing the edit contact form.
   */
  const onEditFormClose = () => {
    setisEditingContact(false);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b relative  text-gray-200 p-1 md:p-6">
      {/* Page header */}
      <h1 className="text-3xl font-semibold text-indigo-400 border-b ml-5 sm:ml-0 border-gray-700 pb-2">
        Contacts
      </h1>

      {/* Section to add a new contact */}
      <AddContactSection />

      {/* Section displaying the list of contacts */}
      <ContactListSection
        handleViewContact={handleViewContact}
        setEditContactData={setEditContactData}
        setisEditingContact={setisEditingContact}
      />

      {/* Section displaying details of the selected contact */}
      <ContactDetailsSection
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />

      {/* Overlay for the edit form */}
      {isEditingContact && (
        <div className="absolute inset-0 m-auto max-h-[500px] max-w-[400px] rounded-lg">
          <Form existingContact={editContactData} onClose={onEditFormClose} />
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
