import Image from "next/image";
import { MapPin, School, Phone, Mail } from "lucide-react";

export default function SchoolCard({ school }) {
  const { name, address, city, image, contact, email_id } = school;

  return (
    <div className="card group rounded-2xl border border-blue-200 bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <School className="h-16 w-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* School Name */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-center md:text-left">
          {name}
        </h3>

        {/* Details Grid */}
        <div className="flex flex-col gap-4 text-gray-600">
          {/* Address */}
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600 line-clamp-2">{address}</p>
              <p className="text-sm font-medium text-gray-800">{city}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-gray-700 truncate">{contact}</p>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-gray-700 truncate">{email_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
