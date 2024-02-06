
![PepegaRemux Banner](https://i.imgur.com/J5iPmB9.png)

##
I was tired of using browser-sourced downloaders and making my own is a good way to learn, so here's the juice.

PepegaRemux is supposed to be user friendly and it's mainly consuming yt-dlp so far. Probably working with all supported yt-dlp sites, but i didn't tested all.


![PepegaRemux GUI](https://i.imgur.com/4oMx5jf.gif)


## Features

- Download videos and musics from the web
- Mp3, webm, mp4, vorbis conversion

## Installation (Preview not released yet, but it'll be something like this)

1. Clone the repository: `git clone https://github.com/yourusername/pepegaremux.git`
2. Navigate into the project directory
3. Install the dependencies for the `root folder`, `react-pepegaremux and` `server-pepegaremux` using `npm install` on each one. (I'm looking on merging them)

## Usage

1. Start the application by running `start.bat`
2. Enter the URL of the video or playlist you want to download in the input field.
3. Click the 'Download' button to download everything or click on the download icon on the specific video you wanna download.

## Requirements
- yt-dlp on PATH
- ffmpeg on PATH
- node/npm

## Structure
- Electron (To render on Desktop)
- Express (Dealing with the console, yt-dlp commands mostly)
- SocketIO (For real time communication with React)
- React

## Contributing

PRs are welcome. just hmu.

