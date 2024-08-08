'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const menuData = [
    {
        title: "Management Group",
        mainLink: "management",
        subLinks: ["portal", "view", "map", "status"],
        submenu: ["Portal", "View", "Map", "Status"],
        icon: '<i class="fa-sharp fa-solid fa-traffic-light"></i>',
    },
    {
        title: "Views",
        mainLink: "views",
        subLinks: ["cameraViewSingle", "cameraViewMulti", "recording"],
        submenu: ["Single Camera", "Multi Camera", "Recording Options"],
        icon: '<i class="fa-solid fa-tv"></i>',
    },
    {
        title: "Reports",
        mainLink: "reports",
        subLinks: ["dailySummary", "statistics", "history", "notifications"],
        submenu: ["Daily Summary", "Statistics", "History Viewer", "Notifications"],
        icon: '<i class="fa-solid fa-chart-simple"></i>',
    },
    {
        title: "Settings",
        mainLink: "settings",
        subLinks: ["configure", "renamePhases", "gps", "ntp", "corridorDesigner", "portalDesigner", "maintenance", "emailTester", "troubleshooting"],
        submenu: ["Configure Detectors", "Rename Phases", "GPS Coordinates", "NTP Server", "View Designer", "Portal Designer", "Maintenance", "Email Test", "Troubleshooting"],
        icon: '<i class="fa-solid fa-gear"></i>',
    },
    {
        title: "Account",
        mainLink: "account",
        subLinks: ["editUsers", "invalidLogins"],
        submenu: ["Edit Users", "Invalid Logins"],
        icon: '<i class="fa-solid fa-user"></i>',
    },
];

export default function Menu() {
    const [activeMenu, setActiveMenu] = useState(null);
    const pathname = usePathname();

    return (
        <nav>
            <ul>
                {menuData.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${item.mainLink}`}>
                            <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                            {item.title}
                        </Link>
                        <ul className={activeMenu === index ? 'submenu active' : 'submenu'}>
                            {item.subLinks.map((subLink, subIndex) => (
                                <li key={subIndex}>
                                    <Link href={`/${item.mainLink}/${subLink}`}>
                                        {item.submenu[subIndex]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
}