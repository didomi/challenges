import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Container, Button } from "@material-ui/core";
import { fetchConsents } from "../actionCreators/addConsent";

const useStyles = makeStyles(() => ({
  tabelcell: {
    fontWeight: "Bold",
  },
}));

function CollectedConsent({ consents, fetchConsents }) {
  const classes = useStyles();
  const [consentsDisplayed, setConsentsDisplayed] = useState([]);
  const [page, setPage] = useState(0);
  // handling the change page of the pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    //remove duplicates from the array to be displayed
    const uniqueConsents = Array.from(new Set(consents.map((a) => a.name))).map(
      (name) => {
        return consents.find((a) => a.name === name);
      }
    );

    setConsentsDisplayed(uniqueConsents);
  }, [consents]);

  //fetching the data from the mock api
  const handleFetchData = () => {
    consents = null;
    fetchConsents();
  };

  return (
    <>
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow hover>
                  <TableCell className={classes.tabelcell}>Name</TableCell>
                  <TableCell className={classes.tabelcell}>Email</TableCell>
                  <TableCell className={classes.tabelcell}>
                    Consent Given for
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* mathematical logic on displaying only 2 rows depending on the pagination page and then display the data */}
                {consentsDisplayed
                  .slice(page * 2, page * 2 + 2)
                  .map((consentItem) => {
                    return (
                      <TableRow hover key={consentItem.name}>
                        <TableCell>{consentItem.name}</TableCell>
                        <TableCell>{consentItem.email}</TableCell>
                        <TableCell>
                          {consentItem.consent.map((consent) => consent + ", ")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2]}
            component="div"
            count={consentsDisplayed.length}
            rowsPerPage={2}
            page={page}
            onChangePage={handleChangePage}
          />
        </Paper>
        <Button
          onClick={handleFetchData}
          style={{ width: "30%", margin: "5% 0 0 35%" }}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Fetch Fake Data
        </Button>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchConsents: () => dispatch(fetchConsents()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CollectedConsent);
