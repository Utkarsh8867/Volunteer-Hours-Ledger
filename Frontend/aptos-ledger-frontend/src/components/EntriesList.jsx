import React from "react";

const EntriesList = ({ entries }) => {
  return (
    <section className="mt-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Past Volunteer Entries
      </h2>
      {entries.length === 0 ? (
        <p className="text-center text-gray-500">No entries found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Volunteer Name</th>
                <th className="py-3 px-4 text-left">Hours</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{entry.name}</td>
                  <td className="py-3 px-4">{entry.hours}</td>
                  <td className="py-3 px-4">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default EntriesList;
