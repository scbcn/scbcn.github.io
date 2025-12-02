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
  const response = await fetch("https://api.meetup.com/gql-ext", {
    method: "POST",
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
  const events = await response.json();

  return events.data.group.events.edges.map((edge: any) => edge.node);
}
