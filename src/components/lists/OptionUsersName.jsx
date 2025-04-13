export default function OptionUsersName({ users }) {
  return users.map((user) => {
    return <option key={user.id}>{user.userName}</option>;
  });
}
