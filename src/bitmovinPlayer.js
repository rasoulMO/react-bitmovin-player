import React from "react";
import {Player} from "bitmovin-player";
import {UIFactory} from "bitmovin-player/bitmovinplayer-ui";
import "bitmovin-player/bitmovinplayer-ui.css";

class BitmovinPlayer extends React.Component {
	state = {
		player: null,
	};

	playerConfig = {
		key: "<YOUR_PLAYER_KEY>",
	};

	playerSource = {
		title: "Default Demo Source Config",
		description:
			'Select another example in "Step 4 - Load a Source" to test it here',
		// dash is for the video resolution and the audio bitrate
		dash: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
		// hls is for the audio bitrate
		hls: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
		progressive:
			"https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4",
		// poster is the image that is displayed before the video starts playing
		poster: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg",
	};

	constructor(props) {
		super(props);
		this.playerDiv = React.createRef();
	}

	componentDidMount() {
		this.setupPlayer();
	}

	componentWillUnmount() {
		this.destroyPlayer();
	}

	setupPlayer() {
		const player = new Player(this.playerDiv.current, this.playerConfig);
		UIFactory.buildDefaultUI(player);
		player.load(this.playerSource).then(
			() => {
				this.setState({
					...this.state,
					player,
				});
				console.log("Successfully loaded source");
			},
			() => {
				console.log("Error while loading source");
			}
		);
	}

	destroyPlayer() {
		if (this.state.player != null) {
			this.state.player.destroy();
			this.setState({
				...this.state,
				player: null,
			});
		}
	}

	render() {
		return <div id='player' ref={this.playerDiv} />;
	}
}

export default BitmovinPlayer;
