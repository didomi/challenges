import * as yup from 'yup';
import get from 'lodash.get';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import { IApi } from '../../api';
import { IConsentCreate } from './contracts';
import { AppDispatch } from '../../store';
import { consentAdded } from './slice';

function GiveConsent({ api }: { api: IApi }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { errors, handleChange, handleSubmit, isSubmitting, touched, values } =
    useFormik<IConsentCreate>({
      initialValues: {
        name: '',
        email: '',
        newsletters: false,
        ads: false,
        stats: false
      },
      validationSchema: yup
        .object()
        .shape({
          name: yup.string().label('Name').required(),
          email: yup.string().label('Email').required().email(),
          newsletters: yup.boolean().optional(),
          ads: yup.boolean().optional(),
          stats: yup.boolean().optional()
        })
        .test('consentsTest', (fields) => {
          if (fields.newsletters || fields.ads || fields.stats) {
            return true;
          }

          return new yup.ValidationError(
            'One of the above checkbox must be checked',
            null,
            'consents'
          );
        }),
      onSubmit: async (fields) => {
        const res = await api.createConsent(fields);

        dispatch(
          consentAdded({
            ...fields,
            id: res.id
          })
        );

        navigate('/collected-consents');
      }
    });

  const showError = (name: string): boolean =>
    Boolean(get(errors, name)) && (Boolean(get(touched, name)) || isSubmitting);

  const errorText = (name: string): string | undefined =>
    showError(name) ? get(errors, name) : undefined;

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                placeholder="Name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={showError('name')}
                helperText={errorText('name')}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={showError('email')}
                helperText={errorText('email')}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography
            component="h3"
            color="textSecondary"
            sx={(theme) => ({
              mt: theme.spacing(2)
            })}
            gutterBottom
          >
            I agree to:
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="newsletters"
                      name="newsletters"
                      checked={values.newsletters}
                      onChange={handleChange}
                    />
                  }
                  label="Receive newsletters"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="ads"
                      name="ads"
                      checked={values.ads}
                      onChange={handleChange}
                    />
                  }
                  label="Be shown targeted ads"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="stats"
                      name="stats"
                      checked={values.stats}
                      onChange={handleChange}
                    />
                  }
                  label="Contribute to anonymous visit statistics"
                />
              </FormGroup>
            </Grid>
            {(errors as Record<string, string>)['consents'] && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: 'error.main' }}
                >
                  {(errors as Record<string, string>)['consents']}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            sx={(theme) => ({
              mt: theme.spacing(2)
            })}
          >
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Give consent
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default GiveConsent;
