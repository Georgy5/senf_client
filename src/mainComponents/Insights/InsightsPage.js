/** @format */

import React, { Component } from "react";

import Analyse from "./graphs/analyse";
import ThemenDialog from "./graphs/themendialog";
import StadttteilDialog from "./graphs/stadtteilDialog";
import AltersgruppeDialog from "./graphs/altersgruppeDialog";
import WordcloudDialog from "./graphs/wordcloudDialog";

import Themencover from "../../images/themencover.png";
import Stadtteilcover from "../../images/stadtteilcover.png";
import Keywordscover from "../../images/keywordscover.png";
import Altersgruppencover from "../../images/altersgruppencover.png";

export class InsightsPage extends Component {
  render() {
    const { order } = this.props;

    return order === 3 ? (
      <>
        <div className="MainAnimation2">
          <Analyse />
          <div className="cover cover1">
            <img src={Themencover} width="100%" alt="Themencover" />
            <ThemenDialog />
          </div>
          <div className="cover cover2">
            <img src={Stadtteilcover} width="100%" alt="Themencover" />
            <StadttteilDialog />
          </div>

          <div className="cover cover4">
            <AltersgruppeDialog agegroups={this.props.data} />
            <img src={Altersgruppencover} width="100%" alt="Themencover" />
          </div>
          <div className="cover cover3">
            <img src={Keywordscover} width="100%" alt="Themencover" />{" "}
            <WordcloudDialog />
          </div>
        </div>
      </>
    ) : null;
  }
}

export default InsightsPage;
