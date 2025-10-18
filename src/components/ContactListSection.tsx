import { useDispatch, useSelector } from "react-redux";
import { deleteContact, type Contact } from "../store/contactsSlice";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import type { AppDispatch, RootState } from "../store";
import type { Dispatch, SetStateAction } from "react";

interface ContactListSectionProps {
  handleViewContact: (id: number) => void;
  setEditContactData: Dispatch<SetStateAction<Contact | null>>;
  setisEditingContact: Dispatch<SetStateAction<boolean>>;
}

/**
 * ContactListSection Component
 *
 * Displays all contacts in a scrollable list.
 * Each contact has:
 * - View button: to display details
 * - Edit button: to edit the contact
 * - Delete button: to remove the contact
 */

function ContactListSection({
  handleViewContact,
  setEditContactData,
  setisEditingContact,
}: ContactListSectionProps) {
  // Get all contacts from Redux store
  const data = useSelector((s: RootState) => s.contacts);

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handle deleting a contact
   * Prompts for confirmation before dispatching delete action
   */
  const handleDelete = (id: number) => {
    const confirm = window.confirm("Are you sure to delete it ?");
    if (confirm) dispatch(deleteContact(id));
    return null;
  };

  /**
   * Handle editing a contact
   * Sets the contact data for editing and opens the form
   */
  const handleEditContact = (id: number) => {
    const contact = data.find((c) => c.id === id) || null;
    setisEditingContact(true);
    setEditContactData(contact);
  };

  return (
    <section className="mt-8 bg-gray-800 rounded-lg shadow-md p-5 border border-gray-700">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">All Contacts</h2>

      {data.length > 0 ? (
        <ul className="max-h-64 overflow-y-scroll">
          {data.map(({ id, firstname, lastname, status }: Contact) => (
            <li
              key={id}
              className="flex justify-between items-center py-3 border-b border-indigo-200/30"
            >
              {/* Contact info */}
              <div>
                <p className="font-medium text-gray-100">
                  {firstname} {lastname}{" "}
                  <span
                    className={`inline-block rounded-full ${
                      status ? "bg-green-400" : "bg-red-600"
                    } w-3 h-3`}
                  />
                </p>
                {/* View contact button */}
                <button
                  className="text-md bg-indigo-700 px-3 mt-2 text-indigo-50 rounded-md"
                  onClick={() => handleViewContact(id)}
                >
                  View
                </button>
              </div>

              {/* Edit and Delete buttons */}
              <div className="flex flex-col gap-2">
                <button
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
                  onClick={() => handleEditContact(id)}
                >
                  <BiEdit size={26} />
                </button>
                <button
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                  onClick={() => handleDelete(id)}
                >
                  <MdDelete size={26} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center py-4">No contacts available</p>
      )}
    </section>
  );
}

export default ContactListSection;
