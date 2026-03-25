import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRCheckin() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      text => alert("Checked In: " + text),
      err => console.log(err)
    );
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        QR Check-in
      </h2>
      <div id="reader"></div>
    </div>
  );
}
