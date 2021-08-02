import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from '@material-ui/core/Button';
  import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from 'components/controls/Input';
import MenuItem from '@material-ui/core/MenuItem';
import avatar from "assets/img/faces/marc.jpg";
import InputAdornment from '@material-ui/core/InputAdornment';
import useSWR from "swr";
import { patientAPI } from "../../lib/api/admin";
import SelectField from "components/controls/SelectField";
import { MedicalObjects } from "Medical_constants/constants";
import { withWidth } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },  
  btnDiv :{
    display :"flex",
    justifyContent :"center"
  },
  btn: {
    width:200,
    margin:4,
  },
}));

export default function MedicalExam() {
  const classes = useStyles();
  // const [patients, setPatients] = useState([]);
  // const { data: pData, error: pErr } = useSWR([""], patientAPI.fetchPatients);
  /*useEffect(() => {
    if (!pErr && pData) {
      const data = JSON.parse(pData)?.data
        .filter((patient) => !patient.is_approved)
        .map((patient) => {
          return [
            patient.user.first_name,
            patient.user.last_name,
            patient.user.email,
            patient.user.date_joined,
            `${patient.type} : ${patient.education_level}`,
            patient.pid,
          ];
        });
      setPatients(data);
    } else {
      //Show error
    }
  }, [pData, pErr]);*/
  //select fields const-----------------------
  const initialState={
    patient: "",
    social_number:"",
    biometric: "",
    tobaco_consumption: "",
    tobaco_taken_as: "",
    number_units: "",
    alcohol_consumption: "",
    medication_consumption: "",
    medications: "",
    general_diseases:"",
    surgical_intervention:"",
    allergic_reaction:"",
    congenital_condition:""
  }
  const[keyForm,setkey]=React.useState(0)//when i click cancel : state change so all components on the form will re_render 
  const [values, setValues] = React.useState({
    initialState
  });
  const postData = () => {
    console.log("labess");
}
const cancel = () => {
  setValues({
    ...initialState,
  });
  setkey({
    keyForm: keyForm + 1
  })
}
const handleChange = (event) => {
  if (event?.target) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }
};
  return (
    <div>
      <form key={keyForm}>
      <GridContainer>
          <Card>
            <CardBody>
          <GridContainer>
          <GridItem xs={12}>
            <SelectField name="patient" label="Patient" options={MedicalObjects.currencies} onChange={handleChange}
          value={values.patient} />
          </GridItem>  
          </GridContainer>
              <GridContainer>
                <GridItem xs={6} sm={12} md={6}>
                <TextField
          name="social_number"
          variant="outlined"
          label="Social number"
          fullWidth
          type="number"  
          onChange={handleChange}
          value={values.social_number}
        />
                </GridItem>
                <GridItem xs={6} sm={12} md={6}>
                <TextField
          name="biometric"
          label="Biometric"
          fullWidth
          onChange={handleChange}
          value={values.biometric}
        />
                </GridItem>
          </GridContainer>
      
              <GridContainer>        
                <GridItem xs={12} sm={12} md={4}>
                <SelectField
          name="tobaco_consumption"
          onChange={handleChange}
          label="Tobaco consumption"
          onChange={handleChange}
          value={values.tobaco_consumption}
          options={MedicalObjects.tobaco_consumption}
        >
        </SelectField>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <SelectField
          name="tobaco_taken_as"
          onChange={handleChange}
          label="Tobaco product"
          onChange={handleChange}
          value={values.tobaco_taken_as}
          options={MedicalObjects.PRODUCT}
        >
        </SelectField>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <TextField
          name="number_units"
          label="Number units"
          onChange={handleChange}
          value={values.number_units}
          fullwidth
        />
                </GridItem>
              </GridContainer>
              <GridContainer>        
                <GridItem xs={12} sm={12} md={6}>
                <SelectField
          name="alcohol_consumption"
          onChange={handleChange}
          value={values.alcohol_consumption}
          label="Alcohol consumption"
          options={MedicalObjects.tobaco_consumption}
        >
        </SelectField>
                </GridItem>
              </GridContainer>
              <GridContainer>        
                <GridItem xs={12} sm={12} md={6}>
                <SelectField
          name="medication_consumption"
          label="Medication consumption"
          options={MedicalObjects.tobaco_consumption}
          onChange={handleChange}
          value={values.medication_consumption}
          >
        </SelectField>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Medications"
                    name="medications"
                    fullWidth
                    onChange={handleChange}
                    value={values.medications}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>        
              <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="General diseases"
                    name="general_diseases"
                    fullWidth
                    onChange={handleChange}
                    value={values.general_diseases}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Surgical intervention"
                    name="surgical_intervention"
                    fullWidth
                    onChange={handleChange}
                    value={values.surgical_intervention}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>        
              <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Congenital condition"
                    name="congenital_condition"
                    fullWidth
                    onChange={handleChange}
                    value={values.congenital_condition}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="Allergic reaction"
                    name="allergic_reaction"
                    fullWidth 
                    onChange={handleChange}
                    value={values.allergic_reaction}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <br></br>
            <div className={classes.btnDiv}>
                <Button variant="contained" color="primary" size="large" className={classes.btn} onClick={postData} type='submit'>
                Create
               </Button>
                        
                <Button variant="contained" color="secondary" size="large" className={classes.btn} onClick={cancel} type='submit'>
                   Cancel
                </Button>
                
          </div>
          <CardFooter>
            </CardFooter>
          </Card>
      </GridContainer>
      </form>
    </div>
  );
}
