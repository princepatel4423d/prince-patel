import { Link } from "react-router-dom";

const FooterLinks = () => {
  const columns = [
    {
      title: "General",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Project", href: "/project" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Specific",
      links: [
        { label: "Milestone", href: "/milestone" },
        { label: "Uses", href: "/" },
        { label: "Attribution", href: "/attribution" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "RSS", href: "/rss.xml", external: true },
        { label: "LICENSE", href: "https://github.com/princepatel4423d/my-portfolio/blob/main/LICENSE", external: true },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-16 text-sm">
      {columns.map((col, idx) => (
        <div key={idx}>
          <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
            {col.title}
          </h3>
          <ul className="space-y-1 space-x-6">
            {col.links.map((link, i) =>
              link.external ? (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
