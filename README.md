# today-to-tana
Reads today's events from Google Calendar and returns them in Tana Paste format

Creates an example output like:

%%tana%%
- <Event Name> #meeting
  - Date:: [[date:2023-04-09T06:00:00-04:00/2023-04-09T07:00:00-04:00]]
  - URL:: <Google URL>
  - Location:: <Location - if exists>
  
  I have this deployed as a web application with a bookmarked URL. I can just run it each day, copy the output and paste into my daily Tana node. 
