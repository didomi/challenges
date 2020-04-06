import React, { useState } from "react";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
} from "@material-ui/core";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { addConsent } from "../actionCreators/addConsent";
import * as API from "../api/api";
export function GiveConsent({ addConsent }) {
  //initializing the data to be sent to the redux and the mockdata
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newConsent = { name, email, consent };
    //making a post redux, adding the the data to redux logging any errors and then redirect to the consents page

    API.postData(newConsent)
      .then((res) => {
        addConsent(newConsent);
        console.log("ssucess", res);
      })
      .catch((err) => {
        console.error(err);
      });
    navigate("/consents");
  };
  // simple logic for adding and removing the checked value of the check boxes
  const handleCheckBox = (e) => {
    if (e.target.checked === true) {
      setConsent([...consent, e.target.value]);
    } else {
      setConsent(consent.filter((item) => item !== e.target.value));
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              label="Name"
              name="name"
            />
            <TextField
              required
              type="email"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>I agree to:</p>
            <FormControlLabel
              control={<Checkbox type="checkbox" name="newsletter" />}
              label="Recieve newsletter"
              value="Recieve newsletter"
              onChange={handleCheckBox}
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" name="ads" />}
              label="Be shown targeted ads"
              value="Be shown targeted ads"
              onChange={handleCheckBox}
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" name="statistics" />}
              label="Contribute to anonymous visit statistics"
              value="Contribute to anonymous visit statistics"
              onChange={handleCheckBox}
            />
            <Button
              disabled={consent.length ? false : true}
              style={{ width: "35%", margin: "auto" }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Give consent
            </Button>
          </FormGroup>
        </form>
      </Container>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addConsent: (data) => dispatch(addConsent(data)),
});

export default connect(null, mapDispatchToProps)(GiveConsent);
