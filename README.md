# PapersPleaseUI

## Disclaimer
This attempt at making a game is created for educational purposes and is inspired by the game `Papers, Please` by Lucas Pope: https://papersplea.se/. Please buy it, it's awesome.

## Prerequisites
- NodeJS (v 14+)
- Angular CLI - `npm install -g @angular/cli`

## To run a local development server

Run `npm start` to start local development server at `http://localhost:4200/` .

## To run a local server with service worker
Service worker will prefetch all the necessary files and the game will not need the server anymore (can be closed).

1. Install any 3rd party web server (the development server doesn't support service workers)
    - e.g. http-server (`npm install --global http-server`)
2. Run `ng build --prod` to generate a production bundle.
3. Run the web server with `dist/PapersPleaseUI` as a source directory (`http-server -p 8080 -c-1 dist/PapersPleaseUI`)
4. Open the url in your browser (`http://localhost:8080`)


## Sources & Attribution
- https://iconscout.com/icon/woman-1659454
- https://iconscout.com/icon/asian-1659529
- https://pixabay.com/illustrations/passport-document-immigration-icon-4441589/
- https://commons.wikimedia.org/wiki/File:Slovenian_identity_card.jpg
- https://thenounproject.com/term/work-permit/247121/
- https://pixabay.com/illustrations/id-driving-license-personal-identity-4157974/
- https://www.flaticon.com/free-icon/id-card_998427?term=work%20pass&page=1&position=7&page=1&position=7&related_id=998427&origin=search
- https://thenounproject.com/term/medical-record/735342/
- https://www.flaticon.com/free-icon/certificate_2912780?term=certificate&page=1&position=20&page=1&position=20&related_id=2912780&origin=search
- https://www.flaticon.com/free-icon/medical-record_720941?term=medical&page=1&position=61&page=1&position=61&related_id=720941&origin=search
- https://www.flaticon.com/free-icon/diplomatic-police_107692?term=diplomatic&page=1&position=9&page=1&position=9&related_id=107692&origin=search
- https://thenounproject.com/term/ink-stamp/3801545/
- https://www.freeimg.net/photo/735996/seal-certifiedseal-certified-symbol
- https://pixabay.com/illustrations/approved-stamp-stamp-approved-1966719/
- https://iconarchive.com/show/outline-icons-by-iconsmind/Stamp-2-icon.html
- https://pixabay.com/illustrations/denied-stamp-rejected-rejection-5251012/
- https://pixabay.com/illustrations/approved-stamp-approval-agreement-6044530/
- https://pixabay.com/illustrations/red-button-circle-round-choose-1217969/
- https://mixkit.co/free-stock-music/, song Deep Urban by Eugenio Mininni 