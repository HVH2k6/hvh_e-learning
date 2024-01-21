import React, { useEffect } from "react";

const CountDown = () => {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  useEffect(() => {
    const target = new Date("June 28, 2024 0:0:0").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);
  }, []);
  return (
    <div className="fixed bottom-3 right-4 max-md:hidden">
      <h3 className="mb-5 font-semibold text-xl">
        Thời gian thi thpt quốc gia
      </h3>
      <div className="flex items-center gap-x-5">
        <div className="w-16 h-16 shadow-md flex items-center justify-center text-blue-400 font-medium">
          {days} ngày
        </div>
        <div className="w-16 h-16 shadow-md flex items-center justify-center text-blue-400 font-medium">
          {hours} giờ
        </div>
        <div className="w-16 h-16 shadow-md flex items-center justify-center text-blue-400 font-medium">
          {minutes} phút
        </div>
        <div className="w-16 h-16 shadow-md flex items-center justify-center text-blue-400 font-medium">
          {seconds} giây
        </div>
      </div>
    </div>
  );
};

export default CountDown;
