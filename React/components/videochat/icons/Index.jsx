import React from "react";
import {
  TbCircleArrowRightFilled,
  TbBrandHipchat,
  TbBrandWechat,
  TbInfoCircleFilled,
  TbArrowBackUp,
  TbScreenShare,
  TbCameraOff,
  TbCamera,
  TbMicrophone2,
  TbMicrophone2Off,
} from "react-icons/tb";

export function CameraOn() {
  return <TbCamera />;
}

export function CameraOff() {
  return <TbCameraOff />;
}

export function MicrophoneOn() {
  return <TbMicrophone2 />;
}

export function MicrophoneOff() {
  return <TbMicrophone2Off />;
}

export function Screenshare() {
  return <TbScreenShare />;
}

export function Leave() {
  return <TbArrowBackUp />;
}

export function Info() {
  return <TbInfoCircleFilled />;
}

export function ChatIcon() {
  return <TbBrandWechat />;
}

export function ChatHighlighted() {
  return <TbBrandHipchat />;
}

export function Arrow() {
  return <TbCircleArrowRightFilled />;
}
