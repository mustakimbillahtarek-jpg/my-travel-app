export const metadata = {
  title: 'জীবন ও ট্রাভেল হাব',
  description: 'লাইভ ট্র্যাকিং ও ট্রাভেল প্ল্যানার অ্যাপ্লিকেশন',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
