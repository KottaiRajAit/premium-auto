import React from 'react';
import autoBind from 'react-autobind';
class App extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state ={
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPhone: '',
      options: [{ label: 'TIRIAC AUTO BUCURESTI 1 (Baneasa) | JAGUAR', value: '5d80b911552c1d7890b8402c' },{label:"BRIT Motor AG | JAGUAR",value:"5d80bda5552c1d7890b8402f"},{label:"TIRIAC AUTO BUCURESTI 2 (Pipera) | JAGUAR",value:"5d821783552c1d7890b84058"},{ label: 'TIRIAC AUTO BRASOV | JAGUAR', value: '5d821923552c1d7890b8408c' },{label:"EXCLUSIV AUTO ENB | JAGUAR",value:"5d8219ec552c1d7890b840a7"},{label:"CASA AUTO IASI | JAGUAR",value:"5d821aec1bd2116d3736e0e2"},{label:"PREMIUM AUTO | LAND ROVER",value:"5d84ee24c9b6a664faee2723"},{label:"EXPRESSLINE | LAND ROVER",value:"5d9b0ecd98520d4095910d9d"},{label:"EXPRESSLINE | JAGUAR",value:"5d9b152398520d4095910e2b"},{label:"RMB INTER AUTO | LAND ROVER",value:"5d9b16f998520d4095910e3b"},{label:"RMB INTER AUTO | JAGUAR",value:"5d9b17c998520d4095910e40"},{label:"PREMIUM AUTO | JAGUAR",value:"5d9b18e398520d4095910e61"},{label:"CASA AUTO IASI | LAND ROVER",value:"5d9b1e9298520d4095910f50"},{label:"EXCLUSIV AUTO ENB | LAND ROVER",value:"5d9b390298520d4095910f86"},{label:"TIRIAC AUTO BRASOV | LAND ROVER",value:"5d9b39f498520d4095910fe1"},{label:"BRIT Motor AG | LAND ROVER",value:"5d9b3cfa98520d4095911006"},{label:"TIRIAC AUTO BUCURESTI 2 (Pipera) | LAND ROVER",value:"5d9b4a1698520d4095911057"},{label:"TIRIAC AUTO BUCURESTI 1 (Baneasa) | LAND ROVER",value:"5d9b4b4898520d409591106a"},{label:"DAB AUTO SERV",value:"64ca76b45cf1e183e21f0591"},{label:"TIRIAC AUTO ORADEA",value:"64ca7a185cf1e183e21f26fb"},{label:"TIRIAC AUTO BACAU",value:"64ca7b5d5cf1e183e21f3461"},{label:"IRICAD GALATI",value:"64ca7e115cf1e183e21f4004"}],
      selectedOption: '',
      catalogOptions: [{ label:'LAND ROVER', value:'602648ad876c9d0deced24d8'},{label:'JAGUAR',value:'60267b9f876c9d0deced2f40'}],
      selectedCatalogOption: '',
      productOptions: [{ label:'RANGE ROVER', value:'60264e4d876c9d0deced2614'},{ label:'DEFENDER 90', value:'60264a5f876c9d0deced254a'},{ label:'XF', value:'60267bdc876c9d0deced2f54'},{ label:'RANGE ROVER EVOQUE', value:'60264df9876c9d0deced2606'},{ label:'DISCOVERY', value:'60264de1876c9d0deced2601'},{ label:'F-PACE', value:'60267c07876c9d0deced2f68'},{ label:'I-PACE', value:'60267c10876c9d0deced2f6e'},{ label:'DEFENDER 110', value:'60264a7e876c9d0deced2554'},{ label:'DEFENDER 130', value:'62fcf300d523f678c51c32d0'},{ label:'RANGE ROVER VELAR', value:'60264e15876c9d0deced260a'},{ label:'I-PACE', value:'60267c10876c9d0deced2f6e'},{ label:'DISCOVERY SPORT', value:'60264aa5876c9d0deced255c'},{ label:'RANGE ROVER SPORT', value:'60264e2a876c9d0deced260e'},{ label:'F-TYPE Convertible', value:'60267c29876c9d0deced2f7c'},{ label:'F-TYPE Coupe', value:'60267c1c876c9d0deced2f74'},{ label:'E-PACE', value:'60267bf8876c9d0deced2f61'},{ label:'XE', value:'60267bca876c9d0deced2f4d'},{ label:'XJ', value:'60267be9876c9d0deced2f5b'}],
      selectedProductOption: '',
    }
  }

  
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
          selectedOption: data?.data?.locationId,
          selectedCatalogOption: data?.data?.offerCategoryId,
          selectedProductOption: data?.data?.offerId,
        })
        }
    };
    window.addEventListener('populatedData', this.handlePopulatedData);
}


  handleOptionChange = event => {
    this.setState({ selectedOption: event.target.value });
  };
  handleCatalogOptionChange = event => {
    this.setState({ selectedCatalogOption: event.target.value });
  };
  handleProductOptionChange = event => {
    this.setState({ selectedProductOption: event.target.value });
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
      "offerCategoryId": this.state.selectedCatalogOption,
      "locationId": this.state.selectedOption,
      "offerId": this.state.selectedProductOption,
    }
    try {
      const response = window.ochn.register(data, true)
      if(response.status === 'ok'){
        alert("success")
        this.setState({
          userFirstName: '',
          userLastName: '',
          userEmail: '',
          userPhone: '',
          selectedOption: '',
          selectedProductOption: '',
          selectedCatalogOption: '',
        })
      }else{
        alert("error: "+ response.message)
      }
      // Do something with the response if needed
    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="title">Lead Creation Form</div>
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
                <div className="input-box">
                  <span className="details">Catalog</span>
                  <select value={this.state.selectedCatalogOption} onChange={this.handleCatalogOptionChange} style={{ width: "100%", height: "44px", border: "1px solid grey", borderRadius: "6px" }}>
                    <option value="">Select an option...</option>
                    {this.state.catalogOptions.map(option => (
                      <option  value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Product</span>
                  <select value={this.state.selectedProductOption} onChange={this.handleProductOptionChange} style={{ width: "100%", height: "44px", border: "1px solid grey", borderRadius: "6px" }}>
                    <option value="">Select an option...</option>
                    {this.state.productOptions.map(option => (
                      <option  value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div id="registerForm" className="button">
                <input type="submit" value="Submit" onClick={this.submit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App ;
