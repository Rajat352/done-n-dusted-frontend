interface Category {
  id: string;
  name: string;
}

interface PropData {
  categories: Category[];
  desktop: boolean;
  onClose: () => void;
}

export default function ShowCategories({
  categories,
  desktop,
  onClose,
}: PropData) {
  if (desktop) {
    return (
      <nav className="flex-1">
        <ul className="space-y-2">
          {categories.map((item) => (
            <li key={item.id}>
              <a className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="flex-1">
      <ul className="space-y-2">
        {categories.map((item) => (
          <li key={item.id}>
            <a
              onClick={onClose}
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
