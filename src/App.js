import React, { Component } from 'react';
import './App.css';
import model from './data/sample.json';
class App extends Component {
  alphabets = this.generateAlphabet();
  constructor()
  {
    super();
    this.cursorStyle = {
      cursor:"pointer"
    }
    this.state = {
      fixed : false
    }
    
  }
  runOnScroll(e)
  {
    let doc = document.documentElement.scrollTop;
    if(doc > this.elementScrollTop){       
        if(!this.isPagefixed){
           this.setState({ fixed: true})
        }
        this.isPagefixed = true;
    }else{
        if(this.isPagefixed){
          this.setState({fixed:false})
        }
       this.isPagefixed = false;
    }

  }
  generateAlphabet() {
    var a = [];
    
      for(var k=0;k<model.itineraries.length;k++)
      {
        if(a.indexOf(model.itineraries[k].text.charAt(0).toUpperCase()) === -1 && a.indexOf("0-9") === -1 )
        if(!isNaN(parseInt(model.itineraries[k].text.charAt(0))))
        {
          a.push('0-9');
        } 
        else
        {
          a.push(model.itineraries[k].text.charAt(0).toUpperCase());
        } 
        
      }
    return a.sort();
	
  }

  componentDidMount(){
    this.elementScrollTop = this.scrollPage.offsetTop;
     window.addEventListener("scroll", this.runOnScroll.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.runOnScroll);
  }

  render() {
    return (
      <div className="Sitemap">
         <h1 className="heading">Pickyourtrail Sitemap</h1>
         <section className = "destination">
            <h4>Destinations</h4>
            <ul>
             {model.destinations.map(function(item,index) {
                    return <li key= {index} className="list"><a target="_blank" rel="noopener noreferrer" href={item.url}>{item.text}</a></li>
                  })} 
            </ul>
         </section>
         <section className = "vacation">
            <h4>Themed Vacations</h4>
            <ul>
             {model.vacations.map(function(item,index) {
                    return <li key= {index} className="vacation_list"><a target="_blank" rel="noopener noreferrer" href={item.url}>{item.text}</a></li>
                  })} 
            </ul>
         </section>
         <section className = "pageNavigation" ref = {(node)=> this.scrollPage = node} className = {this.state.fixed ? 'pageNavigation pageFixed' : 'pageNavigation'}>
            <h4>Showing all {model.itineraries.length} pages</h4>
            <ul className="alphabets">
             {this.alphabets.map(function(item,index) {
                    return <li style={this.cursorStyle} key= {index} className="alphabet_list"><a href={"#"+item+"_"+index}>{item}</a></li>
                  },this)} 
            </ul>
         </section>
         <section className = "itenaries">
           
            {this.alphabets.map(function(item,index) {
               return (<div key= {index+"_"} className="scroll"><span id={item+"_"+index}></span> <div   className="generateItenaries">
                
                 <div className="itenaries_alphabets_list"><b key= {index+"_"}>{item}</b></div>
                 <div className="alpha_list"><ul>
                 {model.itineraries.map(function(item1,index1)
                {
                  return item1.text.charAt(0) === item ? <li key= {index1}><a target="_blank" rel="noopener noreferrer" href={item1.url}>{item1.text}</a></li>:(!isNaN(parseInt(item1.text.charAt(0))) && item === '0-9') ?  <li key= {index1}><a  target="_blank" rel="noopener noreferrer" href={item1.url}>{item1.text}</a></li> : null
                })}
                 </ul>
                 </div> 
                </div>
                </div>
                )
               },this)} 
         </section>
      </div>
    );
  }
}

export default App;
