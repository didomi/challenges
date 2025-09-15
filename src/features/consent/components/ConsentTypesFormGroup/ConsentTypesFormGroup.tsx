import { LoadingSpinner } from '@/components';
import { ConsentType } from '@/features/consent/types';
import { ConsentFormValues } from '@/features/consent/validation/consentSchema';
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
import { Control, Controller, FieldError, Merge } from 'react-hook-form';

interface ConsentTypesFormGroupProps {
  control: Control<ConsentFormValues>;
  isLoading: boolean;
  consentTypes: ConsentType[];
  title?: string;
  errors?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export default function ConsentTypesFormGroup({ control, isLoading, consentTypes, errors, title = 'I agree to:' }: ConsentTypesFormGroupProps) {
  return (
    <FormGroup>
      <FormLabel sx={{ mb: 1 }}>{title}</FormLabel>
      {isLoading && <LoadingSpinner label="Loading consent types ..." />}
      {consentTypes.map((type) => (
        <Controller key={type.name} name="consentTypes" control={control} render={({ field }) => (
          <FormControlLabel
            control={<Checkbox checked={field.value.includes(type.name)} onChange={(e) => {
              let newValues = [...field.value, type.name];
              if (!e.target.checked) {
                newValues = newValues.filter((v) => v !== type.name);
              }
              field.onChange(newValues);
            }} />}
            label={type.label}
          />
        )} />
      ))}
      {errors && <Typography color="error" variant="caption">{errors.message}</Typography>}
    </FormGroup>
  )
}