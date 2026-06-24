import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-lg text-dark">{name}</h3>
        <p className="text-primary text-sm font-medium mt-1">{role}</p>
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
