import React, { useContext, useReducer, useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

const App = () => {
  const [ form, setForm ] = useState({
    // grant_type: "password",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("")
  const router = useRouter()
  const [cookies, setCookie] = useCookies(["access_token"]);

  const handleOnChange = (event) => {
    form[event.target.name] = event.target.value
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
  
    // Convert object to form body
    // see also: https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
    let body = [];
    for (let key in form) {
      let encodedKey = encodeURIComponent(key)
      let encodedValue = encodeURIComponent(form[key])
      body.push(encodedKey + "=" + encodedValue)
    }
    body = body.join("&")

    const url = "http://localhost:8000/api/login"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    })
    if (response.ok) {
      // Cookie をセット
      const responseData = await response.json()
      setCookie("access_token", responseData.access_token)
      router.push('/home')
    } else {
      setMessage("ログインに失敗しました")
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleOnChange} placeholder="ユーザー名" />
      <br />
      <input type="password" name="password" onChange={handleOnChange} placeholder="パスワード" />
      <br />
      <button type="submit">ログイン</button>
    </form>
    { message ? <p>{message}</p> : "" }
  </div>;
};

export default App;
