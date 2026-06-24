interface ProjectCardProps {
  name: string;
  capacity: string;
  description: string;
  highlighted?: boolean;
}

export default function ProjectCard({ name, capacity, description, highlighted }: ProjectCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        highlighted
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className={`font-medium ${highlighted ? "text-primary" : "text-dark"}`}>{name}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold ${
            highlighted ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {capacity}
        </span>
      </div>
    </div>
  );
}
