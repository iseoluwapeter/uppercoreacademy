import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://byvkzzfgdnrlrvkmnfxf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dmt6emZnZG5ybHJ2a21uZnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTEzMzksImV4cCI6MjA4MzQ2NzMzOX0.6OhYkbDM2NOiSLx1qzKWmiv5Rfxu0qHL7nSkbSwICf4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    status: "",
    techInterest: "",
  });

  const [modal, setModal] = useState({
    open: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("webinar_registration").insert([
      {
        name: formData.fullName,
        email: formData.email,
        phone: formData.whatsapp,
        status: formData.status,
        interest: formData.techInterest,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      setModal({
        open: true,
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } else {
      setModal({
        open: true,
        success: true,
        message:
          "Registration successful! 🎉 Join our WhatsApp group for updates:",
      });
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        status: "",
        techInterest: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <img src={Logo} alt="Uppercore Logo" className="mb-5" />

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-md w-full max-w-lg p-6 border-t-4 border-t-green-500">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Free Tech & Career Webinar
          </h1>
          <p className="text-gray-600 text-center mt-1 px-5">
            <strong>
              Topic: <br></br>
            </strong>{" "}
            Breaking Into Tech in 2026: Skills, Direction & Common Mistakes
          </p>
          <p className="text-gray-600 text-center mt-1">
            <strong>Date:</strong> 18th Jan 2026
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+234..."
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Current Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Working">Working</option>
              <option value="Switching careers">Switching careers</option>
            </select>
          </div>

          {/* Tech Interest */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tech Interest <span className="text-red-500">*</span>
            </label>
            <select
              name="techInterest"
              value={formData.techInterest}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Frontend">Frontend</option>
              <option value="Frontend">Backend</option>
              <option value="Design">Design</option>
              <option value="Data">Data</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded hover:bg-green-700 transition"
          >
            Register Now
          </button>
        </form>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                modal.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.success ? "Success!" : "Failed!"}
            </h2>
            <p className="mb-4">{modal.message}</p>

            {/* WhatsApp link for success */}
            <div className="flex flex-col">
              {modal.success && (
                <a
                  href="https://chat.whatsapp.com/G6X7zvGZjsZ2fvwjJTK8ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Join WhatsApp Group
                </a>
              )}

              <button
                onClick={() => setModal({ ...modal, open: false })}
                className="mt-4 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
