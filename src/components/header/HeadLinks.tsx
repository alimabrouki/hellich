import NavLink from "../NavLink";

function HeadLinks() {
  const links = [
    { href: "/faq", label: "الأسئلة الشائعة", num: "04" },
    { href: "/contact", label: "تواصل معي", num: "02" },
    { href: "#who-am-i", label: "من أنا ؟", num: "03" },
    { href: "#programs", label: "برامج", num: "01" },
  ];
  return (
    <div className="hidden lg:flex head-links">
      {links.map((link) => (
        <NavLink key={link.href} menuOpen={false} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default HeadLinks;
