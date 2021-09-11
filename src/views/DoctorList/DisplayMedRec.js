/* eslint-disable camelcase */
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
// import doctorAPI from 'lib/api/doctor';
// import { extractErrorMsg } from 'lib/utils/helpers';
// import { toast } from 'react-toastify';
import AsynchronousSelectMr from 'components/e-clinic/Doctor/AsynchronousSelectMr';
import FetchTobacoConsumption from 'components/e-clinic/Doctor/DisplayMedRec/FetchTobacoConsumption';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import TextField from 'components/controls/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridContainer from 'components/Grid/GridContainer';
import MedicalObjects from 'Medical_constants/constants';
import medRec from 'components/e-clinic/Doctor/medRec';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardHeader from 'components/Card/CardHeader';
import doctorAPI from 'lib/api/doctor';
import { extractErrorMsg } from 'lib/utils/helpers';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    width: 200,
    margin: 4,
  },
  formControl: {
    minWidth: 120,
    width: 250,
  },
}));

export default function DisplayMedicalRecord() {
  const classes = useStyles();
  const SkinProblems = [
    {
      value: 'skin infection',
      label: 'skin infection',
    },
  ];
  //----ophtamology
  const OPHTALMOLOGYPROBLEMS = [
    {
      value: 'tearing',
      label: 'tearing',
    },
    {
      value: 'pain',
      label: 'pain',
    },
    {
      value: 'eye spots',
      label: 'eye spots',
    },
  ];
  //orl
  const ORLPROBLEMS = [
    {
      value: 'whistling',
      label: 'whistling',
    },
    {
      value: 'repeated tonsillitis',
      label: 'repeated tonsillitis',
    },
    {
      value: 'epistaxis',
      label: 'epistaxis',
    },
    {
      value: 'rhinorrhea',
      label: 'rhinorrhea',
    },
  ];
  //---------------------locomotoproblems
  const LOCOMOTORPROLEMS = [
    {
      value: 'muscular',
      label: 'muscular',
    },
    {
      value: 'articular',
      label: 'articular',
    },
    {
      value: 'vertebral',
      label: 'vertebral',
    },
    {
      value: 'neurological',
      label: 'neurological',
    },
  ];
  //--------resperatpoir
  const RESPIRATORYPROBLEMS = [
    {
      value: 'cough',
      label: 'cough',
    },
    {
      value: 'dyspnea',
      label: 'dyspnea',
    },
    {
      value: 'expectoration',
      label: 'expectoration',
    },
    {
      value: 'chest pain',
      label: 'chest pain',
    },
  ];
  //cardio vascular--------------------
  const CARDIOVASCULARPROBLEMS = [
    {
      value: 'palpitations',
      label: 'palpitations',
    },
    {
      value: 'edema pain',
      label: 'edema pain',
    },
    {
      value: 'pain on walk',
      label: 'pain on walk',
    },
    {
      value: 'pain on rest',
      label: 'pain on rest',
    },
    {
      value: 'abdominal pain',
      label: 'abdominal pain',
    },
  ];
  //digestive problems--------------------
  const DIGESTIVEPROBLEMS = [
    {
      value: 'appetite problem',
      label: 'appetite problem',
    },
    {
      value: 'transit',
      label: 'transit',
    },
    {
      value: 'stool',
      label: 'stool',
    },

    {
      value: 'rectal bleeding',
      label: 'rectal bleeding',
    },
  ];
  //aptitude--------------------
  const APTITUDE = [
    {
      value: true,
      label: 'apt',
    },
    {
      value: false,
      label: 'inapt',
    },
  ];
  //orientation causes
  const CAUSES = [
    {
      value: 'notice',
      label: 'notice',
    },
    {
      value: 'hospitalization',
      label: 'hospitalization',
    },
    {
      value: 'treatment',
      label: 'treatment',
    },
  ];
  const initialState = {
    patient_data: {
      user: {
        first_name: '',
        last_name: '',
      },
      type: '',
      education_level: '',
    },
    patient: '',
    social_number: 0,
    biometric: '',
    tobaco_consumption: '',
    tobaco_taken_as: '',
    number_units: '',
    alcohol_consumption: '',
    medication_consumption: '',
    medications: '',
    general_diseases: '',
    surgical_intervention: '',
    allergic_reaction: '',
    congenital_condition: '',
  };
  const [checkedValues, setCheckedValues] = React.useState({
    smoking: medRec.Aymen[0].smoking,
    chewing: medRec.Aymen[0].chewing,
    injection: medRec.Aymen[0].injection,
    oldSmoker: medRec.Aymen[0].oldSmoker,
    alcohol: medRec.Aymen[0].alcohol,
    medication_consumption: medRec.Aymen[0].medication_consumption,
  });
  const [historyValues, setHistoryValues] = React.useState({
    smokingNumberUnits: 0,
    chewingNumberUnits: 0,
    injectionNumbernits: 0,
    ageFc: '',
    duration: '',
    medication: '',
  });
  const handleChangeChecked = (event) => {
    if (event?.target) {
      setCheckedValues({
        ...checkedValues,
        [event.target.name]: event.target.checked,
      });
      setEdited({
        ...edited_values,
        [event.target.name]: event.target.checked,
      });
    }
  };
  const [keyForm, setkey] = React.useState(false); // when i click cancel : state change so all components on the form will re_render
  const [values, setValues] = React.useState({
    ...initialState,
  });
  const [edited_values, setEdited] = React.useState();
  // const [initial_values, setinitial] = React.useState({
  //   ...initialState,
  // });
  const handlePatientChange = (event, selectedValue) => {
    setValues(selectedValue);
  };
  const handleChange = (event) => {
    if (event?.target) {
      setHistoryValues({
        ...historyValues,
        [event.target.name]: event.target.value,
      });
      setEdited({
        ...edited_values,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: resData, status } = await doctorAPI.editMedicalRecord(
      values?.patient,
      edited_values,
    );
    if (status < 200 || status > 299) {
      const errors = extractErrorMsg(resData);
      errors.map((error) => toast.error(error));
    } else {
      setValues(resData);
      setEdited();
      // setinitial(initialState);
      toast.success('Medical Record updated successfully!');
    }
  };

  const cancel = () => {
    setkey(!keyForm);
    setEdited();
  };
  // const handleChange = (event) => {
  //   if (event?.target) {
  //     setinitial({
  //       ...initial_values,
  //       [event.target.name]: event.target.value,
  //     });
  //     setEdited({
  //       ...edited_values,
  //       [event.target.name]: event.target.value,
  //     });
  //   }
  // };

  return (
    <div>
      <form key={keyForm}>
        <GridContainer>
          <Card>
            <CardHeader color="info">
              <h3>Dislplay Medical Record</h3>
            </CardHeader>
            <CardBody>
              <br></br>
              <GridContainer>
                <GridItem xs={12}>
                  <AsynchronousSelectMr
                    patient={values}
                    handleChange={handlePatientChange}
                  />
                </GridItem>
              </GridContainer>
              <h2>
                <strong>Patient&apos;s informations</strong>
              </h2>
              <GridContainer>
                <GridItem>
                  <h4>
                    <strong>Last name : </strong>{' '}
                    {values.patient_data.user.last_name}
                  </h4>
                  <h4>
                    <strong>First name : </strong>{' '}
                    {values.patient_data.user.first_name}
                  </h4>
                  <h4>
                    <strong>University name : </strong> Higher School of
                    Computer Science 08 May 1945 - Sidi Bel Abbes
                  </h4>
                  <h4>
                    <strong>Date of birth : </strong>
                    {values.patient_data.user.date_of_birth}
                  </h4>
                  <h4>
                    <strong>Adress : </strong>{' '}
                    {values.patient_data.user.address}
                  </h4>
                  <h4>
                    <strong>Level : </strong>{' '}
                    {values.patient_data.education_level}
                  </h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {medRec.Aymen[0].bloodType}
                    </InputLabel>
                    <Select
                      name="bloodType"
                      value={values.bloodType}
                      onChange={handleChange}
                    >
                      {MedicalObjects.BLOODTYPE.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {medRec.Aymen[0].familySituation}
                    </InputLabel>
                    <Select
                      name="familySituation"
                      value={values.familly_situation}
                      onChange={handleChange}
                    >
                      {MedicalObjects.FAMILLYSITUATION.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    label={'Social number : ' + medRec.Aymen[0].social_number}
                    name="social_number"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <h2>
                <strong>Personal history</strong>
              </h2>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.smoking}
                        onChange={handleChangeChecked}
                        name="smoking"
                        color="primary"
                      />
                    }
                    label="Smoking"
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={6} sm={3}>
                  <TextField
                    name="smokingNumberUnits"
                    label={
                      'Number units : ' + medRec.Aymen[0].smokingNumberUnits
                    }
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <TextField
                    name={'ageFc : ' + medRec.Aymen[0].smokingNumberUnits}
                    label="Age of first cigarette"
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.oldSmoker}
                        onChange={handleChangeChecked}
                        name="oldSmoker"
                        color="primary"
                      />
                    }
                    label="Old smoker"
                  />
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <TextField
                    name="duration"
                    label={'Duration : ' + medRec.Aymen[0].duration}
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={6} sm={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.chewing}
                        onChange={handleChangeChecked}
                        name="chewing"
                        color="primary"
                      />
                    }
                    label="Chewing"
                  />
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <TextField
                    name="chewingNumberUnits"
                    label={
                      'Number Units : ' + medRec.Aymen[0].chewingNumberUnits
                    }
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={6} sm={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.injection}
                        onChange={handleChangeChecked}
                        name="injection"
                        color="primary"
                      />
                    }
                    label="Injection"
                  />
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <TextField
                    name="injectionNumberUnits"
                    label={
                      'number Units : ' + medRec.Aymen[0].injectionNumbernits
                    }
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.alcohol}
                        onChange={handleChangeChecked}
                        name="alcohol"
                        color="primary"
                      />
                    }
                    label="Alcohol"
                  />
                </GridItem>
                <GridItem xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedValues.alcohol}
                        onChange={handleChangeChecked}
                        name="medication_consumption"
                        color="primary"
                      />
                    }
                    label="Medication"
                  />
                </GridItem>
                <GridItem xs={3}>
                  <TextField
                    name="medication"
                    label={'Medication name : ' + medRec.Aymen[0].medication}
                    onChange={handleChange}
                    //value={values.number_units}
                    fullwidth
                  />
                </GridItem>
              </GridContainer>
              <h2>
                <strong>Screening visit</strong>
              </h2>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id="date"
                    required
                    variant="outlined"
                    name="date"
                    label={'Date : ' + medRec.Aymen[0].date}
                    type="date"
                    //value={values.date}
                    onChange={handleChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id="outlined-basic"
                    label={'Weight : ' + medRec.Aymen[0].wieght}
                    variant="outlined"
                    type="number"
                    name="wieght"
                    onChange={handleChange}
                    //value={values.wieght}
                    required
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label={'Height : ' + medRec.Aymen[0].height}
                    variant="outlined"
                    type="number"
                    name="height"
                    onChange={handleChange}
                    required
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <h4>
                    <strong>Hearing problems</strong>
                  </h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={6} sm={12} md={6}>
                  <TextField
                    name="hearing_right"
                    label={'Hearing right : ' + medRec.Aymen[0].hearing_right}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    //value={values.hearing_right}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    name="hearing_left"
                    label={'Hearing left : ' + medRec.Aymen[0].hearing_left}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    //value={values.hearing_left}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <hr></hr>
              <GridContainer>
                <GridItem>
                  <h4>
                    <strong>Visaul problems</strong>
                  </h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    name="visual_acuity_with_correction_left"
                    label={
                      'Visual acuity with correction left' +
                      medRec.Aymen[0].visual_acuity_with_correction_left
                    }
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    name="visual_acuity_with_correction_right"
                    label={
                      'Visual acuity with correction left' +
                      medRec.Aymen[0].visual_acuity_with_correction_right
                    }
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    name="visual_acuity_without_correction_left"
                    label={
                      'Visual acuity without correction left' +
                      medRec.Aymen[0].visual_acuity_without_correction_left
                    }
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    name="visual_acuity_without_correction_right"
                    label={
                      'Visual acuity without correction left' +
                      medRec.Aymen[0].visual_acuity_without_correction_right
                    }
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <hr></hr>
              <GridContainer>
                <GridItem>
                  <h4>
                    <strong>Skin,Orl,Cardiovascular problems....</strong>
                  </h4>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Skin problems : {medRec.Aymen[0].skin_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="skin_state"
                      onChange={handleChange}
                      label="Age"
                    >
                      {SkinProblems.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={'Skin exam' + medRec.Aymen[0].skin_exam}
                    name="skin_exam"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Ophtalmology: {medRec.Aymen[0].ophtalmological_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="ophtalmological_state"
                      value={values.ophtalmological_state}
                      onChange={handleChange}
                    >
                      {OPHTALMOLOGYPROBLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={
                      'Ophtalmology exam' + medRec.Aymen[0].ophtalmological_exam
                    }
                    name="ophtalmological_exam"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Orl: {medRec.Aymen[0].orl_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="orl_state"
                      onChange={handleChange}
                    >
                      {ORLPROBLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={'Orl exam' + medRec.Aymen[0].orl_state}
                    name="orl_exam"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Locomoto : {medRec.Aymen[0].locomotor_case}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="locomotor_case"
                      value={values.locomotor_case}
                      onChange={handleChange}
                    >
                      {LOCOMOTORPROLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={'locomotor exam' + medRec.Aymen[0].locomotor_exam}
                    name="locomotor_exam"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Cardiovascular : {medRec.Aymen[0].cardiovascular_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="cardiovascular_state"
                      value={values.cardiovascular_state}
                      onChange={handleChange}
                    >
                      {CARDIOVASCULARPROBLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={
                      'Cardiovascular exam' +
                      medRec.Aymen[0].cardiovascular_exam
                    }
                    name="cardiovascular_exam"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Respiratory : {medRec.Aymen[0].respiratory_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="respiratory_state"
                      value={values.respiratory_state}
                      onChange={handleChange}
                    >
                      {RESPIRATORYPROBLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={
                      'Respiratory exam' + medRec.Aymen[0].respiratory_exam
                    }
                    name="respiratory_exam"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Digestive: {medRec.Aymen[0].digestive_state}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="digestive_state"
                      onChange={handleChange}
                    >
                      {DIGESTIVEPROBLEMS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={'Digestive exam' + medRec.Aymen[0].digestive_exam}
                    name="digestive_exam"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
              <br></br>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Aptitude: {medRec.Aymen[0].aptitude}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name="aptitude"
                      onChange={handleChange}
                    >
                      {APTITUDE.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label={'Reason' + medRec.Aymen[0].reason}
                    name="reason"
                    fullWidth
                    onChange={handleChange}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <br />
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.btn}
                onClick={handleSubmit}
                type="submit"
              >
                Update
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.btn}
                onClick={cancel}
              >
                Cancel
              </Button>
            </div>
            <CardFooter />
          </Card>
        </GridContainer>
      </form>
    </div>
  );
}
