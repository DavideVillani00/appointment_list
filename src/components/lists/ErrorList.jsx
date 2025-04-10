export default function ErrorList({ iterator }) {
  return (
    <ul className="text-center text-delete dark:text-deleteDark font-bold">
      {iterator.length > 0
        ? iterator.map((el) => {
            return (
              <li
                key={el}
                className="border-b-2 border-divider dark:border-dividerDark last-of-type:border-0"
              >
                {el}
              </li>
            );
          })
        : null}
    </ul>
  );
}
