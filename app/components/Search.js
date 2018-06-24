import React, { Component } from 'react'

export default class Search extends Component {
  constructor(){
    super();
    this.state={
      country_name:"India"
    }
    this.changevalue=this.changevalue.bind(this);
  }
  changevalue(event){
    this.setState({country_name:event.target.value},()=>{
      this.props.filter({
        name: "country",
        value : this.state.country_name 
      });
    });
  }
  render() {
    return (
        <div className="searchContainer">
            <h5 className="heading-filter text-center">Search Filters</h5>
            <div className="search-form-input">
              <div className="filter-title">Country</div>
              <select className="selectinput" onChange={this.changevalue} value={this.state.country_name}>
                <option value="Argentina">Argentina</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Czechia">Czechia</option>
                <option value="Denmark">Denmark</option>
                <option value="Egypt">Egypt</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Kenya">Kenya</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Mexico">Mexico</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Norway">Norway</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Singapore">Singapore</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="Spain">Spain</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Thailand">Thailand</option>
                <option value="Turkey">Turkey</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>
            <div className="social-like">
              <div className="fb-like"
                data-share="true"
                data-size="large"
                data-width="300"
                data-show-faces="true">
              </div>
            </div>
        </div>
    )
  }
}
