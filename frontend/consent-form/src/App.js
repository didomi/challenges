import React from "react";
import { Link, Router } from "@reach/router";
import GiveConsent from "./components/GiveConsent";
import CollectedConsent from "./components/CollectedConsent";
import { Breadcrumbs } from "@material-ui/core";

// logic for the active link

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "red" : "blue",
          textDecoration: "none",
          margin: "50px",
          fontSize: "24px",
        },
      };
    }}
  />
);

function App() {
  return (
    <>
      <Breadcrumbs style={{ margin: "20px" }}>
        <NavLink to="/give-consent">Give consent</NavLink>
        <NavLink to="/consents">Collected consents</NavLink>
      </Breadcrumbs>

      <Router>
        <GiveConsent path="/give-consent" />
        <CollectedConsent path="consents" />
      </Router>
    </>
  );
}

export default App;
