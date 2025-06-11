import { getCategoryContext } from "@/app/providers/SelectedCategoryContextProvider";

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
  const { selectedCategory, setSelectedCategory } = getCategoryContext();

  if (desktop) {
    return (
      <nav className="flex-1">
        <ul className="space-y-2 list-decimal ml-5">
          {categories.map((item) => (
            <li key={item.id} className="hover:cursor-pointer">
              <a
                className={`block px-3 py-2 rounded-md hover:bg-landingSignInButtonLight dark:hover:bg-landingSignInButtonDark transition-colors duration-200 ${
                  selectedCategory.id == item.id &&
                  "bg-landingMainLight dark:bg-landingMainDark"
                }`}
                onClick={() =>
                  setSelectedCategory({ name: item.name, id: item.id })
                }
              >
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
      <ul className="space-y-2 list-decimal">
        {categories.map((item) => (
          <li key={item.id} className="hover:cursor-pointer">
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
