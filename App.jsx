import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
class App extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPhone: '',
      options: [{ label: 'demo', value: '9785265132648' }],
      selectedOption: '',
      update  : false,
      captchaToken: '', 
    }
  }

  // componentDidMount() {
  //   let siteUrl = window.location.search.split('=');
  //   let body = {email:siteUrl[1]}
  //   if(window?.ochn){
  //     console.log("window.ochn", window.ochn)
  //     window.ochn.prepopulate(body)
  //   }
  //   this.setcheckOchn(body)
  // }

  
  componentDidMount() {
    // Listen for the 'populatedData' event
    this.handlePopulatedData = (event) => {
        const data = event.detail;
        if(data.data){
          this.setState({
          userFirstName: data?.data?.userFirstName,
          userLastName: data?.data?.userLastName,
          userEmail: data?.data?.userEmail,
          userPhone: data?.data?.userPhone,
          options: [{ label: data?.data?.locationName, value: data?.data?.locationId }],
          selectedOption: data?.data?.locationId,
        })
        }
        
    };
    this.captchaToken = (event) => {
      const data = event.detail;
      if(data !== undefined){
        this.setState({
          captchaToken: data,
        })
      }
    }
    window.addEventListener('populatedData', this.handlePopulatedData);
    window.addEventListener('captchaToken', this.captchaToken);
}


  handleOptionChange = event => {

    this.setState({ selectedOption: event.target.value });
   };

  handleChange = event => {
    
    this.setState({ [event.target.name]: event.target.value });
  }
  submit = async (e) => {
    e.preventDefault();
    let data = {
      "userFirstName": this.state.userFirstName,
      "userLastName":  this.state.userLastName,
      "userEmail":  this.state.userEmail,
      "userPhone":    this.state.userPhone,
      "offerCategoryId": "636d102e97cfca8dacafecd7",
      "offerId": "636d1131666ee32450ba5f86",
      "captchaToken": this.state.captchaToken,
    }
    try {
      const response = await axios.post('https://node-express-kottairajait.vercel.app/home', data);
      console.log(response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="title"><a fai-key="fai-track-search-item" data-fai-search-tag="lapte" href="/lapte?map=ft&_q=lapte" >Registration</a></div>
          <div className="title"><a href="/inghetata-twister-green-80-ml?map=ft&_q=inghetata-twister-green-80-ml/c" >click track</a></div>
          <div className="content">
            <form action="#">
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input type="text" placeholder="Enter your first name" value={this.state.userFirstName} name='userFirstName' onChange={this.handleChange} required />
                </div>
                <div className="input-box">
                  <span className="details">Last Name</span>
                  <input type="text" placeholder="Enter your last name" value={this.state.userLastName} name='userLastName' onChange={this.handleChange} required />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="text" placeholder="Enter your email" value={this.state.userEmail} name='userEmail' onChange={this.handleChange} required />
                </div>
                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input type="text" placeholder="Enter your number" value={this.state.userPhone} name='userPhone' onChange={this.handleChange} required />
                </div>
                <div className="input-box">
                  <span className="details">DOB</span>
                  <input type="text" placeholder="Enter your Dob" required />
                </div>
                <div className="input-box">
                  <span className="details">Password</span>
                  <input type="text" placeholder="Enter your password" required />
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input type="text" placeholder="Confirm your password" required />
                </div>
                <div className="input-box">
                  <span className="details">Location</span>
                  <select value={this.state.selectedOption} onChange={this.handleOptionChange} style={{ width: "100%", height: "44px", border: "1px solid grey", borderRadius: "6px" }}>
                    <option value="">Select an option...</option>
                    {this.state.options.map(option => (
                      <option  value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="gender-details">
                <input type="radio" name="gender" id="dot-1" />
                <input type="radio" name="gender" id="dot-2" />
                <input type="radio" name="gender" id="dot-3" />
                <span className="gender-title">Gender</span>
                <div className="category">
                  <label for="dot-1">
                    <span className="dot one"></span>
                    <span className="gender">Male</span>
                  </label>
                  <label for="dot-2">
                    <span className="dot two"></span>
                    <span className="gender">Female</span>
                  </label>
                  <label for="dot-3">
                    <span className="dot three"></span>
                    <span className="gender">Prefer not to say</span>
                  </label>
                </div>
              </div>
              <div id="registerForm" className="button">
                <input type="submit" value="Profile" onClick={this.submit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App ;