import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 } from 'uuid';
// import Peer from 'peerjs';
declare var Peer: any;

@Component({
  selector: 'app-zoomvideo',
  templateUrl: './zoomvideo.component.html',
  styleUrls: ['./zoomvideo.component.css']
})
export class ZoomvideoComponent implements OnInit {

  myVideoStream;
  myVideo;
  videoGrid;
  peers = {};
  myPeer;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.myVideo = document.getElementById('video');
    this.initializePeer();
  }

  initializePeer() {
    // const peer = new Peer('pick-an-id');
    this.videoGrid = document.getElementById('video-grid')
    this.myPeer = new Peer(undefined, {
      path: '/peerjs',
      host: 'localhost',
      port: 9000,
      debug: false
    });
    this.myVideo = document.getElementById('video');
    this.myVideo.muted = true;
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      window.console.log(stream, '41');
      this.myVideoStream = stream;
      this.addVideoStream(this.myVideo, stream)
      this.myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })
    
      this.socket.on('user-connected', userId => {
        this.connectToNewUser(userId, stream)
      });
    }).catch(error => {
      window.console.log(error, '57');
    })
  }

  addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    this.videoGrid.append(video);
  }

  connectToNewUser(userId, stream) {
    const call = this.myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      this.addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    this.peers[userId] = call;
  }

  muteUnmute() {
    const enabled = this.myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      this.myVideoStream.getAudioTracks()[0].enabled = false;
      this.setUnmuteButton();
    } else {
      this.setMuteButton();
      this.myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }

  setUnmuteButton() {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.zoom__mute_button').innerHTML = html;
  }

  setMuteButton() {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.zoom__mute_button').innerHTML = html;
  }

  playStop() {
    console.log('object')
    let enabled = this.myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      this.myVideoStream.getVideoTracks()[0].enabled = false;
      this.setPlayVideo()
    } else {
      this.setStopVideo()
      this.myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }

  setPlayVideo() {
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
    document.querySelector('.zoom__video_button').innerHTML = html;
  }

  setStopVideo() {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
    document.querySelector('.zoom__video_button').innerHTML = html;
  }
}
