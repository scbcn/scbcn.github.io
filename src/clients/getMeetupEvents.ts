export interface MeetupEvent {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  eventUrl: string;
  rsvpState: string;
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
                events {
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

    return events?.data?.group?.events?.edges?.map((edge: any) => edge.node) ?? [];
  } catch (e) {
    console.error("Error fetching Meetup events:", e);
    return [];
  }
}

