"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function AddSchoolForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const watchImage = watch("image");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setValue("image", result.imageUrl);
      } else {
        setSubmitStatus({ type: "error", message: result.error });
        setImagePreview(null);
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Failed to upload image" });
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "School added successfully!",
        });
        reset();
        setImagePreview(null);
      } else {
        setSubmitStatus({ type: "error", message: result.error });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Failed to add school" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="max-w-2xl mx-auto p-6">
    //   <div className="bg-white shadow-xl rounded-lg p-8">
    //     <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New School</h2>

    //     {submitStatus && (
    //       <div className={`mb-6 p-4 rounded-md flex items-center space-x-2 ${
    //         submitStatus.type === 'success'
    //           ? 'bg-green-50 text-green-800 border border-green-200'
    //           : 'bg-red-50 text-red-800 border border-red-200'
    //       }`}>
    //         {submitStatus.type === 'success' ? (
    //           <CheckCircle className="h-5 w-5" />
    //         ) : (
    //           <AlertCircle className="h-5 w-5" />
    //         )}
    //         <span>{submitStatus.message}</span>
    //       </div>
    //     )}

    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //       <div>
    //         <label className="form-label">School Name *</label>
    //         <input
    //           type="text"
    //           className="form-input"
    //           placeholder="Enter school name"
    //           {...register('name', {
    //             required: 'School name is required',
    //             minLength: { value: 2, message: 'Name must be at least 2 characters' }
    //           })}
    //         />
    //         {errors.name && <p className="form-error">{errors.name.message}</p>}
    //       </div>

    //       <div >
    //         <label className="form-label">Address *</label>
    //         <textarea
    //           className="form-input"
    //           rows="3"
    //           placeholder="Enter complete address"
    //           {...register('address', {
    //             required: 'Address is required',
    //             minLength: { value: 10, message: 'Address must be at least 10 characters' }
    //           })}
    //         />
    //         {errors.address && <p className="form-error">{errors.address.message}</p>}
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         <div>
    //           <label className="form-label">City *</label>
    //           <input
    //             type="text"
    //             className="form-input"
    //             placeholder="Enter city"
    //             {...register('city', {
    //               required: 'City is required',
    //               minLength: { value: 2, message: 'City must be at least 2 characters' }
    //             })}
    //           />
    //           {errors.city && <p className="form-error">{errors.city.message}</p>}
    //         </div>

    //         <div>
    //           <label className="form-label">State *</label>
    //           <input
    //             type="text"
    //             className="form-input"
    //             placeholder="Enter state"
    //             {...register('state', {
    //               required: 'State is required',
    //               minLength: { value: 2, message: 'State must be at least 2 characters' }
    //             })}
    //           />
    //           {errors.state && <p className="form-error">{errors.state.message}</p>}
    //         </div>
    //       </div>

    //       <div>
    //         <label className="form-label">Contact Number *</label>
    //         <input
    //           type="tel"
    //           className="form-input"
    //           placeholder="Enter 10-digit contact number"
    //           {...register('contact', {
    //             required: 'Contact number is required',
    //             pattern: {
    //               value: /^\d{10}$/,
    //               message: 'Contact number must be exactly 10 digits'
    //             }
    //           })}
    //         />
    //         {errors.contact && <p className="form-error">{errors.contact.message}</p>}
    //       </div>

    //       <div>
    //         <label className="form-label">Email Address *</label>
    //         <input
    //           type="email"
    //           className="form-input"
    //           placeholder="Enter email address"
    //           {...register('email_id', {
    //             required: 'Email is required',
    //             pattern: {
    //               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //               message: 'Please enter a valid email address'
    //             }
    //           })}
    //         />
    //         {errors.email_id && <p className="form-error">{errors.email_id.message}</p>}
    //       </div>

    //       <div>
    //         <label className="form-label">School Image</label>
    //         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
    //           <div className="space-y-1 text-center">
    //             {imagePreview ? (
    //               <div className="space-y-2">
    //                 <img
    //                   src={imagePreview}
    //                   alt="Preview"
    //                   className="mx-auto h-32 w-32 object-cover rounded-lg"
    //                 />
    //                 <p className="text-sm text-gray-500">Image uploaded successfully</p>
    //               </div>
    //             ) : (
    //               <>
    //                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
    //                 <div className="flex text-sm text-gray-600">
    //                   <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
    //                     <span>Upload a file</span>
    //                     <input
    //                       type="file"
    //                       className="sr-only"
    //                       accept="image/*"
    //                       onChange={handleImageUpload}
    //                       disabled={uploadingImage}
    //                     />
    //                   </label>
    //                   <p className="pl-1">or drag and drop</p>
    //                 </div>
    //                 <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
    //               </>
    //             )}

    //             {uploadingImage && (
    //               <div className="flex items-center justify-center space-x-2">
    //                 <Loader2 className="h-4 w-4 animate-spin" />
    //                 <span className="text-sm text-gray-500">Uploading...</span>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <input type="hidden" {...register('image')} />
    //       </div>

    //       <button
    //         type="submit"
    //         disabled={isSubmitting || uploadingImage}
    //         className="btn-primary"
    //       >
    //         {isSubmitting ? (
    //           <>
    //             <Loader2 className="h-4 w-4 mr-2 animate-spin" />
    //             Adding School...
    //           </>
    //         ) : (
    //           'Add School'
    //         )}
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-2xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          🏫 Add New School
        </h2>

        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-2 text-sm font-medium ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{submitStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          {/* School Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              School Name *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
              placeholder="Enter school name"
              {...register("name", {
                required: "School name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
              placeholder="Enter complete address"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
              })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                placeholder="Enter city"
                {...register("city", {
                  required: "City is required",
                  minLength: {
                    value: 2,
                    message: "City must be at least 2 characters",
                  },
                })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                placeholder="Enter state"
                {...register("state", {
                  required: "State is required",
                  minLength: {
                    value: 2,
                    message: "State must be at least 2 characters",
                  },
                })}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
              placeholder="Enter 10-digit contact number"
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Contact number must be exactly 10 digits",
                },
              })}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
              placeholder="Enter email address"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email_id.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              School Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl bg-white transition">
              <div className="space-y-2 text-center">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md"
                    />
                    <p className="text-sm text-green-600">
                      Image uploaded successfully
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="cursor-pointer font-semibold text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                      </label>
                      <p className="pl-1">or drag & drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </>
                )}

                {uploadingImage && (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </div>
                )}
              </div>
            </div>
            <input type="hidden" {...register("image")} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || uploadingImage}
            className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Adding School...
              </>
            ) : (
              "➕ Add School"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
