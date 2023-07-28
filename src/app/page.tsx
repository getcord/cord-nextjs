import ClientThread from "./ClientThread";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let userIndex = parseInt(searchParams.userIndex ?? "", 10);
  if (isNaN(userIndex)) {
    userIndex = Math.round(Math.random() * 3);
  }
  return <ClientThread />;
}
