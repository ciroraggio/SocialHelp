import React from "react";
import { useTimer } from "react-timer-hook";

export function TimerTask({ expiryTimestamp, callback, timer }) {
  const {
    isRunning,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      callback();
    },
  });

  if (isRunning === false) {
    const time1 = new Date();
    time1.setSeconds(time1.getSeconds() + timer);
    restart(time1);

  }

  return <></>;
}
