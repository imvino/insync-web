'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()

  const menu = [
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

  return (
    <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
      <div className="px-6">
        <Link className="flex-none text-xl font-semibold dark:text-white" href="/" aria-label="Brand">InSync</Link>
      </div>

      <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
        <ul className="space-y-1.5">
          {menu.map((item, index) => (
            <li key={index}>
              <Link className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-slate-400 dark:hover:text-slate-300 ${pathname.startsWith('/' + item.mainLink) ? 'bg-gray-100 dark:bg-neutral-900' : ''}`} href={`/${item.mainLink}`}>
                <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                {item.title}
              </Link>
              {item.subLinks && (
                <ul className="ms-4 mt-1">
                  {item.subLinks.map((subLink, subIndex) => (
                    <li key={subIndex}>
                      <Link className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-slate-400 dark:hover:text-slate-300 ${pathname === `/${item.mainLink}/${subLink}` ? 'bg-gray-100 dark:bg-neutral-900' : ''}`} href={`/${item.mainLink}/${subLink}`}>
                        {item.submenu[subIndex]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}