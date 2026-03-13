

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
   <p className="text-(--error)  text-xs mt-1 font-(--font-body)" role="alert">
      {message}
    </p>
  );
} 