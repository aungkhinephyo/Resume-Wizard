export const PageComponent = ({ title, buttons = "", children }) => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {buttons}
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};
