export const FormError = ({ error }: { error: string }) => {
  return (
    error && <div className="text-red-600 font-bold text-sm p-1">{error}</div>
  );
}
