import React, { Component } from "react";
import Campaign from "./Campaign";
import Adsets from "./Adsets";
import Ads from "./Ads";
import AdCreative from "./AdCreative";
import '../App.css';
import { Button, ButtonGroup } from 'react-bootstrap';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
          name: "React",

          showHideCampaign: true,
          showHideAdsets: false,
          showHideAds: false,
          showHideAdCreative: false,

          campButton: "primary",
          adsetButton : "light",
          adsButton : "light",
          adCreativeButton : "light",
        };
        this.hideComponent = this.hideComponent.bind(this);
      }
    
      hideComponent(name) {
        console.log(name);
        switch (name) {

          case "showHideCampaign":
            this.setState({ 
                showHideCampaign: true,
                showHideAdsets: false,
                showHideAds: false,
                showHideAdCreative: false,

                campButton: "primary",
                adsetButton : "light",
                adsButton : "light",
                adCreativeButton : "light",
            });
            break;

          case "showHideAdsets":
            this.setState({ 
                showHideAdsets: true,
                showHideCampaign: false,
                showHideAds: false,
                showHideAdCreative: false,

                adsetButton : "primary",
                campButton: "light",
                adsButton : "light",
                adCreativeButton : "light"
            });
            break;

            case "showHideAds":
            this.setState({ 
                showHideAds: true,
                showHideAdsets: false,
                showHideCampaign: false,
                showHideAdCreative: false,

                adsButton : "primary",
                campButton: "light",
                adsetButton : "light",
                adCreativeButton : "light"   
                
            });
            break;

            case "showHideAdCreative":
            this.setState({ 
                showHideAdCreative: true,
                showHideAds: false,
                showHideAdsets: false,
                showHideCampaign: false,

                adCreativeButton : "primary",
                adsButton : "light",
                campButton: "light",
                adsetButton : "light"     
                
            });
            break;
        }
      }
    
      render() {
        const { showHideCampaign, showHideAdsets, showHideAds, showHideAdCreative } = this.state;
        return (
            <div className="main">
                 <div>
                     <ButtonGroup >
                        <Button variant={this.state.campButton} style={{width : 150 }} onClick={() => this.hideComponent("showHideCampaign")}>
                            Campaign
                        </Button >
                        <Button variant={this.state.adsetButton} style={{width : 150 }} onClick={() => this.hideComponent("showHideAdsets")}>
                            Adsets
                        </Button>
                        <Button variant={this.state.adCreativeButton} style={{width : 150 }} onClick={() => this.hideComponent("showHideAdCreative")}>
                            AdCreative
                        </Button>
                        <Button variant={this.state.adsButton} style={{width : 150 }} onClick={() => this.hideComponent("showHideAds")}>
                            Ads
                        </Button>
                     </ButtonGroup>
                    
                </div>
            {showHideCampaign && <Campaign />}
            {showHideAdsets && <Adsets />}
            {showHideAdCreative && <AdCreative />}
            {showHideAds && <Ads />}
          </div>
        );
      }
    }

    
export default Dashboard