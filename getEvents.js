/**
 * Gets events for current day and outputs to browser in Tana Paste format
 */

function doGet() {
  const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

  const calendarId = 'primary';
  // Add query parameters in optionalArgs
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 1 * MILLIS_PER_DAY);

  const optionalArgs = {
    timeMin: today.toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    timeMax: tomorrow.toISOString(),
    orderBy: 'startTime'
    // use other optional query parameter here as needed.
  };
  try {
    // call Events.list method to list the calendar events using calendarId optional query parameter
    const response = Calendar.Events.list(calendarId, optionalArgs);

    const events = response.items;
    if (events.length === 0) {
      console.log('No upcoming events found');
      return;
    }

    outputText = "%%tana%%\n";
    
    // Print the calendar events
    for (const event of events) {
      let start = event.start.dateTime;
      if (!start) {
        start = event.start.date;
      }
      let end = event.end.dateTime;
      if (!end) {
        end = event.end.date;
      }

    outputText +=   '- ' + event.summary + ' #meeting\n';
    outputText += '  - Date:: [[date:' + start + "/" + end + "]]\n";
    outputText += '  - URL:: ' + event.htmlLink + '\n';
    if (event.location) {
      outputText += '  - Location:: ' + event.location + '\n';
    }
    outputText += '\n';
 
    
    }
    console.log('%s (%s)', outputText);
    return  ContentService.createTextOutput(outputText);
  } catch (err) {
    // TODO (developer) - Handle exception from Calendar API
    console.log('Failed with error %s', err.message);
  }
}
