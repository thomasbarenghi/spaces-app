import { Popover, VerticalNav } from "@/components";
import Link from "next/link";

type VerticalNavProps = {
  items: any[];
  textColor?: string;
};

export default function HorizontalNav({
  items,
  textColor = "text-white",
}: VerticalNavProps) {
  return (
    <nav className="flex gap-8">
      {items.map((item, index) => (
        <div key={index}>
          {item.hasPopover ? (
            <Popover childrenTrigger={item.childrenTrigger}>
              <VerticalNav items={item.itemsNav} />
            </Popover>
          ) : (
            <Link href={item.href} className={`${textColor}`}>
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
