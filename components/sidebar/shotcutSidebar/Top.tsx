"use client";

import { topSidebarLinks } from "@/lib/utils";

import { SidebarLink } from "./SidebarLink";

export const Top = () => {
    return (
        <div className="flex flex-col items-center gap-3">
            {topSidebarLinks.map((link, i) => (
                <SidebarLink
                    key={`link_${i}`}
                    Icon={link.Icon}
                    hoverTextKey={link.hoverTextKey}
                    href={link.href}
                    include={link?.include}
                />
            ))}
        </div>
    );
};