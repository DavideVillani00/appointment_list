import { useTranslation } from "react-i18next";

export default function ErrorList({ iterator }) {
  const { t } = useTranslation();
  return (
    <ul className="text-center text-delete dark:text-deleteDark font-bold">
      {iterator.length > 0
        ? iterator.map((el) => {
            return (
              <li
                key={el}
                className="border-b-2 border-divider dark:border-dividerDark last-of-type:border-0"
              >
                {t(el)}
              </li>
            );
          })
        : null}
    </ul>
  );
}
