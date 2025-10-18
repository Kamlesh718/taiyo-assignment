import { BiX } from "react-icons/bi";
import type { Contact } from "../store/contactsSlice";

import type { Dispatch, SetStateAction } from "react";

interface ContactDetailsSectionProps {
  selectedContact: Contact | null;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}

/**
 * ContactDetailsSection Component
 *
 * Displays detailed information for a selected contact.
 * - Shown only when a contact is selected.
 * - Includes a close button to hide the details.
 */

function ContactDetailsSection({
  selectedContact,
  setSelectedContact,
}: ContactDetailsSectionProps) {
  return (
    <>
      {selectedContact && (
        <section className="mt-8 bg-gray-800 rounded-lg shadow-md p-5 border border-gray-700 relative">
          <>
            <h2 className="text-lg font-semibold text-gray-300 mb-3">
              Contact Details
            </h2>

            {/* Close button */}
            <button
              className="absolute top-0 right-0 m-3"
              onClick={() => setSelectedContact(null)}
            >
              <BiX size={30} />
            </button>

            {/* Contact information */}
            <div className="text-gray-300">
              <>
                {/* Status indicator */}
                <span
                  className={`inline-block rounded-full ${
                    selectedContact.status ? "bg-green-400" : "bg-red-600"
                  } w-3 h-3`}
                />
                <span className="ml-3 font-semibold uppercase">
                  {selectedContact.status ? "Active" : "Inactive"}
                </span>

                {/* Contact details */}
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  {selectedContact?.firstname} {selectedContact?.lastname}{" "}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  {selectedContact?.email}
                </p>
                <p>
                  <span className="text-gray-400">Phone:</span>{" "}
                  {selectedContact?.phone}
                </p>
              </>
            </div>
          </>
        </section>
      )}
    </>
  );
}

export default ContactDetailsSection;
