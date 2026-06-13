export interface MeetupEvent {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  eventUrl: string;
  rsvpState: string;
  isPast?: boolean;
}

export async function getMeetupEvents(groupId: number): Promise<MeetupEvent[]> {
  try {
    const response = await fetch("https://api.meetup.com/gql-ext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            group(id: ${groupId}) {
                upcoming: events(status: ACTIVE) {
                  edges {
                      node {
                          id,
                          title,
                          description,
                          dateTime,
                          duration,
                          eventUrl,
                          rsvpState
                      }
                  }
                }
                past: events(status: PAST, sort: DESC, first: 30) {
                  edges {
                      node {
                          id,
                          title,
                          description,
                          dateTime,
                          duration,
                          eventUrl,
                          rsvpState
                      }
                  }
                }
            }
        }
      `,
      }),
    });

    if (!response.ok) {
      console.error(`Meetup API returned status ${response.status}`);
      return [];
    }

    const events = await response.json();
    if (events.errors) {
      console.error("Meetup API returned errors:", events.errors);
      return [];
    }

    const now = new Date();
    const currentYear = now.getFullYear();

    const upcomingNodes = events?.data?.group?.upcoming?.edges?.map((edge: any) => ({
      ...edge.node,
      isPast: false,
    })) ?? [];

    const pastNodes = events?.data?.group?.past?.edges?.map((edge: any) => ({
      ...edge.node,
      isPast: true,
    })) ?? [];

    // Filter past events to only keep those from the current year
    const pastThisYear = pastNodes.filter((event: any) => {
      const eventYear = new Date(event.dateTime).getFullYear();
      return eventYear === currentYear;
    });

    // Upcoming events sorted ascending by date (soonest first)
    const sortedUpcoming = upcomingNodes.sort(
      (a: any, b: any) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

    // Past events sorted descending by date (most recent first)
    const sortedPast = pastThisYear.sort(
      (a: any, b: any) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

    return [...sortedUpcoming, ...sortedPast];
  } catch (e) {
    console.error("Error fetching Meetup events:", e);
    return [];
  }
}

