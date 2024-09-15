import { useState, useEffect } from "react";

// import { eventBusService } from "../services/event-bus.service";
import { eventBusService } from "../src/services/event-bus.service.js";

export function UserMsg() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const unsub = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg);
    });
    return () => unsub();
  }, []); // Add empty dependency array

  function onCloseMsg() {
    setMsg(null);
  }

  if (!msg) return null;
  return (
    <div className={`user-msg ${msg.type}`}>
      <h4>{msg.txt}</h4>
      <button onClick={onCloseMsg} className="close-btn">
        X
      </button>
    </div>
  );
}
