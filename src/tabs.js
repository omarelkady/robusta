import React, { Component } from 'react';
import './tabs.css';

export default class Tabs extends Component {
  constructor(props) {
    super(props);  
    // active tab index
    const activeIndex = props.tabs.findIndex(({ active }) => active);
    this.state = {
      activeIndex:  activeIndex >= 0 ? activeIndex : 0
    };
  }

  clickHandler = i => () => { this.setState({activeIndex: i}); }

  render() {
    const {tabs} = this.props;
    const {activeIndex} = this.state;

    const titles = tabs.map((tab, i) => {
      return (
        <li className={`tab${i === activeIndex ? ' active' : ''}`} key={i}
          onClick={this.clickHandler(i)}>
          <i className={`icon ${tab.iconClass}`}></i>
          {tab.title}
        </li>
      );
    });

    const contents = tabs.filter((tab, i) => i === activeIndex)
      .map((tab, i) => {
        return (
          <div className="tab-content" key={i}
            dangerouslySetInnerHTML={{__html: tab.content}}></div>
        );
      });

    return (
      <div>
        <div className="tabs">
          <ul className="tab-group">{titles}</ul>
          <div className="tab-content-group">{contents}</div>
        </div>
        {/* <pre>{JSON.stringify(tabs, null, 2)}</pre> */}
      </div>
    );
  } 
}
