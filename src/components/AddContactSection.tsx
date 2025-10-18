import { useState } from "react";
import Form from "./Form";

/**
 * AddContactSection Component
 *
 * This component renders a section to add a new contact.
 * It includes a toggle button to show or hide the contact form.
 */

function AddContactSection() {
  // State to track whether the form is visible
  const [toggleForm, setToggleForm] = useState<boolean>(false);

  // Toggles the visibility of the form
  const handleToggleForm = () => setToggleForm((t) => !t);
  return (
    <section className="mt-6 bg-gray-800 rounded-lg shadow-md p-5 border border-gray-700">
      {/* Header and toggle button */}
      <div className="flex flex-col  justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-300">Add New Contact</h2>

        <button
          onClick={handleToggleForm}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-1.5 rounded-md transition mt-2"
        >
          {toggleForm ? "Hide Form" : "Add Contact"}
        </button>
      </div>

      {/* Collapsible form section */}
      <div
        className={`overflow-auto transition-all duration-500 ease-in-out ${
          toggleForm ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <Form setToggleForm={setToggleForm} />
      </div>
    </section>
  );
}

export default AddContactSection;
