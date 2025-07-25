"use client"

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {children}
    </div>
  );
}