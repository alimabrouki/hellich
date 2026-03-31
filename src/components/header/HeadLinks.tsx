import NavLink from "../NavLink";

type HeadLinksProps = {
  onNavigate?: () => void;
};

function HeadLinks({ onNavigate }: HeadLinksProps) {
  const links = [
    { href: "/faq", label: "الأسئلة الشائعة", num: "04" },
    { href: "/contact", label: "تواصل معي", num: "02" },
    { href: "#who-am-i", label: "من أنا ؟", num: "03" },
    { href: "#programs", label: "برامج", num: "01" },
  ];
  return (
    <div className="hidden lg:flex head-links">
      {links.map((link) => (
        <NavLink
          key={link.href}
          menuOpen={false}
          href={link.href}
          onClick={onNavigate}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default HeadLinks;
