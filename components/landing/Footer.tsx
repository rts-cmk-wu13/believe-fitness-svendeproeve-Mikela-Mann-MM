

export default function Footer() {
  return (
    <footer className="content-wrapper py-4 text-center">
      {/* "Logo" */}


      <p className="text-2xl font-black leading-tight mb-1 text-(--brand-yellow)">
        Believe Fitness
      </p>
      <p className="text-sm font-bold mb-6 text-(--brand-black) pb-3 pt-2">
        Train like a pro
      </p>

      {/* Contact info */}

      <div className="flex flex-col gap-1">
        <p className="text-sm text-(--grey-dark)">
          Rabalderstræde 48 · 4000 Roskilde
        </p>
        <p className="text-sm text-(--grey-dark)">
          hello@believe-fitness.com
        </p>
      </div>
    </footer>
  );
} 