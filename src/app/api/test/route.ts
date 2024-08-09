// app/api/corridor-status/route.ts

import { NextResponse } from 'next/server';

async function getCorridorIntersections() {
    // Implement this function to return intersection data
    // This is a placeholder implementation
    return {
        '192.168.1.1': 'Intersection A',
        '192.168.1.2': 'Intersection B',
        // Add more intersections as needed
    };
}

export async function GET() {
    const intersections = await getCorridorIntersections();
    const results = [];

    for (const [ip, name] of Object.entries(intersections)) {
        try {
            const response = await fetch(`http://${ip}/specialcalls.php`, {
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (response.ok) {
                const xmlString = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                const networkElement = xmlDoc.querySelector('Network');
                const ipAddr = networkElement?.getAttribute('IP');

                if (ipAddr === ip) {
                    results.push({
                        intersectionName: name,
                        ipAddress: ipAddr,
                        status: 'Online'
                    });
                } else {
                    results.push({
                        intersectionName: name,
                        ipAddress: ip,
                        status: 'Offline'
                    });
                }
            } else {
                results.push({
                    intersectionName: name,
                    ipAddress: ip,
                    status: 'Offline'
                });
            }
        } catch (error) {
            results.push({
                intersectionName: name,
                ipAddress: ip,
                status: 'Offline'
            });
        }
    }

    return NextResponse.json(results);
}