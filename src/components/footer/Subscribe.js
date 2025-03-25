import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyt8nb6cKZyOFJXrmUx54O853IIep5qJU-PF7HcWEAfGGBBrftO1VSMX452l5v9GS98lA/exec",
      {
        method: "POST",
        mode: "no-cors", // Handle CORS issues
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    setLoading(false);
    setSent(true);
    console.log(response)
  };

  console.log(sent);

  return (
    <>
      <form onSubmit={subscribe}>
        <div className="mailinput">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FontAwesomeIcon className={sent ? "sent" : ""} icon={faEnvelope} />
        </div>
        <button
          className={`btn ${sent ? "success" : ""}`}
          disabled={loading || sent}
        >
          {loading ? "Loading..." : sent ? "Subscribed" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default Subscribe;