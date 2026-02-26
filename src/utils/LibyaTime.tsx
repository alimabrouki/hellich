import { useEffect, useState } from "react";

function LibyaTime() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("ar-LY", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Africa/Tripoli",
      numberingSystem: "arab",
    });

    const update = () => {
      setDateTime(formatter.format(new Date()));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm  text-[18px] font-zero font-jetbrains font-light time-font ">
      {dateTime}
    </div>
  );
}

export default LibyaTime;
