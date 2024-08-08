

export default function Home() {
    return <div className="max-w-2xl">
        <div className="px-1 my-4 dark:text-white">Capitolia CA - 41st</div>
        <div className="flex flex-col bg-white dark:bg-neutral-800">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg overflow-hidden dark:border-neutral-600">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-600">
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-600 font-medium">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    41st Ave & Clares St
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    41st Ave & Gross Rd / Hwy 1 SB Ramp
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}