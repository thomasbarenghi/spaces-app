import Link from "next/link";

type VerticalNavProps = {
  items: VerticalNavItemProps[];
};

type VerticalNavItemProps = {
  name: string;
  href: string;
};

export default function VerticalNav({ items }: VerticalNavProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <Link href={item.href} key={index}>
          <p className="">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
