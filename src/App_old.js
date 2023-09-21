import React, { useState, useEffect } from 'react';

function App() {
  let [userFirstName, setUserFirstName] = useState('');
  let [userLastName, setUserLastName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPhone, setUserPhone] = useState('');
  let [options,setOptions] = useState([{label:'demo',value:'9785265132648'}])
  let [selectedOption, setSelectedOption] = useState('');
  let [update, setUpdate] = useState(false);

  useEffect(() => {
    if (window.ochn && !update) {
      let siteUrl = window.location.search.split('=');
      let body = { email: siteUrl[1] };
      setcheckOchn(body);
    }
  }, [update]);

  const setcheckOchn = (value) => {
    if (window.ochn && value.email !== undefined) {
      let popuplate = window.ochn.prepopulate(value);
      console.log('popuplate', popuplate);

      let data = popuplate.data;
      if (popuplate.status === 'ok') {
        setUserFirstName(data.userFirstName);
        setUserLastName(data.userLastName);
        setUserEmail(data.userEmail);
        setUserPhone(data.userPhone);
        setUpdate(true);
      }
      return popuplate;
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userFirstName') {
      setUserFirstName(value);
    } else if (name === 'userLastName') {
      setUserLastName(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPhone') {
      setUserPhone(value);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    let data = {
      "userFirstName": userFirstName,
      "userLastName": userLastName,
      "userEmail": userEmail,
      "userPhone": userPhone,
      "locationId" : selectedOption,
      "offerCategoryId" : "636d102e97cfca8dacafecd7",
      "offerId" : "636d1131666ee32450ba5f86",
    }
    let resposnse = window.ochn.register(data , true)
    if(resposnse.status === 'ok'){
      alert('success')
      setUserFirstName('')
      setUserLastName('')
      setUserEmail('')
      setUserPhone('')
      setSelectedOption('')
      setOptions([{label:'demo',value:'9785265132648'}])
    }
    console.log("data", resposnse)
  }

  return (
    <div class="App">
      <div class="container">
        <div class="title"><a fai-key="fai-track-search-item" data-fai-search-tag="lapte" href="/lapte?map=ft&_q=lapte" >Registration</a></div>
        <div class="title"><a href="/inghetata-twister-green-80-ml?map=ft&_q=inghetata-twister-green-80-ml/c" >click track</a></div>
        <div class="content">
          <form action="#">
           <div class="user-details">
              <div class="input-box">
                <span class="details">First Name</span>
                <input type="text" placeholder="Enter your first name" value={userFirstName} name='userFirstName' onChange={handleChange} required />
              </div>
              <div class="input-box">
                <span class="details">Last Name</span>
                <input type="text" placeholder="Enter your last name" value={userLastName} name='userLastName' onChange={handleChange} required />
              </div>
              <div class="input-box">
                <span class="details">Email</span>
                <input type="text" placeholder="Enter your email" value={userEmail} name='userEmail'onChange={handleChange} required />
              </div>
              <div class="input-box">
                <span class="details">Phone Number</span>
                <input type="text" placeholder="Enter your number" value={userPhone} name='userPhone'onChange={handleChange} required />
              </div>
              <div class="input-box">
                <span class="details">DOB</span>
                <input type="text" placeholder="Enter your Dob" required />
              </div>
              <div class="input-box">
                <span class="details">Password</span>
                <input type="text" placeholder="Enter your password" required />
              </div>
              <div class="input-box">
                <span class="details">Confirm Password</span>
                <input type="text" placeholder="Confirm your password" required />
              </div>
              <div class="input-box">
                <span class="details">Location</span>
                <select value={selectedOption}  onChange={handleOptionChange} style={{width:"100%", height: "44px", border: "1px solid grey", borderRadius: "6px"}}>
                  <option value="">Select an option...</option>
                  {options.map(option => (
                    <option key={option.key} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="gender-details">
              <input type="radio" name="gender" id="dot-1" />
              <input type="radio" name="gender" id="dot-2" />
              <input type="radio" name="gender" id="dot-3" />
              <span class="gender-title">Gender</span>
              <div class="category">
                <label for="dot-1">
                  <span class="dot one"></span>
                  <span class="gender">Male</span>
                </label>
                <label for="dot-2">
                  <span class="dot two"></span>
                  <span class="gender">Female</span>
                </label>
                <label for="dot-3">
                  <span class="dot three"></span>
                  <span class="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
            <div id="registerForm" class="button">
              <input type="submit" value="Profile" onClick={submit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
